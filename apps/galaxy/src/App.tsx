import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
  Suspense,
  type FC,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { UMAP } from "umap-js";
import * as THREE from "three";
import { cos_sim } from "@huggingface/transformers";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import {
  GALAXY_RADIUS,
  analysisUrl,
  loadCorpus,
  paperSize,
  stanceColor,
  type PaperEntry,
} from "./constants";
import Logo from "./components/Logo";
import { useModel } from "./components/useModel";
import {
  fingerprintCorpus,
  loadCachedIndex,
  saveCachedIndex,
  type IndexedEntry,
} from "./components/embeddingCache";

const EMBED_MODEL_ID = "onnx-community/embeddinggemma-300m-ONNX";
const EMBEDDING_DIM = 768;
const INDEX_VERSION = "semantic-v5-spring-gravity";

interface OrbitParameters {
  radius: number;
  speed: number;
  phase: number;
  axis: THREE.Vector3;
  tilt: THREE.Vector3;
}

interface SunInfo {
  id: number;
  basePosition: THREE.Vector3;
  spinSpeed: number;
}

interface PlanetSystem {
  sunIds: Set<number>;
  suns: Map<number, SunInfo>;
  basePositions: Map<number, THREE.Vector3>;
  orbits: Map<number, OrbitParameters & { sunId: number }>;
}

const deterministicNoise = (seed: number, salt: number): number => {
  const n = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

const computePlanetSystem = (points: GalaxyPoint[]): PlanetSystem => {
  const sunIds = new Set<number>();
  const suns = new Map<number, SunInfo>();
  const basePositions = new Map<number, THREE.Vector3>();
  for (const point of points) {
    const base = new THREE.Vector3(...point.position);
    basePositions.set(point.entry.id, base);
    if (point.entry.smoking_gun) {
      sunIds.add(point.entry.id);
      suns.set(point.entry.id, {
        id: point.entry.id,
        basePosition: base.clone(),
        spinSpeed: 0.25 + deterministicNoise(point.entry.id, 1) * 0.15,
      });
    }
  }

  const sunList = [...suns.values()];
  const orbits = new Map<number, OrbitParameters & { sunId: number }>();

  for (const point of points) {
    if (sunIds.has(point.entry.id)) continue;
    const base = basePositions.get(point.entry.id)!;
    // Pick the nearest sun (or a deterministic one if there are no suns).
    let nearest: SunInfo | null = null;
    let nearestDist = Infinity;
    for (const sun of sunList) {
      const d = base.distanceTo(sun.basePosition);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = sun;
      }
    }
    if (!nearest) continue;

    const offset = new THREE.Vector3().subVectors(base, nearest.basePosition);
    const baseRadius = Math.max(offset.length(), 0.5);
    const id = point.entry.id;
    const axis = new THREE.Vector3(
      deterministicNoise(id, 7) - 0.5,
      deterministicNoise(id, 13) - 0.5,
      deterministicNoise(id, 19) - 0.5,
    );
    if (axis.lengthSq() < 1e-6) axis.set(0, 1, 0);
    axis.normalize();
    const tiltSeed = new THREE.Vector3(
      deterministicNoise(id, 23) - 0.5,
      deterministicNoise(id, 29) - 0.5,
      deterministicNoise(id, 31) - 0.5,
    );
    const tilt = tiltSeed.lengthSq() < 1e-6 ? new THREE.Vector3(1, 0, 0) : tiltSeed.normalize();

    orbits.set(id, {
      sunId: nearest.id,
      radius: baseRadius + deterministicNoise(id, 41) * 1.8,
      speed: 0.08 + deterministicNoise(id, 47) * 0.18,
      phase: deterministicNoise(id, 53) * Math.PI * 2,
      axis,
      tilt,
    });
  }

  return { sunIds, suns, basePositions, orbits };
};

const computeOrbitPosition = (
  base: THREE.Vector3,
  sun: THREE.Vector3,
  orbit: OrbitParameters,
  elapsed: number,
  scratch: THREE.Vector3,
): THREE.Vector3 => {
  const angle = orbit.phase + elapsed * orbit.speed;
  scratch.set(0, 0, 0);
  // Build orbit plane vectors: u (in-plane) and v (perpendicular to axis & u).
  const u = orbit.tilt.clone().sub(
    orbit.axis.clone().multiplyScalar(orbit.tilt.dot(orbit.axis)),
  );
  if (u.lengthSq() < 1e-6) u.set(1, 0, 0);
  u.normalize();
  const v = new THREE.Vector3().crossVectors(orbit.axis, u).normalize();
  const radial = u.multiplyScalar(Math.cos(angle) * orbit.radius);
  const tangential = v.multiplyScalar(Math.sin(angle) * orbit.radius);
  scratch.copy(sun).add(radial).add(tangential);
  // Slight bob keeps the base offset from the original UMAP layout alive.
  const drift = base.clone().sub(sun).normalize().multiplyScalar(
    Math.sin(elapsed * orbit.speed * 1.3 + orbit.phase) * 0.4,
  );
  scratch.add(drift);
  return scratch;
};

const embeddingText = (entry: PaperEntry): string => {
  const firstQuote = entry.quotes[0] ?? "";
  return [
    `Title: ${entry.title}`,
    `Cluster: ${entry.cluster}`,
    `Stance: ${entry.stance}`,
    entry.smoking_gun ? "Smoking gun evidence" : "",
    `Finding: ${entry.core_finding}`,
    firstQuote ? `Quote: ${firstQuote}` : "",
  ]
    .filter(Boolean)
    .join("\n");
};

const relaxPositions = (
  positions: [number, number, number][],
  entries: PaperEntry[],
): [number, number, number][] => {
  const vectors = positions.map((p) => new THREE.Vector3(...p));
  const radii = entries.map((entry) => paperSize(entry));
  const iterations = 80;

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < vectors.length; i++) {
      for (let j = i + 1; j < vectors.length; j++) {
        const delta = new THREE.Vector3().subVectors(vectors[j], vectors[i]);
        const dist = Math.max(delta.length(), 0.001);
        const minDist = 1.8 + (radii[i] + radii[j]) * 2.4;
        if (dist >= minDist) continue;
        const push = (minDist - dist) * 0.5;
        delta.normalize().multiplyScalar(push);
        vectors[i].addScaledVector(delta, -1);
        vectors[j].add(delta);
      }
    }
  }

  // Keep the relaxed cloud inside roughly the same viewing radius.
  const center = new THREE.Box3().setFromPoints(vectors).getCenter(new THREE.Vector3());
  const centered = vectors.map((p) => p.sub(center));
  const maxDist = Math.max(...centered.map((p) => p.length()));
  return centered.map((p) => {
    const normalized = maxDist > 0 ? p.divideScalar(maxDist) : p;
    return normalized.multiplyScalar(50).toArray() as [number, number, number];
  }).map((p, i) => {
    // Deterministic, paper-specific jitter: keeps semantic neighborhoods
    // intact while breaking the "two dense blobs" look UMAP can produce.
    const id = entries[i].id;
    const jitter = new THREE.Vector3(
      Math.sin(id * 12.9898) * 3.8,
      Math.sin(id * 78.233) * 3.0,
      Math.sin(id * 37.719) * 3.8,
    );
    return new THREE.Vector3(...p).add(jitter).toArray() as [
      number,
      number,
      number,
    ];
  });
};

// Menu visualization is the corpus stance distribution itself.
// 258 supports (green) / 80 balanced (gray) / 22 challenges (red).
// Three drifting clouds, sized in proportion to how much of the
// literature each stance represents.
const MainMenuGalaxy: FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const clouds = [
      { color: new THREE.Color("#4ade80"), count: 6500, scatter: 55 },
      { color: new THREE.Color("#cbd5e1"), count: 2000, scatter: 48 },
      { color: new THREE.Color("#f87171"), count: 550, scatter: 42 },
    ];
    const total = clouds.reduce((n, c) => n + c.count, 0);
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const sz = new Float32Array(total);
    let cursor = 0;
    for (const cloud of clouds) {
      for (let i = 0; i < cloud.count; i++) {
        // Center-weighted: more density toward the middle.
        const r = Math.pow(Math.random(), 1.6) * cloud.scatter;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi) * 0.55;
        const z = r * Math.sin(phi) * Math.sin(theta);

        pos[cursor * 3] = x;
        pos[cursor * 3 + 1] = y;
        pos[cursor * 3 + 2] = z;

        // Slight color variation gives texture.
        const c = cloud.color.clone();
        const jitter = 0.85 + Math.random() * 0.15;
        col[cursor * 3] = c.r * jitter;
        col[cursor * 3 + 1] = c.g * jitter;
        col[cursor * 3 + 2] = c.b * jitter;

        sz[cursor] = 0.08 + Math.random() * 0.04;
        cursor++;
      }
    }
    return { positions: pos, colors: col, sizes: sz };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0, -0.1]}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.85}
          vertexColors
        />
      </points>
    </group>
  );
};

const MenuCameraController = () => {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = 0.01;
    state.camera.position.x = Math.cos(time * speed) * GALAXY_RADIUS;
    state.camera.position.z = Math.sin(time * speed) * GALAXY_RADIUS;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const MenuScene: FC = () => (
  <Canvas camera={{ position: [GALAXY_RADIUS, 20, GALAXY_RADIUS], fov: 45 }}>
    <color attach="background" args={["#08080b"]} />
    <ambientLight intensity={0.5} />
    <Suspense fallback={null}>
      <MainMenuGalaxy />
      <Stars
        radius={250}
        depth={100}
        count={5000}
        factor={8}
        saturation={1}
        fade
        speed={1}
      />
      <MenuCameraController />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.05}
          luminanceSmoothing={0}
          height={400}
          intensity={0.8}
        />
      </EffectComposer>
    </Suspense>
  </Canvas>
);

interface MainMenuUIProps {
  onLoadModel: () => void;
  totalPapers: number;
  smokingGuns: number;
}

const MainMenuUI: FC<MainMenuUIProps> = ({
  onLoadModel,
  totalPapers,
  smokingGuns,
}) => (
  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60">
    <p
      className="text-shadow-lg text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-300 mb-3 animate-fade-in-down"
      style={{ letterSpacing: "0.35em" }}
    >
      The case against LLM reasoning
    </p>
    <h1 className="text-shadow-lg text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-3 animate-fade-in-down leading-none">
      Unthinking
    </h1>
    <p
      className="text-shadow-lg text-base sm:text-lg md:text-xl text-gray-100 mb-2 animate-fade-in-down max-w-2xl"
      style={{ animationDelay: "200ms" }}
    >
      <span className="text-green-400 font-semibold">{totalPapers} papers.</span>{" "}
      <span className="text-yellow-300 font-semibold">
        {smokingGuns} smoking guns.
      </span>{" "}
      <span className="text-white">One story.</span>
    </p>
    <p
      className="text-shadow-lg text-sm sm:text-base text-gray-300 mb-8 animate-fade-in-down max-w-2xl"
      style={{ animationDelay: "300ms" }}
    >
      The literature converges: what we call &ldquo;reasoning&rdquo; in large
      language models is predictive completion. Inside, every paper is a
      planet. Smoking-gun findings burn as suns; the rest of the corpus
      orbits them. Color is stance, size is evidence weight.
    </p>
    <button
      onClick={onLoadModel}
      className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 pointer-events-auto animate-fade-in-up shadow-2xl"
      style={{ animationDelay: "600ms" }}
    >
      See the evidence →
    </button>
    <p
      className="text-shadow-lg text-xs text-gray-500 mt-6 animate-fade-in-up"
      style={{ animationDelay: "800ms" }}
    >
      WebGPU required. Nothing leaves your machine.
    </p>
  </div>
);

const LoadingUI: FC<{ status: string; progress: number }> = ({
  status,
  progress,
}) => (
  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 bg-black/70 backdrop-blur-md">
    <div className="w-full max-w-lg text-center p-6">
      <Logo className="w-20 mx-auto mb-6" />
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
        First visit
      </p>
      <h2 className="text-3xl font-bold mb-3 text-white">
        Loading the evidence
      </h2>
      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
        EmbeddingGemma is loading onto your GPU. Then 360 paper findings
        will be embedded in your browser — nothing leaves your machine.
        <br />
        <span className="text-gray-500">
          This is a one-time cost. Subsequent visits load instantly.
        </span>
      </p>
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-3 overflow-hidden">
        <div
          className="bg-white h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm h-5">{status}</p>
    </div>
  </div>
);

export interface GalaxyPoint {
  text: string;
  position: [number, number, number];
  embedding: number[];
  entry: PaperEntry;
}

export interface SearchResult extends GalaxyPoint {
  similarity: number;
}

interface InteractiveSphereProps {
  point: GalaxyPoint;
  color: string;
  similarity: number | null;
  dimmed: boolean;
  isSun: boolean;
  registerGroup: (id: number, group: THREE.Group | null) => void;
  registerMaterial: (
    id: number,
    material: THREE.MeshStandardMaterial | null,
  ) => void;
  onClick: (point: GalaxyPoint) => void;
  onDragStart: (point: GalaxyPoint, e: ThreeEvent<PointerEvent>) => void;
  onDrag: (point: GalaxyPoint, e: ThreeEvent<PointerEvent>) => void;
  onDragEnd: (point: GalaxyPoint, e: ThreeEvent<PointerEvent>) => void;
}

const InteractiveSphereImpl: FC<InteractiveSphereProps> = ({
  point,
  color,
  similarity,
  dimmed,
  isSun,
  registerGroup,
  registerMaterial,
  onClick,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const labelRef = useRef<HTMLDivElement>(null!);
  const { camera, invalidate } = useThree();

  const baseRadius = paperSize(point.entry);
  // Suns get a noticeably bigger body and higher quality.
  const renderRadius = isSun ? baseRadius * 1.85 : baseRadius;
  const segments = isSun ? 40 : baseRadius >= 0.34 ? 28 : 22;
  const [cameraDistance, setCameraDistance] = useState(50);

  const titleLabel = `#${point.entry.id} ${point.entry.title}`;
  const labelText =
    similarity !== null ? `(${similarity.toFixed(2)}) ${titleLabel}` : titleLabel;

  useEffect(() => {
    return () => {
      registerGroup(point.entry.id, null);
      registerMaterial(point.entry.id, null);
    };
  }, [point.entry.id, registerGroup, registerMaterial]);

  useFrame((state) => {
    const group = groupRef.current;
    const material = materialRef.current;
    if (!group || !material) return;

    if (material.opacity < 1) {
      material.opacity = THREE.MathUtils.lerp(material.opacity, 1, 0.05);
    }

    const dist = group.position.distanceTo(camera.position);
    if (Math.abs(dist - cameraDistance) > 2) setCameraDistance(dist);
    const distanceScale = THREE.MathUtils.mapLinear(dist, 100, 25, 2.0, 1.0);
    const clampedDistanceScale = THREE.MathUtils.clamp(distanceScale, 1.0, 2.0);
    const hoverScale = isHovered ? 1.2 : 1.0;
    const meshScale = material.opacity * clampedDistanceScale * hoverScale;
    meshRef.current.scale.set(meshScale, meshScale, meshScale);

    let emissive: number;
    if (isSun) {
      const t = state.clock.elapsedTime + point.entry.id * 0.21;
      emissive = 1.55 + Math.sin(t * 1.4) * 0.45;
    } else if (point.entry.smoking_gun) {
      const baseGlow = similarity !== null ? 1.2 : 0.85;
      const t = state.clock.elapsedTime + point.entry.id * 0.37;
      emissive = baseGlow + Math.sin(t * 1.6) * 0.35;
    } else {
      emissive = similarity !== null ? 1.05 : 0.5;
    }
    if (dimmed) emissive *= 0.08;
    material.emissiveIntensity = emissive;

    if (isSun) {
      meshRef.current.rotation.y += 0.0025;
    }

    if (labelRef.current) {
      labelRef.current.style.transform = `translateX(-50%) scale(${material.opacity})`;
    }

    invalidate();
  });

  return (
    <group
      ref={(node) => {
        groupRef.current = node;
        registerGroup(point.entry.id, node);
        if (node) {
          node.position.set(...point.position);
        }
      }}
    >
      <mesh
        ref={meshRef}
        onClick={() => onClick(point)}
        onPointerDown={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          (e.target as Element).setPointerCapture?.(e.pointerId);
          onDragStart(point, e);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          onDrag(point, e);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          (e.target as Element).releasePointerCapture?.(e.pointerId);
          onDragEnd(point, e);
        }}
        onPointerCancel={(e) => {
          e.stopPropagation();
          onDragEnd(point, e);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <sphereGeometry args={[renderRadius, segments, segments]} />
        <meshStandardMaterial
          ref={(material) => {
            materialRef.current = material as THREE.MeshStandardMaterial;
            registerMaterial(point.entry.id, materialRef.current);
          }}
          color={color}
          roughness={isSun ? 0.18 : 0.32}
          metalness={isSun ? 0.0 : 0.06}
          emissive={color}
          emissiveIntensity={isSun ? 1.4 : 0.5}
          transparent
          opacity={0}
        />
      </mesh>
      {isSun && (
        <pointLight
          color={color}
          intensity={2.4}
          distance={28}
          decay={1.6}
        />
      )}
      {(isHovered ||
        similarity !== null ||
        (isSun && cameraDistance < 60) ||
        (point.entry.smoking_gun && cameraDistance < 32)) && (
        <Html distanceFactor={12}>
          <div
            ref={labelRef}
            className={`p-1.5 rounded-md text-xs whitespace-nowrap shadow-lg backdrop-blur-md ${
              isSun
                ? "bg-yellow-500/30 text-yellow-50 border border-yellow-400/40"
                : point.entry.smoking_gun
                  ? "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30"
                  : "bg-black/70 text-white border border-white/10"
            }`}
            style={{
              transformOrigin: "center top",
              userSelect: "none",
            }}
          >
            <div>{labelText}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Memo on shallow prop equality. Search updates the similarityMap; without
// memo every search keystroke triggers 360 re-renders. With memo, only
// spheres whose similarity actually changed re-render.
const InteractiveSphere = memo(InteractiveSphereImpl);

type StanceFilter =
  | null
  | "supports"
  | "balanced"
  | "challenges"
  | "smoking_gun";

interface SceneProps {
  galaxyPoints: GalaxyPoint[];
  searchResults: SearchResult[];
  filter: StanceFilter;
  onSphereClick: (point: GalaxyPoint) => void;
}

const matchesFilter = (point: GalaxyPoint, filter: StanceFilter): boolean => {
  if (!filter) return true;
  if (filter === "smoking_gun") return point.entry.smoking_gun;
  return point.entry.stance === filter;
};

interface DragState {
  pointerId: number;
  paperId: number;
  pickOffset: THREE.Vector3;
  current: THREE.Vector3;
  // Last pinned position so we can derive a release velocity.
  lastPosition: THREE.Vector3;
  lastTime: number;
  velocity: THREE.Vector3;
}

interface PlanetBody {
  id: number;
  isSun: boolean;
  mass: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

// Physics tuning. Critically damped feel: 2 * sqrt(k * m_eff).
const SPRING_K = 4.0;
const SPRING_DAMPING = 2.4;
const SUN_SPRING_K = 6.5;
const SUN_DAMPING = 3.4;
const GRAVITY = 7.0;
const SOFTENING = 0.55; // prevents 1/r^2 explosions when close
const MAX_ACCEL = 24.0;
const MAX_VELOCITY = 18.0;
const GRABBED_MASS_BOOST = 6.0;
const PLANET_MASS = 1.0;
const SMOKING_GUN_MASS = 3.0;
const SUN_MASS = 12.0;
const FIXED_DT = 1 / 90; // 90 Hz simulation regardless of render FPS
const MAX_STEPS_PER_FRAME = 3;

const Scene: FC<SceneProps> = ({
  galaxyPoints,
  searchResults,
  filter,
  onSphereClick,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraTargetPos = useRef(new THREE.Vector3());
  const controlsTargetLookAt = useRef(new THREE.Vector3());
  const shouldAnimate = useRef(false);
  const { camera, invalidate } = useThree();

  const planetSystem = useMemo(() => computePlanetSystem(galaxyPoints), [galaxyPoints]);

  const groupRefs = useRef(new Map<number, THREE.Group>());
  const materialRefs = useRef(new Map<number, THREE.MeshStandardMaterial>());
  const bodies = useRef<PlanetBody[]>([]);
  const bodyById = useRef(new Map<number, PlanetBody>());
  const dragState = useRef<DragState | null>(null);
  const accumulatorRef = useRef(0);

  // Build / refresh the body table whenever the galaxy regenerates.
  useEffect(() => {
    const next: PlanetBody[] = [];
    const map = new Map<number, PlanetBody>();
    for (const point of galaxyPoints) {
      const id = point.entry.id;
      const isSun = planetSystem.sunIds.has(id);
      const base =
        planetSystem.basePositions.get(id) ?? new THREE.Vector3(...point.position);
      const body: PlanetBody = {
        id,
        isSun,
        mass: isSun
          ? SUN_MASS
          : point.entry.smoking_gun
            ? SMOKING_GUN_MASS
            : PLANET_MASS,
        position: base.clone(),
        velocity: new THREE.Vector3(),
      };
      next.push(body);
      map.set(id, body);
    }
    bodies.current = next;
    bodyById.current = map;
    dragState.current = null;
  }, [galaxyPoints, planetSystem]);

  const registerGroup = useCallback((id: number, group: THREE.Group | null) => {
    if (group) {
      groupRefs.current.set(id, group);
      const body = bodyById.current.get(id);
      if (body) group.position.copy(body.position);
    } else {
      groupRefs.current.delete(id);
    }
  }, []);

  const registerMaterial = useCallback(
    (id: number, material: THREE.MeshStandardMaterial | null) => {
      if (material) {
        materialRefs.current.set(id, material);
      } else {
        materialRefs.current.delete(id);
      }
    },
    [],
  );

  const positionFor = useCallback(
    (point: GalaxyPoint): [number, number, number] => {
      const body = bodyById.current.get(point.entry.id);
      if (body) return [body.position.x, body.position.y, body.position.z];
      return point.position;
    },
    [],
  );

  const planeNormal = useRef(new THREE.Vector3());
  const dragPlane = useRef(new THREE.Plane());
  const dragWorkVec = useRef(new THREE.Vector3());

  const handleDragStart = useCallback(
    (point: GalaxyPoint, e: ThreeEvent<PointerEvent>) => {
      if (controlsRef.current) controlsRef.current.enabled = false;
      const body = bodyById.current.get(point.entry.id);
      if (!body) return;
      dragState.current = {
        pointerId: e.pointerId,
        paperId: point.entry.id,
        pickOffset: body.position.clone().sub(e.point),
        current: body.position.clone(),
        lastPosition: body.position.clone(),
        lastTime: performance.now(),
        velocity: new THREE.Vector3(),
      };
      // Zero velocity while pinned so it doesn't fight the cursor.
      body.velocity.set(0, 0, 0);
    },
    [],
  );

  const handleDrag = useCallback(
    (point: GalaxyPoint, e: ThreeEvent<PointerEvent>) => {
      const state = dragState.current;
      if (!state || state.pointerId !== e.pointerId || state.paperId !== point.entry.id)
        return;

      planeNormal.current.copy(camera.position).sub(state.current).normalize();
      dragPlane.current.setFromNormalAndCoplanarPoint(
        planeNormal.current,
        state.current,
      );
      if (e.ray.intersectPlane(dragPlane.current, dragWorkVec.current)) {
        const now = performance.now();
        const dt = Math.max((now - state.lastTime) / 1000, 1 / 240);
        state.lastPosition.copy(state.current);
        state.current.copy(dragWorkVec.current).add(state.pickOffset);
        state.velocity
          .subVectors(state.current, state.lastPosition)
          .divideScalar(dt);
        state.lastTime = now;
        invalidate();
      }
    },
    [camera, invalidate],
  );

  const handleDragEnd = useCallback(
    (point: GalaxyPoint, _e: ThreeEvent<PointerEvent>) => {
      const state = dragState.current;
      if (!state || state.paperId !== point.entry.id) return;
      const body = bodyById.current.get(point.entry.id);
      if (body) {
        // Hand the planet's last drag velocity back to the simulation so a
        // fling carries momentum, then let spring + damping recapture it.
        body.velocity.copy(state.velocity).clampLength(0, MAX_VELOCITY);
      }
      dragState.current = null;
      if (controlsRef.current) controlsRef.current.enabled = true;
    },
    [],
  );

  // Reusable temp vectors to avoid per-frame allocations.
  const tmpTarget = useRef(new THREE.Vector3());
  const tmpForce = useRef(new THREE.Vector3());
  const tmpDelta = useRef(new THREE.Vector3());
  const tmpVec = useRef(new THREE.Vector3());

  const stepSimulation = useCallback(
    (elapsed: number, dt: number) => {
      const drag = dragState.current;
      const draggedBody = drag ? bodyById.current.get(drag.paperId) : null;

      // 1. Pin the dragged planet to the pointer-derived position.
      if (drag && draggedBody) {
        draggedBody.position.copy(drag.current);
        draggedBody.velocity.set(0, 0, 0);
      }

      for (const body of bodies.current) {
        if (body === draggedBody) continue;

        const force = tmpForce.current.set(0, 0, 0);

        if (body.isSun) {
          // Suns spring back to their anchor with a tiny life-drift.
          const anchor = planetSystem.suns.get(body.id)?.basePosition;
          if (!anchor) continue;
          tmpTarget.current.copy(anchor);
          tmpTarget.current.x += Math.sin(elapsed * 0.18 + body.id * 0.7) * 0.35;
          tmpTarget.current.y += Math.cos(elapsed * 0.22 + body.id * 1.1) * 0.35;
          tmpDelta.current.subVectors(tmpTarget.current, body.position);
          force.addScaledVector(tmpDelta.current, SUN_SPRING_K);
          force.addScaledVector(body.velocity, -SUN_DAMPING);
        } else {
          // Spring toward this planet's current orbit target.
          const orbit = planetSystem.orbits.get(body.id);
          const base = planetSystem.basePositions.get(body.id);
          const sunPos = orbit
            ? planetSystem.suns.get(orbit.sunId)?.basePosition
            : null;
          if (orbit && sunPos && base) {
            computeOrbitPosition(
              base,
              sunPos,
              orbit,
              elapsed,
              tmpTarget.current,
            );
            tmpDelta.current.subVectors(tmpTarget.current, body.position);
            force.addScaledVector(tmpDelta.current, SPRING_K);
          } else if (base) {
            tmpDelta.current.subVectors(base, body.position);
            force.addScaledVector(tmpDelta.current, SPRING_K);
          }
          force.addScaledVector(body.velocity, -SPRING_DAMPING);

          // Soft gravity from the grabbed planet only.
          if (draggedBody) {
            tmpDelta.current.subVectors(draggedBody.position, body.position);
            const distSq = tmpDelta.current.lengthSq();
            if (distSq > 1e-6) {
              const safe = distSq + SOFTENING * SOFTENING;
              const grabbedMass = draggedBody.mass + GRABBED_MASS_BOOST;
              const accel = (GRAVITY * grabbedMass) / safe;
              tmpDelta.current.normalize().multiplyScalar(accel);
              force.add(tmpDelta.current);
            }
          }
        }

        // a = F / m, clamped for stability.
        const accel = tmpVec.current
          .copy(force)
          .multiplyScalar(1 / Math.max(body.mass, 0.001));
        accel.clampLength(0, MAX_ACCEL);

        body.velocity.addScaledVector(accel, dt);
        body.velocity.clampLength(0, MAX_VELOCITY);
        body.position.addScaledVector(body.velocity, dt);
      }
    },
    [planetSystem],
  );

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 1 / 20); // ignore huge stalls
    accumulatorRef.current += clampedDelta;
    let steps = 0;
    while (accumulatorRef.current >= FIXED_DT && steps < MAX_STEPS_PER_FRAME) {
      stepSimulation(state.clock.elapsedTime, FIXED_DT);
      accumulatorRef.current -= FIXED_DT;
      steps++;
    }
    if (steps === MAX_STEPS_PER_FRAME) {
      // We fell behind — drop accumulated time instead of stalling forever.
      accumulatorRef.current = 0;
    }

    // Push simulated positions into the scene graph.
    for (const body of bodies.current) {
      const group = groupRefs.current.get(body.id);
      if (group) group.position.copy(body.position);
    }

    if (shouldAnimate.current && controlsRef.current) {
      controlsRef.current.enabled = false;
      const distToTarget = camera.position.distanceTo(cameraTargetPos.current);
      if (distToTarget > 0.01) {
        camera.position.lerp(cameraTargetPos.current, 0.08);
        controlsRef.current.target.lerp(controlsTargetLookAt.current, 0.08);
      } else {
        camera.position.copy(cameraTargetPos.current);
        controlsRef.current.target.copy(controlsTargetLookAt.current);
        shouldAnimate.current = false;
        controlsRef.current.enabled = true;
      }
    }

    invalidate();
  });

  useEffect(() => {
    if (galaxyPoints.length > 0 && controlsRef.current) {
      const box = new THREE.Box3().setFromPoints(
        galaxyPoints.map((p) => new THREE.Vector3(...p.position)),
      );
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 1.5 / Math.tan(fov / 2));
      cameraZ *= 1.5;
      camera.position.set(center.x, center.y, center.z + cameraZ);
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
      invalidate();
    }
  }, [galaxyPoints, camera, invalidate]);

  useEffect(() => {
    if (searchResults.length > 0 && controlsRef.current) {
      const topResult = searchResults[0];
      const topResultPos = new THREE.Vector3(...positionFor(topResult));
      const offsetDirection = new THREE.Vector3()
        .subVectors(camera.position, controlsRef.current.target)
        .normalize();
      const minFocusDist = 6;
      const maxFocusDist = 20;
      const similarity = THREE.MathUtils.clamp(topResult.similarity, 0, 1);
      const desiredDist = THREE.MathUtils.mapLinear(
        similarity,
        0,
        1,
        maxFocusDist,
        minFocusDist,
      );
      const newOffset = offsetDirection.multiplyScalar(desiredDist);
      cameraTargetPos.current.copy(topResultPos).add(newOffset);
      controlsTargetLookAt.current.copy(topResultPos);
      shouldAnimate.current = true;
    }
  }, [searchResults, camera, positionFor]);

  const { pointColors, similarityMap } = useMemo(() => {
    const baseColors = galaxyPoints.map((p) => stanceColor(p.entry.stance));
    if (searchResults.length === 0) {
      return {
        pointColors: baseColors,
        similarityMap: new Map<string, number>(),
      };
    }
    const simMap = new Map(searchResults.map((r) => [r.text, r.similarity]));
    return { pointColors: baseColors, similarityMap: simMap };
  }, [galaxyPoints, searchResults]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom
        enablePan
        autoRotate
        autoRotateSpeed={0.18}
      />
      <Stars
        radius={220}
        depth={120}
        count={5200}
        factor={7}
        saturation={1}
        fade
        speed={1}
      />

      {galaxyPoints.map((point, i) => (
        <InteractiveSphere
          key={point.entry.id}
          point={point}
          color={pointColors[i]}
          similarity={similarityMap.get(point.text) ?? null}
          dimmed={!matchesFilter(point, filter)}
          isSun={planetSystem.sunIds.has(point.entry.id)}
          registerGroup={registerGroup}
          registerMaterial={registerMaterial}
          onClick={onSphereClick}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
};

export default function App() {
  const { loadModel, isLoading, isReady, progress, status, error, embed } =
    useModel();

  const [corpus, setCorpus] = useState<{
    entries: PaperEntry[];
    raw: string;
  }>({ entries: [], raw: "" });

  const corpusStats = useMemo(
    () => ({
      total: corpus.entries.length,
      smokingGuns: corpus.entries.filter((e) => e.smoking_gun).length,
    }),
    [corpus.entries],
  );
  const [galaxyPoints, setGalaxyPoints] = useState<GalaxyPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedPoint, setSelectedPoint] = useState<GalaxyPoint | null>(null);
  const [stanceFilter, setStanceFilter] = useState<StanceFilter>(null);

  const toggleFilter = (next: StanceFilter) =>
    setStanceFilter((current) => (current === next ? null : next));
  const lastQueryEmbedding = useRef<number[] | null>(null);
  const [generationStatus, setGenerationStatus] = useState("");

  const isSearching = useRef(false);
  const pendingQuery = useRef<string | null>(null);

  // Smoking-gun papers with at least one quote — for the bottom ticker.
  const smokingGuns = useMemo(() => {
    return galaxyPoints
      .filter((p) => p.entry.smoking_gun && p.entry.quotes.length > 0)
      .sort((a, b) => a.entry.id - b.entry.id);
  }, [galaxyPoints]);

  useEffect(() => {
    loadCorpus()
      .then(setCorpus)
      .catch((e) =>
        setGenerationStatus(`Failed to load corpus: ${e?.message ?? e}`),
      );
  }, []);

  const generateGalaxy = useCallback(async () => {
    if (!isReady || corpus.entries.length === 0 || galaxyPoints.length > 0) {
      return;
    }
    setIsGenerating(true);
    setSearchResults([]);
    setSearchQuery("");
    lastQueryEmbedding.current = null;
    const entries = corpus.entries.filter((e) => e.core_finding?.length > 0);
    const sentences = entries.map(embeddingText);
    if (sentences.length < 3) {
      setGenerationStatus("Not enough findings to project.");
      setIsGenerating(false);
      return;
    }

    const fingerprint = fingerprintCorpus(
      corpus.raw,
      `${EMBED_MODEL_ID}:${INDEX_VERSION}`,
    );

    try {
      // Try the IndexedDB cache first — first visit takes ~30-60s on
      // WebGPU, but every visit after that loads instantly.
      setGenerationStatus("Checking cache…");
      const cached = await loadCachedIndex(fingerprint);
      if (cached && cached.length === entries.length) {
        const byId = new Map(cached.map((c) => [c.id, c]));
        const newPoints: GalaxyPoint[] = [];
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const c = byId.get(entry.id);
          if (!c) {
            // Cache shape changed under us — treat as miss.
            throw new Error("cache-mismatch");
          }
          newPoints.push({
            text: sentences[i],
            position: c.position,
            embedding: c.embedding,
            entry,
          });
        }
        setGalaxyPoints(newPoints);
        setGenerationStatus(
          `Galaxy restored from cache — ${newPoints.length} papers.`,
        );
        setIsSidebarOpen(false);
        setTimeout(() => setGenerationStatus(""), 5000);
        return;
      }

      // Cache miss → embed all findings in the browser via EmbeddingGemma.
      const batch_size = 4;
      const embeddings: number[][] = [];
      const embedOptions = {
        padding: true,
        truncation: true,
        max_length: 256,
      };
      const zeroVector = () => Array.from({ length: EMBEDDING_DIM }, () => 0);
      const embedBatch = async (
        batch: string[],
        batchEntries: PaperEntry[],
      ): Promise<number[][]> => {
        try {
          return await embed(batch, embedOptions);
        } catch (error) {
          console.warn("Batch embed failed; retrying one paper at a time", {
            ids: batchEntries.map((e) => e.id),
            error,
          });
          setGenerationStatus(
            `Retrying papers ${batchEntries[0].id}–${batchEntries.at(-1)?.id} one at a time…`,
          );
        }

        const recovered: number[][] = [];
        for (let j = 0; j < batch.length; j++) {
          const entry = batchEntries[j];
          try {
            const [single] = await embed([batch[j]], embedOptions);
            recovered.push(single);
            continue;
          } catch (error) {
            console.warn(`Core finding embed failed for paper #${entry.id}`, error);
          }

          try {
            const [titleOnly] = await embed([entry.title], embedOptions);
            recovered.push(titleOnly);
            continue;
          } catch (error) {
            console.warn(`Title fallback embed failed for paper #${entry.id}`, error);
          }

          // Last resort: keep the paper in the galaxy with a neutral vector
          // instead of freezing the entire corpus projection.
          recovered.push(zeroVector());
        }
        return recovered;
      };
      const start = performance.now();
      setGenerationStatus(`Embedding 0 of ${sentences.length}…`);
      for (let i = 0; i < sentences.length; i += batch_size) {
        const batch = sentences.slice(i, i + batch_size);
        const batchEntries = entries.slice(i, i + batch_size);
        const batchEmbeddings = await embedBatch(batch, batchEntries);
        embeddings.push(...batchEmbeddings);
        const done = Math.min(i + batch_size, sentences.length);
        setGenerationStatus(`Embedding ${done} of ${sentences.length}…`);
      }
      const embeddingMs = performance.now() - start;
      console.log(`Embedding time: ${embeddingMs.toFixed(0)}ms`);

      setGenerationStatus("Projecting to 3D…");
      const nNeighbors = Math.max(2, Math.min(sentences.length - 1, 9));
      const umap = new UMAP({ nComponents: 3, nNeighbors, minDist: 0.42 });
      const coords3D: number[][] = umap.fit(embeddings);
      const rawPoints = coords3D.map((p) => new THREE.Vector3(...p));
      const box = new THREE.Box3().setFromPoints(rawPoints);
      const center = box.getCenter(new THREE.Vector3());
      const centeredPoints = rawPoints.map((p) => p.sub(center));
      let maxDist = 0;
      for (const p of centeredPoints) {
        maxDist = Math.max(maxDist, p.length());
      }
      const scaleFactor = 50;
      const finalPoints = centeredPoints.map((p) => {
        const normalized = maxDist > 0 ? p.divideScalar(maxDist) : p;
        return normalized.multiplyScalar(scaleFactor);
      });
      const rawPositions = finalPoints.map((p) => p.toArray()) as [
        number,
        number,
        number,
      ][];
      const positions = relaxPositions(rawPositions, entries);

      const newPoints: GalaxyPoint[] = sentences.map((text, i) => ({
        text,
        position: positions[i],
        embedding: embeddings[i],
        entry: entries[i],
      }));
      setGalaxyPoints(newPoints);
      setGenerationStatus(
        `Galaxy ready — ${newPoints.length} papers projected. Next load will be instant.`,
      );
      setIsSidebarOpen(false);
      setTimeout(() => setGenerationStatus(""), 7000);

      // Persist for next visit. Don't block on this.
      const toCache: IndexedEntry[] = entries.map((entry, i) => ({
        id: entry.id,
        embedding: embeddings[i],
        position: positions[i],
      }));
      void saveCachedIndex(fingerprint, toCache);
    } catch (e) {
      console.error(e);
      setGenerationStatus("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  }, [isReady, corpus, galaxyPoints.length, embed]);

  useEffect(() => {
    void generateGalaxy();
  }, [generateGalaxy]);

  // Keyboard shortcuts: '/' focuses search, Esc closes the info card.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement | null;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA")
          return;
        const input = document.querySelector<HTMLInputElement>(
          'input[placeholder^="press /"]',
        );
        if (input) {
          e.preventDefault();
          input.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Shareable URL: ?paper=354 reflects the selected paper.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedPoint) {
      if (url.searchParams.get("paper") !== String(selectedPoint.entry.id)) {
        url.searchParams.set("paper", String(selectedPoint.entry.id));
        window.history.replaceState({}, "", url);
      }
    } else if (url.searchParams.has("paper")) {
      url.searchParams.delete("paper");
      window.history.replaceState({}, "", url);
    }
  }, [selectedPoint]);

  // On first galaxy ready, if URL has ?paper=ID, auto-focus that paper.
  useEffect(() => {
    if (galaxyPoints.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("paper");
    if (id) {
      const target = galaxyPoints.find((p) => String(p.entry.id) === id);
      if (target) handlePointFocus(target);
    }
    // Only on initial mount of the galaxy. handlePointFocus is stable
    // enough across renders; we intentionally don't list it as a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galaxyPoints.length]);

  useEffect(() => {
    pendingQuery.current = searchQuery;

    const processQueue = async () => {
      if (isSearching.current || pendingQuery.current === null) {
        return;
      }

      isSearching.current = true;
      const queryToRun = pendingQuery.current;
      pendingQuery.current = null;

      if (!queryToRun.trim() || !isReady || galaxyPoints.length === 0) {
        setSearchResults([]);
        lastQueryEmbedding.current = null;
        isSearching.current = false;
        if (pendingQuery.current !== null) processQueue(); // Check for another pending query
        return;
      }

      try {
        const [queryEmbedding] = await embed([queryToRun], {
          padding: true,
          truncation: true,
          max_length: 256,
        });
        lastQueryEmbedding.current = queryEmbedding;
        const results: SearchResult[] = galaxyPoints
          .map((point) => ({
            ...point,
            similarity: cos_sim(queryEmbedding, point.embedding),
          }))
          .sort((a, b) => b.similarity - a.similarity);
        setSearchResults(results);
      } catch (e) {
        console.error("Error during search:", e);
      } finally {
        isSearching.current = false;
        if (pendingQuery.current !== null) {
          processQueue();
        }
      }
    };

    processQueue();
  }, [searchQuery, galaxyPoints, isReady, embed]);

  const handlePointFocus = useCallback(
    (point: GalaxyPoint | SearchResult) => {
      setSelectedPoint(point);
      let similarity = (point as SearchResult).similarity;
      if (similarity === undefined) {
        if (lastQueryEmbedding.current) {
          similarity = cos_sim(lastQueryEmbedding.current, point.embedding);
        } else {
          return;
        }
      }
      const focusedResult: SearchResult = { ...point, similarity };
      setSearchResults((prev) => [
        focusedResult,
        ...prev.filter((r) => r.text !== point.text),
      ]);
    },
    [],
  );

  if (!isReady) {
    return (
      <div className="h-screen w-screen bg-[#08080b] text-white relative">
        <MenuScene />
        {!isLoading && (
          <MainMenuUI
            onLoadModel={loadModel}
            totalPapers={corpusStats.total || 360}
            smokingGuns={corpusStats.smokingGuns || 35}
          />
        )}
        {isLoading && <LoadingUI status={status} progress={progress} />}
        {error && (
          <div className="absolute bottom-4 left-4 bg-red-500/50 text-white p-4 rounded-lg">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#08080b] text-white relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {galaxyPoints.length > 0 ? (
          <Canvas frameloop="demand" camera={{ position: [0, 0, 25], fov: 45 }}>
            <color attach="background" args={["#08080c"]} />
            <Suspense
              fallback={
                <Html center>
                  <div className="text-white">Loading 3D Scene...</div>
                </Html>
              }
            >
              <Scene
                galaxyPoints={galaxyPoints}
                searchResults={searchResults}
                filter={stanceFilter}
                onSphereClick={handlePointFocus}
              />
              <EffectComposer enableNormalPass={false}>
                <Bloom
                  luminanceThreshold={0.25}
                  luminanceSmoothing={0.8}
                  height={300}
                  intensity={0.9}
                />
              </EffectComposer>
            </Suspense>
          </Canvas>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Generate a galaxy to begin exploration.
            </p>
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div
          className={`absolute top-0 left-0 h-full bg-black/30 backdrop-blur-lg border-r border-white/10 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } pointer-events-auto`}
          style={{ width: "min(400px, 90vw)" }}
        >
          <div className="flex flex-col h-full p-6 gap-4">
            <div className="flex gap-2 items-center">
              <Logo className="w-12 ml-[-6px]" />
              <h1 className="text-2xl font-bold text-white">
                Unthinking — Paper Galaxy
              </h1>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {corpusStats.total || 360} papers on LLM reasoning, projected
              into 3D semantic space. Each star is one paper. Color is the
              paper's stance on the thesis that LLM &ldquo;reasoning&rdquo;
              is predictive completion.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Smoking-gun findings are suns; their cluster of related papers
              orbits them. Drag any planet to perturb the system — nearby
              papers will yield, and orbits resume when you let go.
            </p>
            <div>
              <div className="flex flex-wrap gap-2 text-xs">
                {(
                  [
                    {
                      key: "supports",
                      label: "supports",
                      color: "#4ade80",
                      title:
                        "The paper supports the thesis that LLM reasoning is predictive completion.",
                    },
                    {
                      key: "balanced",
                      label: "balanced",
                      color: "#e2e8f0",
                      title:
                        "The paper sits between — mixed or qualified evidence.",
                    },
                    {
                      key: "challenges",
                      label: "challenges",
                      color: "#f87171",
                      title:
                        "The paper challenges the thesis — argues for genuine reasoning or finds counter-evidence.",
                    },
                    {
                      key: "smoking_gun",
                      label: "smoking gun",
                      color: "#facc15",
                      title:
                        "Smoking-gun papers — pre-flagged as the strongest direct evidence. They pulse in the galaxy.",
                    },
                  ] as const
                ).map((chip) => {
                  const isActive = stanceFilter === chip.key;
                  return (
                    <button
                      key={chip.key}
                      onClick={() => toggleFilter(chip.key)}
                      title={chip.title}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors"
                      style={{
                        borderColor: isActive
                          ? chip.color
                          : "rgba(255,255,255,0.1)",
                        background: isActive
                          ? `${chip.color}33`
                          : "transparent",
                        color: isActive ? chip.color : "#cbd5e1",
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: chip.color }}
                      />
                      {chip.label}
                    </button>
                  );
                })}
              </div>
              {stanceFilter && (
                <button
                  onClick={() => setStanceFilter(null)}
                  className="mt-2 text-xs text-gray-400 hover:text-white underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 h-5">
              {isGenerating
                ? generationStatus
                : galaxyPoints.length > 0
                  ? `${galaxyPoints.length} papers projected. Search or click any star.`
                  : generationStatus || "Loading model..."}
            </p>
            {galaxyPoints.length > 0 && (
              <div>
                <h2 className="font-semibold mb-2 text-gray-200 text-sm">
                  Quick tour
                </h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const target = galaxyPoints.find(
                        (p) => p.entry.smoking_gun,
                      );
                      if (target) handlePointFocus(target);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-yellow-400/30 text-yellow-300 bg-yellow-500/5 hover:bg-yellow-500/15 transition-colors"
                  >
                    ● Smoking guns ({smokingGuns.length})
                  </button>
                  <button
                    onClick={() => {
                      const target = galaxyPoints.find(
                        (p) => p.entry.cluster === "cot",
                      );
                      if (target) handlePointFocus(target);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Chain-of-thought
                  </button>
                  <button
                    onClick={() => {
                      const target = galaxyPoints.find(
                        (p) => p.entry.cluster === "faithfulness",
                      );
                      if (target) handlePointFocus(target);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Faithfulness
                  </button>
                  <button
                    onClick={() => {
                      const target = galaxyPoints.find(
                        (p) => p.entry.cluster === "memorization",
                      );
                      if (target) handlePointFocus(target);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Memorization
                  </button>
                  <button
                    onClick={() => {
                      const target = galaxyPoints.find(
                        (p) => p.entry.stance === "challenges",
                      );
                      if (target) handlePointFocus(target);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-red-400/30 text-red-300 bg-red-500/5 hover:bg-red-500/15 transition-colors"
                  >
                    Counter-arguments
                  </button>
                </div>
              </div>
            )}
            {galaxyPoints.length > 0 && (
              <div className="flex flex-col min-h-0 flex-grow">
                <h2 className="font-semibold mb-2 text-gray-200 text-sm">
                  Search Results
                </h2>
                <div className="overflow-y-auto pr-2">
                  {searchResults.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Type a query below to see the most semantically related
                      papers.
                    </p>
                  )}
                  {searchResults
                    .filter((r) => r.similarity > 0.35)
                    .slice(0, 50)
                    .map((result, i) => {
                    const color = stanceColor(result.entry.stance);
                    return (
                      <div
                        key={result.entry.id}
                        onClick={() => handlePointFocus(result)}
                        className="p-2 mb-1 rounded-md cursor-pointer transition-colors bg-white/5 hover:bg-white/10 border-l-2"
                        style={{
                          borderLeftColor: color,
                          background:
                            i === 0 ? `${color}22` : undefined,
                        }}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">
                              #{result.entry.id} {result.entry.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {result.entry.stance} · {result.entry.date}
                              {result.entry.smoking_gun && (
                                <span className="text-yellow-300 ml-1">
                                  ● smoking gun
                                </span>
                              )}
                            </p>
                          </div>
                          <span
                            className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0"
                            style={{
                              background: `${color}33`,
                              color,
                            }}
                          >
                            {result.similarity.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mt-auto pt-4 border-t border-white/5 text-[10px] text-gray-500 leading-relaxed">
              <p>
                Built on{" "}
                <a
                  href="https://huggingface.co/spaces/webml-community/semantic-galaxy"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 underline decoration-dotted"
                >
                  webml-community/semantic-galaxy
                </a>{" "}
                · powered by{" "}
                <a
                  href="https://huggingface.co/google/embeddinggemma-300m"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 underline decoration-dotted"
                >
                  EmbeddingGemma
                </a>{" "}
                via{" "}
                <a
                  href="https://huggingface.co/docs/transformers.js"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 underline decoration-dotted"
                >
                  Transformers.js
                </a>
                .{" "}
                <a
                  href="https://github.com/Proteusiq/unthinking"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300 underline decoration-dotted"
                >
                  Source
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-6 backdrop-blur-lg p-2 rounded-full transition-all duration-300 ease-in-out pointer-events-auto border ${
            isSidebarOpen
              ? "bg-black/30 border-white/10"
              : "bg-white/10 border-white/30 hover:bg-white/20"
          }`}
          aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          style={{
            left: isSidebarOpen ? "min(400px, 90vw)" : "0",
            transform: "translateX(1.5rem)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-white transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {galaxyPoints.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 pointer-events-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="press / and ask:  premature confidence, CoT faithfulness, memorization…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 backdrop-blur-lg border border-white/10 rounded-full py-3 px-8 text-base focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
            </div>
          </div>
        )}
        {selectedPoint && (
          <div className="absolute top-6 right-6 max-w-md w-[min(420px,calc(100vw-3rem))] bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg p-5 pointer-events-auto">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Paper #{selectedPoint.entry.id} · {selectedPoint.entry.date}
                </p>
                <h3 className="font-bold text-white mt-1 leading-tight">
                  {selectedPoint.entry.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-gray-400 hover:text-white text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex flex-wrap gap-2 my-3 text-xs">
              <span
                className="px-2 py-0.5 rounded font-semibold"
                style={{
                  background: `${stanceColor(selectedPoint.entry.stance)}33`,
                  color: stanceColor(selectedPoint.entry.stance),
                }}
              >
                {selectedPoint.entry.stance}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300">
                {selectedPoint.entry.cluster}
              </span>
              {selectedPoint.entry.smoking_gun && (
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-semibold">
                  smoking gun
                </span>
              )}
              {selectedPoint.entry.arxiv && (
                <a
                  href={`https://arxiv.org/abs/${selectedPoint.entry.arxiv}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded bg-white/5 text-blue-300 hover:bg-white/10"
                >
                  arXiv:{selectedPoint.entry.arxiv}
                </a>
              )}
            </div>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">
              {selectedPoint.entry.core_finding}
            </p>
            {selectedPoint.entry.quotes.length > 0 && (
              <blockquote
                className="border-l-2 pl-3 my-3 text-sm text-gray-300 italic"
                style={{
                  borderLeftColor: stanceColor(selectedPoint.entry.stance),
                }}
              >
                &ldquo;{selectedPoint.entry.quotes[0]}&rdquo;
              </blockquote>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href={analysisUrl(selectedPoint.entry)}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Open full analysis →
              </a>
              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set(
                    "paper",
                    String(selectedPoint.entry.id),
                  );
                  void navigator.clipboard?.writeText(url.toString());
                }}
                className="bg-white/5 hover:bg-white/15 text-gray-200 text-sm font-semibold py-2 px-4 rounded-lg transition-colors border border-white/10"
                title="Copy a link to this paper"
              >
                Copy link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
