import { useState, useEffect, useRef, useCallback } from "react";
import BootScreen      from "./components/BootScreen";
import ArcadeCabinet   from "./components/ArcadeCabinet";
import Sprite          from "./components/Sprite";
import AboutSection    from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ResumeSection   from "./components/sections/ResumeSection";
import ContactSection  from "./components/sections/ContactSection";
import { createAudioCtx, playSelect } from "./utils/audio";
import { PF, CABINETS, CAB_POSITIONS, CAB_CY, ROOM_W, ROOM_H, SPEED } from "./data/content";

function getScale() {
  return Math.min(window.innerWidth / ROOM_W, window.innerHeight / ROOM_H);
}

export default function App() {
  const [booted,        setBooted]        = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [nearId,        setNearId]        = useState(null);
  const [spritePos,     setSpritePos]     = useState({ x: ROOM_W/2, y: ROOM_H*0.78 });
  const [spriteDir,     setSpriteDir]     = useState("down");
  const [moving,        setMoving]        = useState(false);
  const [frame,         setFrame]         = useState(0);
  const [scale,         setScale]         = useState(getScale);

  const keysRef      = useRef({});
  const posRef       = useRef({ x: ROOM_W/2, y: ROOM_H*0.78 });
  const rafRef       = useRef(null);
  const lastRef      = useRef(null);
  const frameTimer   = useRef(0);
  const audioRef     = useRef(null);

  useEffect(() => { audioRef.current = createAudioCtx(); }, []);

  useEffect(() => {
    const onResize = () => setScale(getScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getNear = useCallback((px, py) => {
    for (const cp of CAB_POSITIONS) {
      if (Math.hypot(px - cp.cx, py - CAB_CY) < 120) return cp.id;
    }
    return null;
  }, []);

  useEffect(() => {
    if (!booted) return;
    const onKey = e => {
      keysRef.current[e.code] = e.type === "keydown";
      if (e.type === "keydown" && (e.code === "Enter" || e.code === "Space")) {
        const near = getNear(posRef.current.x, posRef.current.y);
        if (near && !activeSection) { playSelect(audioRef.current); setActiveSection(near); }
      }
      if (e.type === "keydown" && e.code === "Escape") setActiveSection(null);
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup",   onKey);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); };
  }, [booted, getNear, activeSection]);

  useEffect(() => {
    if (!booted) return;
    const loop = ts => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      const k = keysRef.current;
      let dx = 0, dy = 0, dir = null;

      if (!activeSection) {
        if (k["ArrowUp"]   || k["KeyW"]) { dy = -1; dir = "up";    }
        if (k["ArrowDown"] || k["KeyS"]) { dy =  1; dir = "down";  }
        if (k["ArrowLeft"] || k["KeyA"]) { dx = -1; dir = "left";  }
        if (k["ArrowRight"]|| k["KeyD"]) { dx =  1; dir = "right"; }
        if (dx && dy) { dx *= 0.707; dy *= 0.707; }

        posRef.current = {
          x: Math.max(24, Math.min(ROOM_W - 24, posRef.current.x + dx * SPEED * dt)),
          y: Math.max(24, Math.min(ROOM_H - 24, posRef.current.y + dy * SPEED * dt)),
        };

        const isMoving = !!(dx || dy);
        setMoving(isMoving);
        if (dir) setSpriteDir(dir);
        if (isMoving) {
          frameTimer.current += dt;
          if (frameTimer.current > 0.12) { setFrame(f => (f+1)%4); frameTimer.current = 0; }
        }
        setSpritePos({ ...posRef.current });
        setNearId(getNear(posRef.current.x, posRef.current.y));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [booted, activeSection, getNear]);

  const activeCab = activeSection ? CABINETS.find(c => c.id === activeSection) : null;
  const close = () => setActiveSection(null);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#080c10",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Arcade room — scaled to fill viewport */}
      <div style={{
        position: "relative",
        width: ROOM_W,
        height: ROOM_H,
        background: "#0d1117",
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        flexShrink: 0,
      }}>

        {/* Floor grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Ceiling strip */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 20,
          background: "linear-gradient(#161b22,#0d1117)",
          borderBottom: "1px solid #21262d",
        }} />

        {/* Title */}
        <div style={{
          position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)",
          textAlign: "center", pointerEvents: "none", whiteSpace: "nowrap",
        }}>
          <div style={{ fontFamily: PF, fontSize: 14, color: "#e6edf3", letterSpacing: "0.12em", textShadow: "0 0 24px #ffffff55" }}>
            JED ROSEMAN'S VAULT
          </div>
          <div style={{ fontFamily: PF, fontSize: 6, color: "#4b5563", marginTop: 10, letterSpacing: "0.12em" }}>
            WALK UP TO A SCREEN · PRESS ENTER
          </div>
        </div>

        {/* Screens */}
        {CABINETS.map((cab, i) => (
          <div key={cab.id} style={{ position: "absolute", left: CAB_POSITIONS[i].cx - 100, top: CAB_CY - 130 }}>
            <ArcadeCabinet
              cab={cab}
              near={nearId === cab.id}
              onEnter={() => { if (!activeSection) { playSelect(audioRef.current); setActiveSection(cab.id); }}}
            />
          </div>
        ))}

        {/* Sprite */}
        <Sprite x={spritePos.x} y={spritePos.y} dir={spriteDir} moving={moving} frame={frame} />

        {/* HUD */}
        <div style={{
          position: "absolute", bottom: 14, left: 18,
          fontFamily: PF, fontSize: 6, color: "#374151", letterSpacing: "0.1em",
        }}>
          WASD / ARROWS · MOVE
        </div>
        {nearId && (
          <div style={{
            position: "absolute", bottom: 14, right: 18,
            fontFamily: PF, fontSize: 6,
            color: CABINETS.find(c => c.id === nearId)?.color,
            letterSpacing: "0.1em",
          }}>
            [ ENTER ] OPEN
          </div>
        )}

        {/* Boot overlay */}
        {!booted && (
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <BootScreen onDone={() => setBooted(true)} />
          </div>
        )}
      </div>

      {/* Section overlays */}
      {activeSection === "about"    && <AboutSection    color={activeCab.color} onClose={close} />}
      {activeSection === "projects" && <ProjectsSection color={activeCab.color} onClose={close} />}
      {activeSection === "resume"   && <ResumeSection   color={activeCab.color} onClose={close} />}
      {activeSection === "contact"  && <ContactSection  color={activeCab.color} onClose={close} />}
    </div>
  );
}
