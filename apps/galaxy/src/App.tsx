import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Suspense,
  type FC,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

const MainMenuUI: FC<{ onLoadModel: () => void }> = ({ onLoadModel }) => (
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
      <span className="text-green-400 font-semibold">359 papers.</span>{" "}
      <span className="text-yellow-300 font-semibold">35 smoking guns.</span>{" "}
      <span className="text-white">One story.</span>
    </p>
    <p
      className="text-shadow-lg text-sm sm:text-base text-gray-300 mb-8 animate-fade-in-down max-w-2xl"
      style={{ animationDelay: "300ms" }}
    >
      The literature converges: what we call &ldquo;reasoning&rdquo; in large
      language models is predictive completion. Below, the evidence — every
      paper a star, color is its stance, size is its weight, smoking guns
      pulse.
    </p>
    <button
      onClick={onLoadModel}
      className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 pointer-events-auto animate-fade-in-up shadow-2xl"
      style={{ animationDelay: "600ms" }}
    >
      Enter the evidence →
    </button>
    <p
      className="text-shadow-lg text-xs text-gray-500 mt-4 animate-fade-in-up"
      style={{ animationDelay: "800ms" }}
    >
      Runs entirely in your browser via EmbeddingGemma + Transformers.js.
      Nothing leaves your machine.
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
  onClick: (point: GalaxyPoint) => void;
}

const InteractiveSphere: FC<InteractiveSphereProps> = ({
  point,
  color,
  similarity,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const labelRef = useRef<HTMLDivElement>(null!);
  const { camera, invalidate } = useThree();

  const isSmokingGun = point.entry.smoking_gun;
  const radius = paperSize(point.entry);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current || !labelRef.current) return;

    if (materialRef.current.opacity < 1) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        1,
        0.05,
      );
    }

    const dist = meshRef.current.position.distanceTo(camera.position);
    const distanceScale = THREE.MathUtils.mapLinear(dist, 100, 25, 2.0, 1.0);
    const clampedDistanceScale = THREE.MathUtils.clamp(distanceScale, 1.0, 2.0);
    const hoverScale = isHovered ? 1.25 : 1.0;

    const sphereVisibilityScale =
      materialRef.current.opacity * clampedDistanceScale;
    const meshScale = sphereVisibilityScale * hoverScale;
    meshRef.current.scale.set(meshScale, meshScale, meshScale);

    // Smoking-gun papers slowly pulse — visible from across the galaxy.
    if (isSmokingGun) {
      const baseGlow = similarity !== null ? 1.2 : 0.85;
      const t = state.clock.elapsedTime + point.entry.id * 0.37;
      materialRef.current.emissiveIntensity =
        baseGlow + Math.sin(t * 1.6) * 0.35;
    } else {
      materialRef.current.emissiveIntensity =
        similarity !== null ? 1.0 : 0.45;
    }

    if (labelRef.current) {
      labelRef.current.style.transform = `translateX(-50%) scale(${materialRef.current.opacity})`;
    }

    invalidate();
  });

  const titleLabel = `#${point.entry.id} ${point.entry.title}`;
  const labelText =
    similarity !== null ? `(${similarity.toFixed(2)}) ${titleLabel}` : titleLabel;

  return (
    <group position={point.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(point)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.45}
          transparent
          opacity={0}
        />
      </mesh>
      <Html distanceFactor={12}>
        <div
          ref={labelRef}
          className="text-white bg-black/60 p-1.5 rounded-md text-sm whitespace-nowrap shadow-lg backdrop-blur-md"
          style={{
            transformOrigin: "center top",
            userSelect: "none",
          }}
        >
          <div>{labelText}</div>
        </div>
      </Html>
    </group>
  );
};

interface SceneProps {
  galaxyPoints: GalaxyPoint[];
  searchResults: SearchResult[];
  onSphereClick: (point: GalaxyPoint) => void;
}

const Scene: FC<SceneProps> = ({
  galaxyPoints,
  searchResults,
  onSphereClick,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraTargetPos = useRef(new THREE.Vector3());
  const controlsTargetLookAt = useRef(new THREE.Vector3());
  const shouldAnimate = useRef(false);
  const { camera, invalidate } = useThree();

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
      const topResultPos = new THREE.Vector3(...topResult.position);
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
  }, [searchResults, camera]);

  useFrame(() => {
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
      invalidate();
    }
  });

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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <OrbitControls ref={controlsRef} makeDefault enableZoom enablePan />
      <Stars
        radius={200}
        depth={100}
        count={4000}
        factor={7}
        saturation={1}
        fade
        speed={1}
      />

      {galaxyPoints.map((point, i) => (
        <InteractiveSphere
          key={point.text + i}
          point={point}
          color={pointColors[i]}
          similarity={similarityMap.get(point.text) ?? null}
          onClick={onSphereClick}
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
  const [galaxyPoints, setGalaxyPoints] = useState<GalaxyPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedPoint, setSelectedPoint] = useState<GalaxyPoint | null>(null);
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
    const sentences = entries.map((e) => e.core_finding);
    if (sentences.length < 3) {
      setGenerationStatus("Not enough findings to project.");
      setIsGenerating(false);
      return;
    }

    const fingerprint = fingerprintCorpus(corpus.raw, EMBED_MODEL_ID);

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
        return;
      }

      // Cache miss → embed all findings in the browser via EmbeddingGemma.
      const batch_size = 4;
      const embeddings: number[][] = [];
      const start = performance.now();
      setGenerationStatus(`Embedding 0 of ${sentences.length}…`);
      for (let i = 0; i < sentences.length; i += batch_size) {
        const batch = sentences.slice(i, i + batch_size);
        const batchEmbeddings = await embed(batch, {
          padding: true,
          truncation: true,
          max_length: 256,
        });
        embeddings.push(...batchEmbeddings);
        const done = Math.min(i + batch_size, sentences.length);
        setGenerationStatus(`Embedding ${done} of ${sentences.length}…`);
      }
      const embeddingMs = performance.now() - start;
      console.log(`Embedding time: ${embeddingMs.toFixed(0)}ms`);

      setGenerationStatus("Projecting to 3D…");
      const nNeighbors = Math.max(2, Math.min(sentences.length - 1, 15));
      const umap = new UMAP({ nComponents: 3, nNeighbors, minDist: 0.1 });
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
      const positions = finalPoints.map((p) => p.toArray()) as [
        number,
        number,
        number,
      ][];

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
          'input[placeholder^="e.g."]',
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

  const handlePointFocus = (point: GalaxyPoint | SearchResult) => {
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
    const newResults = [
      focusedResult,
      ...searchResults.filter((r) => r.text !== point.text),
    ];
    setSearchResults(newResults);
  };

  if (!isReady) {
    return (
      <div className="h-screen w-screen bg-[#08080b] text-white relative">
        <MenuScene />
        {!isLoading && <MainMenuUI onLoadModel={loadModel} />}
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
              359 papers on LLM reasoning, projected into 3D semantic space.
              Each star is one paper. Color is the paper's stance on the
              thesis that LLM &ldquo;reasoning&rdquo; is predictive
              completion.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#4ade80" }}
                />
                supports
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#cbd5e1" }}
                />
                balanced
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#f87171" }}
                />
                challenges
              </span>
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
                  {searchResults.slice(0, 25).map((result, i) => {
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
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-6 bg-black/30 backdrop-blur-lg p-2 rounded-full transition-all duration-300 ease-in-out pointer-events-auto"
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
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 pointer-events-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. premature confidence, CoT faithfulness, memorization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 backdrop-blur-lg border border-white/10 rounded-full py-3 px-8 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}
        {smokingGuns.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
            <div className="overflow-hidden py-3 border-t border-yellow-500/20">
              <div className="ticker-track">
                {[...smokingGuns, ...smokingGuns].map((point, i) => (
                  <button
                    key={`${point.entry.id}-${i}`}
                    onClick={() => handlePointFocus(point)}
                    className="inline-flex items-center gap-3 mx-6 text-sm hover:text-yellow-300 transition-colors"
                  >
                    <span className="text-yellow-400 font-bold">●</span>
                    <span className="text-gray-300 italic">
                      &ldquo;{point.entry.quotes[0]?.slice(0, 200)}
                      {(point.entry.quotes[0]?.length ?? 0) > 200 ? "…" : ""}&rdquo;
                    </span>
                    <span className="text-gray-500 font-mono text-xs">
                      #{point.entry.id}
                    </span>
                  </button>
                ))}
              </div>
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
              <blockquote className="border-l-2 border-blue-400/50 pl-3 my-3 text-sm text-gray-300 italic">
                &ldquo;{selectedPoint.entry.quotes[0]}&rdquo;
              </blockquote>
            )}
            <a
              href={analysisUrl(selectedPoint.entry)}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Open full analysis →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
