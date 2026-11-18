import { Component, type MutableRefObject, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SALON_CONFIG } from '@/src/config/salonConfig';
import { detectWebGLCapabilities } from '@/src/utils/webglSupport';
import {
  createMarbleTexture,
  createSoftGlowTexture,
  createVelvetTexture,
} from './proceduralTextures';
import { SalonPalaceScene } from './SalonPalaceScene';
import { EnchantedGardenScene } from './EnchantedGardenScene';

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function StudioEnvironmentAndRenderer({ isSoftwareGl }: { isSoftwareGl: boolean }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    return () => {
      envTarget.dispose();
    };
  }, [gl, scene]);

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.08;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.shadowMap.enabled = !isSoftwareGl;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl, isSoftwareGl]);

  return null;
}

function CameraChoreographer({
  scrollProgressRef,
  pointerRef,
  reducedMotion,
}: {
  scrollProgressRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const introTimerRef = useRef(0);
  const targetPos = useMemo(() => new THREE.Vector3(0, 2.05, 6.2), []);
  const targetLook = useMemo(() => new THREE.Vector3(0, 1.85, -4.0), []);
  const currentLook = useMemo(() => new THREE.Vector3(0, 1.85, -4.0), []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    introTimerRef.current = Math.min(introTimerRef.current + delta, 3.4);

    const introProgress = reducedMotion
      ? 1
      : 1 - Math.pow(1 - introTimerRef.current / 3.4, 3);
    const scroll = scrollProgressRef.current;

    // 4-chapter cinematic path: Salon Entrance -> Mirror Portal -> Enchanted Garden -> Twilight Vista
    let baseX = 0;
    let baseY = 2.05;
    let baseZ = 6.2 - introProgress * 3.85;
    let lookX = 0;
    let lookY = 1.88;
    let lookZ = -4.2;

    if (scroll > 0.02) {
      if (scroll <= 0.32) {
        const k = (scroll - 0.02) / 0.3;
        baseZ = THREE.MathUtils.lerp(2.35, -7.2, k);
        baseY = THREE.MathUtils.lerp(2.05, 2.25, k);
        baseX = Math.sin(k * Math.PI) * 0.45;
        lookZ = THREE.MathUtils.lerp(-4.2, -14.5, k);
        lookY = THREE.MathUtils.lerp(1.88, 2.15, k);
      } else if (scroll <= 0.68) {
        const k = (scroll - 0.32) / 0.36;
        baseZ = THREE.MathUtils.lerp(-7.2, -14.8, k);
        baseY = THREE.MathUtils.lerp(2.25, 2.55, k);
        baseX = Math.cos(k * Math.PI) * 0.65;
        lookZ = THREE.MathUtils.lerp(-14.5, -21.5, k);
        lookY = THREE.MathUtils.lerp(2.15, 2.0, k);
      } else {
        const k = (scroll - 0.68) / 0.32;
        baseZ = THREE.MathUtils.lerp(-14.8, -18.2, k);
        baseY = THREE.MathUtils.lerp(2.55, 2.85, k);
        baseX = THREE.MathUtils.lerp(-0.65, 0.25, k);
        lookZ = THREE.MathUtils.lerp(-21.5, -24.0, k);
        lookY = THREE.MathUtils.lerp(2.0, 2.2, k);
      }
    }

    const px = reducedMotion ? 0 : pointerRef.current.x * 0.42;
    const py = reducedMotion ? 0 : pointerRef.current.y * 0.22;

    targetPos.set(baseX + px, baseY + py, baseZ);
    targetLook.set(lookX + px * 0.35, lookY + py * 0.3, lookZ);

    const dampLambda = reducedMotion ? 18 : 4.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, dampLambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, dampLambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, dampLambda, delta);

    currentLook.x = THREE.MathUtils.damp(currentLook.x, targetLook.x, dampLambda, delta);
    currentLook.y = THREE.MathUtils.damp(currentLook.y, targetLook.y, dampLambda, delta);
    currentLook.z = THREE.MathUtils.damp(currentLook.z, targetLook.z, dampLambda, delta);
    camera.lookAt(currentLook);
  });

  return null;
}

function SceneWorld({
  scrollProgressRef,
  pointerRef,
  isSoftwareGl,
  reducedMotion,
}: {
  scrollProgressRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  isSoftwareGl: boolean;
  reducedMotion: boolean;
}) {
  const { gl } = useThree();
  const maxAniso = gl.capabilities.getMaxAnisotropy();

  const marbleTex = useMemo(() => createMarbleTexture(maxAniso), [maxAniso]);
  const velvetTex = useMemo(() => createVelvetTexture(maxAniso), [maxAniso]);
  const glowTex = useMemo(() => createSoftGlowTexture(), []);

  useEffect(() => {
    return () => {
      marbleTex.dispose();
      velvetTex.dispose();
      glowTex.dispose();
    };
  }, [marbleTex, velvetTex, glowTex]);

  return (
    <>
      <color attach="background" args={['#f9ece8']} />
      <fogExp2 attach="fog" args={['#f9ece8', 0.042]} />

      <StudioEnvironmentAndRenderer isSoftwareGl={isSoftwareGl} />
      <CameraChoreographer
        scrollProgressRef={scrollProgressRef}
        pointerRef={pointerRef}
        reducedMotion={reducedMotion}
      />

      {/* Warm Key Sunlight + Cool Ivory-Blush Hemisphere Fill + Rim */}
      <hemisphereLight args={['#fffaf7', '#e9cdd6', 0.95]} />
      <directionalLight
        position={[7, 9, 5]}
        color="#ffe6c7"
        intensity={1.75}
        castShadow={!isSoftwareGl}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={28}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-6, 5, -12]} color="#f8dbe4" intensity={0.85} />

      <SalonPalaceScene
        marbleTex={marbleTex}
        velvetTex={velvetTex}
        isSoftwareGl={isSoftwareGl}
        reducedMotion={reducedMotion}
      />
      <EnchantedGardenScene glowTex={glowTex} reducedMotion={reducedMotion} />
    </>
  );
}

interface SalonExperienceCanvasProps {
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  forceFallback2D: boolean;
}

export function SalonExperienceCanvas({
  scrollProgressRef,
  reducedMotion,
  forceFallback2D,
}: SalonExperienceCanvasProps) {
  const { hasWebGL, isSoftwareGl } = useMemo(() => detectWebGLCapabilities(), []);
  const [contextLost, setContextLost] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const fallback2D = (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F9ECE8]">
      <img
        src={SALON_CONFIG.atelierGalleryHeroImage}
        alt="ALSANA Beauty Salon blush-pink marble interior"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F7]/75 via-[#F7E6EC]/50 to-[#FDF9F7]/90" />
    </div>
  );

  if (!hasWebGL || forceFallback2D || contextLost) {
    return fallback2D;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <CanvasErrorBoundary fallback={fallback2D}>
        <Canvas
          dpr={isSoftwareGl ? 1 : [1, 2]}
          shadows={!isSoftwareGl}
          camera={{ fov: 46, near: 0.1, far: 60, position: [0, 2.05, 6.2] }}
          gl={{
            antialias: !isSoftwareGl,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (e: Event) => {
              e.preventDefault();
              setContextLost(true);
            };
            const onRestored = () => setContextLost(false);
            canvas.addEventListener('webglcontextlost', onLost, false);
            canvas.addEventListener('webglcontextrestored', onRestored, false);
          }}
        >
          <SceneWorld
            scrollProgressRef={scrollProgressRef}
            pointerRef={pointerRef}
            isSoftwareGl={isSoftwareGl}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
