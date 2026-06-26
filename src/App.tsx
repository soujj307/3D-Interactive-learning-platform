import React, { useState, useRef } from 'react';
import { Dna, Orbit, Shapes, Globe2, Beaker, Activity, Play, BookOpen, Volume2 } from 'lucide-react';

const subjects = [
  { id: 'Biology', icon: <Dna />, sub: 'DNA Helix', desc: 'Explore DNA, cells, and human anatomy in 3D', color: 'hover:border-green-500' },
  { id: 'Space Science', icon: <Orbit />, sub: 'Solar System', desc: 'Journey through the solar system and beyond', color: 'hover:border-blue-500' },
  { id: 'Mathematics', icon: <Shapes />, sub: '3D Shapes', desc: 'Visualize geometric shapes and mathematical concepts', color: 'hover:border-purple-500' },
  { id: 'Geography', icon: <Globe2 />, sub: '3D Globe', desc: "Explore Earth's features and continents", color: 'hover:border-emerald-500' },
  { id: 'Chemistry', icon: <Beaker />, sub: 'Molecules', desc: 'Interact with molecules and atomic structures', color: 'hover:border-pink-500' },
  { id: 'Physics', icon: <Activity />, sub: 'Pendulum', desc: 'Understand forces, energy, and physical laws', color: 'hover:border-orange-500' },
];

export default function App() {
  const [view, setView] = useState<'home' | 'detail'>('home');
  const [activeSubject, setActiveSubject] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startLearning = (subject: any) => {
    setActiveSubject(subject);
    setView('detail');
    audioRef.current?.play().catch(() => {}); // Play BGM on click
  };

  if (view === 'detail') {
    return (
      <div className="h-screen flex flex-col bg-black">
        <header className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1a1025]">
          <button onClick={() => setView('home')} className="text-sm text-gray-400 hover:text-white">
            ← Back to Subjects
          </button>
          <div className="flex items-center gap-2 font-bold">
            {activeSubject.icon} {activeSubject.id}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 rounded text-xs">Learn Mode</button>
            <button className="px-3 py-1 bg-white/10 rounded text-xs">Play Mode</button>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center relative">
          <div className="absolute left-8 bottom-8 text-xs text-gray-500 space-y-1">
            <p>Controls:</p>
            <p>• Click & drag to rotate</p>
            <p>• Scroll to zoom</p>
          </div>
          <p className="text-xl animate-pulse">Rendering {activeSubject.id} 3D Model...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <audio ref={audioRef} src="/bgm.mp3" loop />
      
      <header className="text-center mb-12">
        <h1 className="text-6xl font-black mb-2 tracking-tighter">Learn Craft</h1>
        <p className="text-gray-400 text-lg">Interactive Web-Based Learning and Gaming Platform</p>
        
        <div className="flex justify-center gap-8 mt-8 text-sm font-medium">
          <button className="flex items-center gap-2 hover:text-blue-400"><BookOpen size={16}/> Learn Mode</button>
          <button className="flex items-center gap-2 hover:text-purple-400"><Play size={16}/> Play Mode</button>
          <button className="flex items-center gap-2 hover:text-pink-400"><Volume2 size={16}/> Audio Narration</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Choose Your Learning Adventure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((s) => (
            <div 
              key={s.id}
              onClick={() => startLearning(s)}
              className={`glass-card p-8 rounded-2xl cursor-pointer group ${s.color}`}
            >
              <div className="mb-4 text-white/80 group-hover:scale-110 transition-transform">
                {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-1">{s.id}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">{s.desc}</p>
              <span className="text-[10px] font-mono py-1 px-2 bg-black/40 rounded border border-white/5 uppercase tracking-wider">
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}