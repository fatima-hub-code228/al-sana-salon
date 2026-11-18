import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnchantedGardenSceneProps {
  glowTex: THREE.CanvasTexture;
  reducedMotion: boolean;
}

// Module-scope reusable math objects for zero per-frame GC
const _dummy = new THREE.Object3D();
const _petalColor = new THREE.Color();

function SculptedRose3D({
  position,
  scale = 1,
  color = '#f2b8c8',
  phase = 0,
  reducedMotion,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  phase?: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = position[1];

  const petalGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.14, 0.04),
      new THREE.Vector2(0.24, 0.16),
      new THREE.Vector2(0.2, 0.34),
      new THREE.Vector2(0.08, 0.42),
    ];
    return new THREE.LatheGeometry(pts, 14, 0, Math.PI * 0.92);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.getElapsedTime() + phase;
    groupRef.current.position.y = baseY + Math.sin(t * 0.85) * 0.14;
    groupRef.current.rotation.y = t * 0.16;
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.08;
  });

  const petalRings = useMemo(
    () => [
      { count: 4, radius: 0.05, tilt: 0.25, scale: 0.65, y: 0.08 },
      { count: 6, radius: 0.12, tilt: 0.55, scale: 0.88, y: 0.04 },
      { count: 7, radius: 0.19, tilt: 0.85, scale: 1.08, y: 0.0 },
    ],
    []
  );

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Rose Bud Core */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshStandardMaterial color="#d8829a" roughness={0.45} />
      </mesh>
      {/* Layered Sculpted Petals */}
      {petalRings.map((ring, rIdx) =>
        Array.from({ length: ring.count }).map((_, i) => {
          const angle = (i / ring.count) * Math.PI * 2 + rIdx * 0.45;
          return (
            <mesh
              key={`${rIdx}-${i}`}
              geometry={petalGeo}
              position={[Math.cos(angle) * ring.radius, ring.y, Math.sin(angle) * ring.radius]}
              rotation={[ring.tilt, -angle, 0]}
              scale={ring.scale}
            >
              <meshPhysicalMaterial
                color={color}
                roughness={0.48}
                metalness={0.02}
                sheen={0.85}
                sheenColor="#fff1f5"
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })
      )}
      {/* Calyx & Golden-Green Stem */}
      <mesh position={[0, -0.05, 0]}>
        <coneGeometry args={[0.14, 0.14, 6]} />
        <meshStandardMaterial color="#7d967a" roughness={0.65} />
      </mesh>
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.72, 8]} />
        <meshStandardMaterial color="#6e886b" roughness={0.68} />
      </mesh>
    </group>
  );
}

function AnimatedButterfly3D({
  origin,
  radius = 1.6,
  speed = 0.55,
  phase = 0,
  wingColor = '#f7cad8',
  reducedMotion,
}: {
  origin: [number, number, number];
  radius?: number;
  speed?: number;
  phase?: number;
  wingColor?: string;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  const wingGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.18, 0.24, 0.36, 0.18, 0.3, -0.04);
    s.bezierCurveTo(0.28, -0.18, 0.12, -0.24, 0, -0.06);
    s.closePath();
    return new THREE.ShapeGeometry(s, 14);
  }, []);

  useFrame(({ clock }) => {
    if (!rootRef.current || !leftWingRef.current || !rightWingRef.current) return;
    if (reducedMotion) {
      rootRef.current.position.set(origin[0], origin[1], origin[2]);
      return;
    }

    const t = clock.getElapsedTime() * speed + phase;
    const x = origin[0] + Math.sin(t) * radius;
    const y = origin[1] + Math.sin(t * 1.9) * 0.35;
    const z = origin[2] + Math.cos(t * 0.8) * (radius * 0.75);

    rootRef.current.position.set(x, y, z);
    rootRef.current.rotation.y = Math.atan2(Math.cos(t) * radius, -Math.sin(t * 0.8) * radius * 0.75);

    const flap = Math.sin(clock.getElapsedTime() * 7.5 + phase * 3) * 0.72;
    leftWingRef.current.rotation.z = flap;
    rightWingRef.current.rotation.z = -flap;
  });

  return (
    <group ref={rootRef} position={origin}>
      {/* Rose-Gold Filigree Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.014, 0.14, 4, 8]} />
        <meshStandardMaterial color="#cfa082" metalness={0.88} roughness={0.2} />
      </mesh>
      {/* Left & Right Articulated Wings */}
      <group ref={leftWingRef}>
        <mesh geometry={wingGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color={wingColor}
            emissive="#f6dce4"
            emissiveIntensity={0.22}
            roughness={0.28}
            iridescence={0.6}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      <group ref={rightWingRef} scale={[-1, 1, 1]}>
        <mesh geometry={wingGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color={wingColor}
            emissive="#f6dce4"
            emissiveIntensity={0.22}
            roughness={0.28}
            iridescence={0.6}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export function EnchantedGardenScene({ glowTex, reducedMotion }: EnchantedGardenSceneProps) {
  const petalMeshRef = useRef<THREE.InstancedMesh>(null);
  const dustRef = useRef<THREE.Points>(null);

  const petalCount = 85;
  const petalData = useMemo(() => {
    return Array.from({ length: petalCount }).map((_, i) => ({
      x: ((i * 37) % 100) / 10 - 5,
      y: 0.8 + ((i * 23) % 50) / 10,
      z: -5.5 - ((i * 41) % 180) / 10,
      speed: 0.18 + (i % 7) * 0.04,
      sway: 0.4 + (i % 5) * 0.15,
      phase: i * 0.7,
      scale: 0.7 + (i % 4) * 0.18,
    }));
  }, []);

  const petalGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.08, 0.08, 0.09, 0.2, 0, 0.24);
    s.bezierCurveTo(-0.09, 0.2, -0.08, 0.08, 0, 0);
    return new THREE.ShapeGeometry(s, 8);
  }, []);

  useEffect(() => {
    if (!petalMeshRef.current) return;
    const palette = ['#f5c2d1', '#eeb1c3', '#fbe3ea', '#e5a4b8'];
    for (let i = 0; i < petalCount; i++) {
      _petalColor.set(palette[i % palette.length]);
      petalMeshRef.current.setColorAt(i, _petalColor);
    }
    if (petalMeshRef.current.instanceColor) {
      petalMeshRef.current.instanceColor.needsUpdate = true;
    }
    petalMeshRef.current.computeBoundingSphere();
  }, []);

  const dustPositions = useMemo(() => {
    const count = 240;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.sin(i * 12.9898) * 0.5) * 14;
      arr[i * 3 + 1] = 0.4 + ((i * 19) % 55) / 10;
      arr[i * 3 + 2] = 4.5 - ((i * 29) % 270) / 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (petalMeshRef.current) {
      for (let i = 0; i < petalCount; i++) {
        const p = petalData[i];
        const fallOffset = reducedMotion ? 0 : (t * p.speed + p.phase) % 5.5;
        const y = 5.6 - fallOffset;
        const x = p.x + Math.sin(t * 0.8 + p.phase) * p.sway;
        const z = p.z + Math.cos(t * 0.6 + p.phase) * 0.45;

        _dummy.position.set(x, y, z);
        _dummy.rotation.set(
          reducedMotion ? 0.5 : t * 0.7 + p.phase,
          reducedMotion ? p.phase : t * 0.5 + p.phase,
          Math.sin(t + p.phase) * 0.6
        );
        _dummy.scale.setScalar(p.scale);
        _dummy.updateMatrix();
        petalMeshRef.current.setMatrixAt(i, _dummy.matrix);
      }
      petalMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (dustRef.current && !reducedMotion) {
      dustRef.current.rotation.y = Math.sin(t * 0.08) * 0.08;
      dustRef.current.position.y = Math.sin(t * 0.35) * 0.12;
    }
  });

  const roses: Array<{ pos: [number, number, number]; scale: number; color: string; phase: number }> = [
    { pos: [-2.6, 1.8, -8.5], scale: 1.25, color: '#f4c0cf', phase: 0.2 },
    { pos: [2.7, 2.2, -9.8], scale: 1.35, color: '#e99eb4', phase: 1.4 },
    { pos: [-1.4, 2.8, -12.6], scale: 1.1, color: '#fae0e7', phase: 2.1 },
    { pos: [1.8, 1.5, -14.2], scale: 1.45, color: '#f1b3c5', phase: 3.3 },
    { pos: [-3.2, 2.4, -16.8], scale: 1.3, color: '#e59ab1', phase: 4.1 },
    { pos: [2.9, 2.9, -18.5], scale: 1.2, color: '#f7cad7', phase: 5.0 },
    { pos: [0.0, 2.1, -20.5], scale: 1.5, color: '#f2bacb', phase: 2.8 },
  ];

  return (
    <group>
      {/* Soft Rose-Garden Terrace Floor Extending Beyond Portal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -15.5]} receiveShadow>
        <planeGeometry args={[28, 24]} />
        <meshStandardMaterial color="#f5e6e9" roughness={0.85} />
      </mesh>

      {/* Luminous Rose-Petal Garden Columns */}
      {roses.map((r, idx) => (
        <SculptedRose3D
          key={idx}
          position={r.pos}
          scale={r.scale}
          color={r.color}
          phase={r.phase}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Gently Flying 3D Butterflies */}
      <AnimatedButterfly3D
        origin={[-1.2, 2.3, -9.5]}
        radius={1.4}
        speed={0.55}
        phase={0.4}
        wingColor="#fbd5e0"
        reducedMotion={reducedMotion}
      />
      <AnimatedButterfly3D
        origin={[1.6, 2.6, -12.8]}
        radius={1.6}
        speed={0.48}
        phase={2.2}
        wingColor="#f7e2d4"
        reducedMotion={reducedMotion}
      />
      <AnimatedButterfly3D
        origin={[0.2, 2.1, -16.2]}
        radius={1.8}
        speed={0.52}
        phase={4.1}
        wingColor="#f4bccd"
        reducedMotion={reducedMotion}
      />
      <AnimatedButterfly3D
        origin={[-0.9, 2.5, -1.8]}
        radius={0.9}
        speed={0.45}
        phase={1.3}
        wingColor="#fae3ea"
        reducedMotion={reducedMotion}
      />

      {/* Instanced Drifting Rose Petals */}
      <instancedMesh
        ref={petalMeshRef}
        args={[petalGeo, undefined, petalCount]}
        frustumCulled={false}
      >
        <meshStandardMaterial roughness={0.65} side={THREE.DoubleSide} />
      </instancedMesh>

      {/* Shimmering Golden Sunlight Dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={glowTex}
          color="#ffe6bd"
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.78}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
