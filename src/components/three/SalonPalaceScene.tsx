import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SalonPalaceSceneProps {
  marbleTex: THREE.CanvasTexture;
  velvetTex: THREE.CanvasTexture;
  isSoftwareGl: boolean;
  reducedMotion: boolean;
}

function VelvetSalonChair({
  position,
  rotationY = 0,
  velvetTex,
}: {
  position: [number, number, number];
  rotationY?: number;
  velvetTex: THREE.CanvasTexture;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Brushed Rose-Gold Circular Base */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.36, 0.4, 0.06, 32]} />
        <meshPhysicalMaterial
          color="#d9aa8e"
          metalness={0.92}
          roughness={0.18}
          anisotropy={0.7}
        />
      </mesh>
      {/* 2. Tapered Hydraulic Stem */}
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.44, 20]} />
        <meshStandardMaterial color="#cfa083" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* 3. Footrest Crescent Ring */}
      <mesh position={[0, 0.2, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.016, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#dfb397" metalness={0.9} roughness={0.18} />
      </mesh>
      {/* 4. Plush Velvet Seat Cushion */}
      <mesh position={[0, 0.52, 0.03]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.34, 0.14, 32]} />
        <meshPhysicalMaterial
          map={velvetTex}
          color="#e8b7c7"
          roughness={0.82}
          metalness={0.02}
          sheen={1.0}
          sheenRoughness={0.45}
          sheenColor="#ffe9f0"
        />
      </mesh>
      {/* 5. Curved Horseshoe Velvet Backrest */}
      <mesh position={[0, 0.8, -0.04]} rotation={[0, Math.PI * 0.72, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.38, 0.46, 32, 1, true, 0, Math.PI * 1.44]} />
        <meshPhysicalMaterial
          map={velvetTex}
          color="#dfa8ba"
          roughness={0.8}
          metalness={0.02}
          sheen={1.0}
          sheenRoughness={0.42}
          sheenColor="#ffe9f0"
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* 6. Rose-Gold Rim Piping Along Backrest Top */}
      <mesh position={[0, 1.03, -0.04]} rotation={[Math.PI / 2, 0, Math.PI * 0.72]}>
        <torusGeometry args={[0.39, 0.018, 12, 32, Math.PI * 1.44]} />
        <meshStandardMaterial color="#d8a88b" metalness={0.92} roughness={0.16} />
      </mesh>
    </group>
  );
}

function ArchedRoseGoldMirror({
  position,
  rotationY = 0,
  scale = 1,
  isHero = false,
  isSoftwareGl,
}: {
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  isHero?: boolean;
  isSoftwareGl: boolean;
}) {
  const archShape = useMemo(() => {
    const w = 0.88;
    const h = 1.65;
    const shape = new THREE.Shape();
    shape.moveTo(-w, 0);
    shape.lineTo(-w, h);
    shape.absarc(0, h, w, Math.PI, 0, true);
    shape.lineTo(w, 0);
    shape.closePath();

    const hole = new THREE.Path();
    const hw = 0.76;
    const hh = 1.58;
    hole.moveTo(-hw, 0.1);
    hole.lineTo(-hw, hh);
    hole.absarc(0, hh, hw, Math.PI, 0, true);
    hole.lineTo(hw, 0.1);
    hole.closePath();
    shape.holes.push(hole);
    return shape;
  }, []);

  const glassShape = useMemo(() => {
    const hw = 0.77;
    const hh = 1.58;
    const s = new THREE.Shape();
    s.moveTo(-hw, 0.08);
    s.lineTo(-hw, hh);
    s.absarc(0, hh, hw, Math.PI, 0, true);
    s.lineTo(hw, 0.08);
    s.closePath();
    return s;
  }, []);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Rose-Gold Sculpted Beveled Arch Frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <extrudeGeometry
          args={[
            archShape,
            {
              depth: 0.08,
              bevelEnabled: true,
              bevelThickness: 0.025,
              bevelSize: 0.022,
              bevelSegments: 3,
              curveSegments: 28,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#d9aa8c"
          metalness={0.94}
          roughness={0.14}
          anisotropy={0.8}
          clearcoat={0.5}
        />
      </mesh>

      {/* Reflective Blush-Champagne Mirror Pane */}
      <mesh position={[0, 0, 0.035]}>
        <shapeGeometry args={[glassShape, 28]} />
        <meshPhysicalMaterial
          color={isHero ? '#fff3ee' : '#f8ece9'}
          metalness={0.86}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={1.6}
          emissive={isHero ? '#f8dcd0' : '#f2d9d4'}
          emissiveIntensity={isHero ? 0.18 : 0.06}
        />
      </mesh>

      {/* Ornate Crown Crest Finial */}
      <mesh position={[0, 2.58, 0.04]} castShadow>
        <octahedronGeometry args={[0.09, 0]} />
        <meshPhysicalMaterial
          color="#f7dfd2"
          metalness={0.2}
          roughness={0.08}
          transmission={isSoftwareGl ? 0 : 0.85}
          ior={1.7}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, 2.49, 0.04]}>
        <torusGeometry args={[0.11, 0.015, 10, 24]} />
        <meshStandardMaterial color="#dfb092" metalness={0.92} roughness={0.15} />
      </mesh>
    </group>
  );
}

function BeautyCounterAndProducts({
  position,
  rotationY = 0,
  marbleTex,
  isSoftwareGl,
}: {
  position: [number, number, number];
  rotationY?: number;
  marbleTex: THREE.CanvasTexture;
  isSoftwareGl: boolean;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Fluted Cream Pedestal Base */}
      <mesh position={[0, 0.39, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.78, 0.56]} />
        <meshStandardMaterial color="#f5ebe6" roughness={0.62} metalness={0.04} />
      </mesh>
      {/* 2. Rose-Gold Plinth Trim */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.94, 0.08, 0.6]} />
        <meshStandardMaterial color="#d4a487" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* 3. Honed Veined Marble Countertop Slab */}
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.04, 0.09, 0.68]} />
        <meshPhysicalMaterial
          map={marbleTex}
          color="#ffffff"
          roughness={0.16}
          metalness={0.02}
          clearcoat={0.75}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* 4. Faceted Perfume Flacon Left */}
      <group position={[-0.62, 0.87, 0.06]}>
        <mesh position={[0, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.065, 0.16, 8]} />
          <meshPhysicalMaterial
            color="#f7cad7"
            roughness={0.06}
            metalness={0.05}
            transmission={isSoftwareGl ? 0 : 0.88}
            transparent={isSoftwareGl}
            opacity={isSoftwareGl ? 0.65 : 1}
            ior={1.55}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.036, 12, 12]} />
          <meshStandardMaterial color="#d8a88b" metalness={0.94} roughness={0.15} />
        </mesh>
      </group>

      {/* 5. Rose-Gold Serum Dropper */}
      <group position={[-0.42, 0.87, -0.05]}>
        <mesh position={[0, 0.07, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.14, 16]} />
          <meshPhysicalMaterial color="#f2c4b4" roughness={0.18} metalness={0.1} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.018, 0.025, 0.06, 12]} />
          <meshStandardMaterial color="#d9aa8c" metalness={0.92} roughness={0.15} />
        </mesh>
      </group>

      {/* 6. Ceramic Vase + Blush Roses Right */}
      <group position={[0.66, 0.87, 0.02]}>
        <mesh position={[0, 0.11, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.085, 0.22, 20]} />
          <meshPhysicalMaterial color="#fdf6f3" roughness={0.22} clearcoat={0.85} />
        </mesh>
        {[
          [-0.04, 0.27, 0.02, '#efb8c6'],
          [0.04, 0.29, -0.02, '#e29fb3'],
          [0, 0.32, 0.03, '#f7d1dc'],
        ].map(([bx, by, bz, col], idx) => (
          <mesh key={idx} position={[bx as number, by as number, bz as number]} castShadow>
            <dodecahedronGeometry args={[0.055, 1]} />
            <meshStandardMaterial color={col as string} roughness={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CrystalChandelier({
  position,
  isSoftwareGl,
  reducedMotion,
}: {
  position: [number, number, number];
  isSoftwareGl: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.08;
  });

  const crystals = useMemo(() => {
    const items: Array<{ x: number; y: number; z: number; scale: number }> = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      items.push({ x: Math.cos(a) * 0.92, y: -0.58, z: Math.sin(a) * 0.92, scale: 1 });
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.2;
      items.push({ x: Math.cos(a) * 0.56, y: -0.92, z: Math.sin(a) * 0.56, scale: 0.85 });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={position}>
      {/* Suspension Rod */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.3, 12]} />
        <meshStandardMaterial color="#d8a88b" metalness={0.94} roughness={0.14} />
      </mesh>
      {/* Top Crown Ring */}
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.025, 12, 40]} />
        <meshStandardMaterial color="#dfb296" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Inner Tier Ring */}
      <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.56, 0.022, 12, 32]} />
        <meshStandardMaterial color="#dfb296" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Glowing Crystal Center Finial */}
      <mesh position={[0, -1.12, 0]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshPhysicalMaterial
          color="#fff7ea"
          emissive="#ffe2b5"
          emissiveIntensity={0.75}
          roughness={0.05}
          transmission={isSoftwareGl ? 0 : 0.85}
          ior={1.8}
        />
      </mesh>
      {/* Hanging Crystal Prisms */}
      {crystals.map((c, idx) => (
        <mesh key={idx} position={[c.x, c.y, c.z]} scale={c.scale}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshPhysicalMaterial
            color="#fff9f4"
            emissive="#ffdfba"
            emissiveIntensity={0.42}
            roughness={0.04}
            metalness={0.1}
            transmission={isSoftwareGl ? 0 : 0.9}
            ior={1.85}
            clearcoat={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SalonPalaceScene({
  marbleTex,
  velvetTex,
  isSoftwareGl,
  reducedMotion,
}: SalonPalaceSceneProps) {
  return (
    <group>
      {/* Veined Cream Marble Palace Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1.5]} receiveShadow>
        <planeGeometry args={[18, 20]} />
        <meshPhysicalMaterial
          map={marbleTex}
          color="#ffffff"
          roughness={0.22}
          metalness={0.02}
          clearcoat={0.6}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {/* Center Blush-Champagne Silk Runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[2.5, 11.5]} />
        <meshStandardMaterial color="#f2dce2" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Left & Right Blush Ivory Architectural Walls with Arched Sunlight Windows */}
      {[-5.6, 5.6].map((wallX, sideIdx) => (
        <group key={sideIdx} position={[wallX, 2.8, -0.5]}>
          <mesh receiveShadow>
            <boxGeometry args={[0.25, 5.6, 15]} />
            <meshStandardMaterial color="#f9eeea" roughness={0.78} />
          </mesh>
          {/* Tall Sunlit Window Glow Panels */}
          {[-2.2, 2.2].map((wz, wIdx) => (
            <group key={wIdx} position={[sideIdx === 0 ? 0.14 : -0.14, 0.35, wz]}>
              <mesh rotation={[0, sideIdx === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
                <planeGeometry args={[2.1, 3.6]} />
                <meshBasicMaterial color="#fff6e8" />
              </mesh>
              {/* Soft Golden Sunlight Shaft */}
              <mesh
                position={[sideIdx === 0 ? 1.8 : -1.8, -0.8, 0]}
                rotation={[0, 0, sideIdx === 0 ? -0.45 : 0.45]}
              >
                <planeGeometry args={[2.2, 4.4]} />
                <meshBasicMaterial
                  color="#ffe9c8"
                  transparent
                  opacity={0.07}
                  depthWrite={false}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Back Portal Archway Framing the Hero Mirror & Enchanted Garden Beyond */}
      <group position={[0, 0, -5.2]}>
        {/* Left & Right Flanking Pillars */}
        {[-3.2, 3.2].map((px, idx) => (
          <mesh key={idx} position={[px, 2.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 5.2, 0.4]} />
            <meshStandardMaterial color="#f7e8e5" roughness={0.72} />
          </mesh>
        ))}
        {/* Rose-Gold Arch Molding */}
        <mesh position={[0, 3.3, 0.22]}>
          <torusGeometry args={[1.95, 0.07, 16, 48, Math.PI]} />
          <meshStandardMaterial color="#d8a88b" metalness={0.92} roughness={0.16} />
        </mesh>
      </group>

      {/* Hero Center Rose-Gold Arched Mirror (Camera Arrival Focal Point) */}
      <ArchedRoseGoldMirror
        position={[0, 0.9, -4.15]}
        scale={1.18}
        isHero
        isSoftwareGl={isSoftwareGl}
      />

      {/* Left & Right Vanity Stations (Mirrors + Marble Counters + Pink Velvet Chairs) */}
      {[-3.45, 3.45].map((xPos, sideIdx) => {
        const rotY = sideIdx === 0 ? Math.PI / 2 : -Math.PI / 2;
        const chairOffset = sideIdx === 0 ? 1.25 : -1.25;
        return (
          <group key={sideIdx}>
            <BeautyCounterAndProducts
              position={[xPos, 0, -0.4]}
              rotationY={rotY}
              marbleTex={marbleTex}
              isSoftwareGl={isSoftwareGl}
            />
            <ArchedRoseGoldMirror
              position={[xPos + (sideIdx === 0 ? -0.22 : 0.22), 0.92, -0.4]}
              rotationY={rotY}
              scale={0.86}
              isSoftwareGl={isSoftwareGl}
            />
            <VelvetSalonChair
              position={[xPos + chairOffset, 0, -0.4]}
              rotationY={sideIdx === 0 ? -Math.PI / 2 : Math.PI / 2}
              velvetTex={velvetTex}
            />

            {/* Second pair deeper in salon */}
            <BeautyCounterAndProducts
              position={[xPos, 0, 2.9]}
              rotationY={rotY}
              marbleTex={marbleTex}
              isSoftwareGl={isSoftwareGl}
            />
            <ArchedRoseGoldMirror
              position={[xPos + (sideIdx === 0 ? -0.22 : 0.22), 0.92, 2.9]}
              rotationY={rotY}
              scale={0.86}
              isSoftwareGl={isSoftwareGl}
            />
            <VelvetSalonChair
              position={[xPos + chairOffset, 0, 2.9]}
              rotationY={sideIdx === 0 ? -Math.PI / 2 : Math.PI / 2}
              velvetTex={velvetTex}
            />
          </group>
        );
      })}

      {/* Grand Crystal Chandelier Overhead */}
      <CrystalChandelier
        position={[0, 4.45, -0.6]}
        isSoftwareGl={isSoftwareGl}
        reducedMotion={reducedMotion}
      />
      <pointLight position={[0, 3.5, -0.6]} color="#ffe5c4" intensity={4.5} distance={14} decay={1.6} />
      <pointLight position={[0, 2.4, -3.5]} color="#ffdfc8" intensity={3.2} distance={9} decay={1.7} />
    </group>
  );
}
