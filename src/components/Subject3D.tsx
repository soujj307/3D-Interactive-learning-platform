import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

type Kind =
  | "biology"
  | "space"
  | "mathematics"
  | "geography"
  | "chemistry"
  | "physics";

/* ---------------- Individual 3D models ---------------- */

function Spin({
  speed = 0.4,
  children,
}: {
  speed?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

function DNA() {
  const pairs = 22;
  const nodes = useMemo(() => {
    const arr: { y: number; angle: number }[] = [];
    for (let i = 0; i < pairs; i++) {
      arr.push({ y: (i - pairs / 2) * 0.32, angle: i * 0.5 });
    }
    return arr;
  }, []);
  return (
    <Spin speed={0.5}>
      {nodes.map((n, i) => {
        const x = Math.cos(n.angle) * 1.2;
        const z = Math.sin(n.angle) * 1.2;
        return (
          <group key={i}>
            <mesh position={[x, n.y, z]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial color="#8b5cf6" roughness={0.3} />
            </mesh>
            <mesh position={[-x, n.y, -z]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial color="#ec4899" roughness={0.3} />
            </mesh>
            <mesh position={[0, n.y, 0]} rotation={[0, -n.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 2.4, 8]} />
              <meshStandardMaterial color="#a78bfa" opacity={0.6} transparent />
            </mesh>
          </group>
        );
      })}
    </Spin>
  );
}

function Planet({
  radius,
  distance,
  color,
  speed,
}: {
  radius: number;
  distance: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * distance;
      ref.current.position.z = Math.sin(t) * distance;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

function SolarSystem() {
  const planets = [
    { radius: 0.18, distance: 1.6, color: "#a3a3a3", speed: 0.9 },
    { radius: 0.28, distance: 2.4, color: "#60a5fa", speed: 0.6 },
    { radius: 0.24, distance: 3.2, color: "#f87171", speed: 0.45 },
    { radius: 0.4, distance: 4.2, color: "#fbbf24", speed: 0.3 },
  ];
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.2}
        />
      </mesh>
      {planets.map((p, i) => (
        <Planet key={i} {...p} />
      ))}
    </group>
  );
}

function MathShapes() {
  return (
    <Spin speed={0.6}>
      <mesh position={[-1.4, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.18, 100, 16]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[1.4, 0.2, 0]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#ec4899" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.4} roughness={0.2} />
      </mesh>
    </Spin>
  );
}

function Globe() {
  return (
    <Spin speed={0.4}>
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial color="#2563eb" roughness={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.51, 16, 16]} />
        <meshBasicMaterial color="#22c55e" wireframe opacity={0.4} transparent />
      </mesh>
    </Spin>
  );
}

function Molecule() {
  const atoms: [number, number, number][] = [
    [0, 0, 0],
    [1.3, 0.6, 0],
    [-1.3, 0.6, 0],
    [0, -1.3, 0.4],
    [0.6, 0.6, 1.2],
  ];
  return (
    <Spin speed={0.5}>
      {atoms.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[i === 0 ? 0.5 : 0.32, 24, 24]} />
            <meshStandardMaterial
              color={i === 0 ? "#ec4899" : "#8b5cf6"}
              roughness={0.3}
            />
          </mesh>
          {i !== 0 && (
            <mesh
              position={[pos[0] / 2, pos[1] / 2, pos[2] / 2]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            >
              <cylinderGeometry args={[0.06, 0.06, 1.4, 8]} />
              <meshStandardMaterial color="#c4b5fd" />
            </mesh>
          )}
        </group>
      ))}
    </Spin>
  );
}

function Pendulum() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.6;
    }
  });
  return (
    <group position={[0, 1.4, 0]}>
      <mesh>
        <boxGeometry args={[3, 0.12, 0.12]} />
        <meshStandardMaterial color="#a78bfa" />
      </mesh>
      <group ref={ref}>
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 2.6, 8]} />
          <meshStandardMaterial color="#c4b5fd" />
        </mesh>
        <mesh position={[0, -2.6, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#ec4899" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function Model({ kind }: { kind: Kind }) {
  switch (kind) {
    case "biology":
      return <DNA />;
    case "space":
      return <SolarSystem />;
    case "mathematics":
      return <MathShapes />;
    case "geography":
      return <Globe />;
    case "chemistry":
      return <Molecule />;
    case "physics":
      return <Pendulum />;
  }
}

/* ---------------- Canvas wrapper ---------------- */

export default function Subject3D({ kind }: { kind: Kind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#8b5cf6" />
      {kind === "space" && (
        <Stars radius={50} depth={30} count={1500} factor={3} fade />
      )}
      <Model kind={kind} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={14}
        autoRotate={false}
      />
    </Canvas>
  );
}
