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
  stanceColor,
  type PaperEntry,
} from "./constants";
import Logo from "./components/Logo";
import { useModel } from "./components/useModel";

const MainMenuGalaxy: FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const { positions, colors } = useMemo(() => {
    const numPoints = 25000;
    const pos = new Float32Array(numPoints * 3);
    const col = new Float32Array(numPoints * 3);
    const numArms = 5;
    const armSeparation = (2 * Math.PI) / numArms;
    const spread = 2;
    const galaxyRadius = 80;

    const centerColor = new THREE.Color("#ffcc77");
    const armColor = new THREE.Color("#8080ff");

    for (let i = 0; i < numPoints; i++) {
      const dist = Math.pow(Math.random(), 2) * galaxyRadius;
      const angle =
        Math.floor(i / (numPoints / numArms)) * armSeparation +
        dist * 0.1 +
        (Math.random() - 0.5) * 0.1;
      const x = Math.cos(angle) * dist + (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread * 1.5;
      const z = Math.sin(angle) * dist + (Math.random() - 0.5) * spread;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const lerpFactor = dist / galaxyRadius;
      const finalColor = new THREE.Color().lerpColors(
        centerColor,
        armColor,
        lerpFactor,
      );

      col[i * 3] = finalColor.r;
      col[i * 3 + 1] = finalColor.g;
      col[i * 3 + 2] = finalColor.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0, -0.1]}>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.9}
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
  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4 z-10 pointer-events-none bg-black/20">
    <h1 className="text-shadow-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 animate-fade-in-down">
      Unthinking — Paper Galaxy
    </h1>
    <p
      className="text-shadow-lg text-sm sm:text-md md:text-lg lg:text-xl text-gray-100 mb-6 animate-fade-in-down"
      style={{ animationDelay: "200ms" }}
    >
      359 papers on LLM reasoning, projected in 3D semantic space.
      <br />
      Powered by EmbeddingGemma and Transformers.js — runs entirely in your
      browser.
    </p>
    <button
      onClick={onLoadModel}
      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 pointer-events-auto animate-fade-in-up"
      style={{ animationDelay: "600ms" }}
    >
      Enter the galaxy
    </button>
  </div>
);

const LoadingUI: FC<{ status: string; progress: number }> = ({
  status,
  progress,
}) => (
  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
    <div className="w-full max-w-md text-center p-4">
      <Logo className="w-24 mx-auto mb-6" />
      <h2 className="text-2xl font-bold mb-4">Initializing Galaxy...</h2>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-400 h-5">{status}</p>
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

  useFrame(() => {
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

    if (labelRef.current) {
      labelRef.current.style.transform = `translateX(-50%) scale(${materialRef.current.opacity})`;
    }

    invalidate();
  });

  const titleLabel = `#${point.entry.id} ${point.entry.title}`;
  const labelText =
    similarity !== null ? `(${similarity.toFixed(2)}) ${titleLabel}` : titleLabel;
  const glowIntensity = similarity !== null ? 1.0 : 0.45;

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
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          roughness={0.5}
          emissive={color}
          emissiveIntensity={glowIntensity}
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
  const {
    device,
    loadModel,
    isLoading,
    isReady,
    progress,
    status,
    error,
    embed,
  } = useModel();

  const [corpus, setCorpus] = useState<PaperEntry[]>([]);
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

  useEffect(() => {
    loadCorpus()
      .then(setCorpus)
      .catch((e) =>
        setGenerationStatus(`Failed to load corpus: ${e?.message ?? e}`),
      );
  }, []);

  const generateGalaxy = useCallback(async () => {
    if (!isReady || corpus.length === 0 || galaxyPoints.length > 0) {
      return;
    }
    setIsGenerating(true);
    setSearchResults([]);
    setSearchQuery("");
    lastQueryEmbedding.current = null;
    setGenerationStatus("Projecting galaxy...");
    const entries = corpus.filter((e) => e.core_finding?.length > 0);
    const sentences = entries.map((e) => e.core_finding);
    if (sentences.length < 3) {
      setGenerationStatus("Not enough findings to project.");
      setIsGenerating(false);
      return;
    }

    const batch_size = device === "webgpu" ? 4 : 1;
    try {
      const embeddings: number[][] = [];
      const start = performance.now();
      setGenerationStatus(`Embedding... (0%)`);
      for (let i = 0; i < sentences.length; i += batch_size) {
        const batch = sentences.slice(i, i + batch_size);
        const progress = ((i + batch.length) / sentences.length) * 100;

        const batchEmbeddings = await embed(batch, {
          padding: true,
          truncation: true,
          max_length: 256,
        });
        embeddings.push(...batchEmbeddings);
        setGenerationStatus(`Embedding... (${progress.toFixed(0)}%)`);
      }
      const end = performance.now();
      const embeddingTime = end - start;
      console.log(`Embedding time: ${embeddingTime}ms`);

      setGenerationStatus("Running UMAP to create 3D projection...");
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
        `Galaxy ready — ${newPoints.length} papers projected. Search or click any star.`,
      );
      setIsSidebarOpen(false);
    } catch (e) {
      console.error(e);
      setGenerationStatus("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  }, [isReady, corpus, galaxyPoints.length, embed, device]);

  useEffect(() => {
    void generateGalaxy();
  }, [generateGalaxy]);

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
                  luminanceThreshold={0.1}
                  luminanceSmoothing={0.9}
                  height={300}
                  intensity={1.5}
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
              <div className="flex flex-col min-h-0 flex-grow">
                <h2 className="font-semibold mb-2 text-gray-200">
                  Search Results
                </h2>
                <div className="overflow-y-auto pr-2">
                  {searchResults.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Type a query below to see the most semantically related
                      papers.
                    </p>
                  )}
                  {searchResults.slice(0, 25).map((result, i) => (
                    <div
                      key={result.entry.id}
                      onClick={() => handlePointFocus(result)}
                      className={`p-2 mb-1 rounded-md cursor-pointer transition-colors ${
                        i === 0
                          ? "bg-blue-500/30 border border-blue-400/50"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">
                            #{result.entry.id} {result.entry.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {result.entry.stance} · {result.entry.date}
                          </p>
                        </div>
                        <span className="text-xs font-mono bg-blue-400/20 text-blue-300 px-1.5 py-0.5 rounded shrink-0">
                          {result.similarity.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  ))}
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 pointer-events-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. premature confidence, CoT faithfulness, memorization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/30 backdrop-blur-lg border border-white/10 rounded-full py-3 px-8 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
