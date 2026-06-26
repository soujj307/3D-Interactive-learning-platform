import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  BookOpen,
  Gamepad2,
  Atom,
  Globe,
  Calculator,
  Telescope,
  Heart,
  Lightbulb,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";

const subjects = [
  {
    id: "biology",
    name: "Biology",
    icon: Heart,
    color: "bg-green-500",
    description: "Explore DNA, cells, and human anatomy in 3D",
    examples: ["DNA Helix", "Human Heart", "Plant Cell"],
  },
  {
    id: "space",
    name: "Space Science",
    icon: Telescope,
    color: "bg-purple-500",
    description: "Journey through the solar system and beyond",
    examples: ["Solar System", "Planetary Orbits", "Galaxies"],
  },
  {
    id: "math",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    description: "Visualize geometric shapes",
    examples: ["3D Shapes", "Vectors", "Fractals"],
  },
];

const Index = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [mode, setMode] = useState<"learn" | "play">("learn");

  useEffect(() => {
    if (!mountRef.current || !selectedSubject) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [selectedSubject]);

  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-10">
        <h1 className="text-4xl mb-6">Learn Craft</h1>

        <div className="grid gap-4 md:grid-cols-3">
          {subjects.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className="p-4 bg-slate-800 rounded cursor-pointer hover:bg-slate-700"
            >
              <h2 className="text-xl">{s.name}</h2>
              <p className="text-sm text-gray-300">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setMode("learn")}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            Learn Mode
          </button>

          <button
            onClick={() => setMode("play")}
            className="px-4 py-2 bg-purple-600 rounded"
          >
            Play Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 flex justify-between">
        <button onClick={() => setSelectedSubject(null)}>
          <RotateCcw /> Back
        </button>
        <h2>{selectedSubject}</h2>
      </div>

      <div ref={mountRef} className="w-full h-[80vh]" />

      <div className="p-4">
        Mode: {mode}
      </div>
    </div>
  );
};

export default Index;