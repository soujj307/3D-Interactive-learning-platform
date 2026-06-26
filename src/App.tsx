import { useEffect, useState } from "react";
import Subject3D from "./components/Subject3D";

type Subject = {
  title: string;
  description: string;
  tag: string;
  kind: "biology" | "space" | "mathematics" | "geography" | "chemistry" | "physics";
};

const subjects: Subject[] = [
  { title: "Biology", description: "Rotate and zoom a 3D DNA double helix", tag: "DNA HELIX", kind: "biology" },
  { title: "Space Science", description: "Watch planets orbit the sun in real time", tag: "SOLAR SYSTEM", kind: "space" },
  { title: "Mathematics", description: "Explore 3D geometric shapes from every angle", tag: "3D SHAPES", kind: "mathematics" },
  { title: "Geography", description: "Spin an interactive 3D globe", tag: "3D GLOBE", kind: "geography" },
  { title: "Chemistry", description: "Inspect a molecule's atomic structure in 3D", tag: "MOLECULES", kind: "chemistry" },
  { title: "Physics", description: "Observe a swinging pendulum simulation", tag: "PENDULUM", kind: "physics" },
];

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<Subject | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0b0f19", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      <section style={{ textAlign: "center", padding: "48px 16px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, background: "linear-gradient(90deg,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          LearnVerse
        </h1>
        <p style={{ marginTop: 8, color: "#94a3b8" }}>Interactive Web-Based Learning and Gaming Platform</p>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px 48px", display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {subjects.map((s) => (
          <article key={s.title} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 240, background: "#0b1220", cursor: "grab" }}>
              {mounted ? <Subject3D kind={s.kind} /> : <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", color: "#64748b" }}>Loading 3D…</div>}
              <button
                onClick={() => setActive(s)}
                style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.7)", border: "1px solid #334155", borderRadius: 8, padding: "6px 10px", color: "#e2e8f0", cursor: "pointer", backdropFilter: "blur(4px)" }}
              >
                ⤢
              </button>
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{s.title}</h3>
              <p style={{ marginTop: 6, fontSize: "0.875rem", color: "#94a3b8" }}>{s.description}</p>
              <span style={{ display: "inline-block", marginTop: 12, background: "#1e293b", padding: "4px 10px", borderRadius: 6, fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: 1 }}>{s.tag}</span>
            </div>
          </article>
        ))}
      </section>

      {active && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(11,15,25,0.95)", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1f2937", padding: "16px 24px" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{active.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Drag to rotate · scroll to zoom</p>
            </div>
            <button onClick={() => setActive(null)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", cursor: "pointer" }}>
              ✕
            </button>
          </div>
          <div style={{ flex: 1, position: "relative", cursor: "grab" }}>
            <Subject3D kind={active.kind} />
          </div>
        </div>
      )}
    </main>
  );
}
