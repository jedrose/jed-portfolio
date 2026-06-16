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

export default function App() {
  const [booted,        setBooted]        = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [nearId,        setNearId]        = useState(null);
  const [spritePos,     setSpritePos]     = useState({ x: ROOM_W/2, y: ROOM_H*0.78 });
  const [spriteDir,     setSpriteDir]     = useState("down");
  const [moving,        setMoving]        = useState(false);
  const [frame,         setFrame]         = useState(0);

  const keysRef      = useRef({});
  const posRef       = useRef({ x: ROOM_W/2, y: ROOM_H*0.78 });
  const rafRef       = useRef(null);
  const lastRef      = useRef(null);
  const frameTimer   = useRef(0);
  const audioRef     = useRef(null);

  useEffect(() => { audioRef.current = createAudioCtx(); }, []);

  const getNear = useCallback((px, py) => {
    for (const cp of CAB_POSITIONS) {
      if (Math.hypot(px - cp.cx, py - CAB_CY) < 120) return cp.id;
    }
    return null;
  }, []);

  // Keyboard listeners
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

  // Game loop
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
    <div style={{ background:"#f1f5f9", minHeight:"100vh", display:"flex",
      flexDirection:"column", alignItems:"center", justifyContent:"center" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ fontFamily:PF, fontSize:8, color:"#94a3b8", letterSpacing:"0.15em", marginBottom:10 }}>
        ROSEMAN.GBA
      </div>

      {/* Arcade room */}
      <div style={{ position:"relative", width:ROOM_W, height:ROOM_H, background:"#fff",
        border:"1px solid #e2e8f0", borderRadius:8, overflow:"hidden",
        boxShadow:"0 8px 32px rgba(0,0,0,0.08)" }}>

        {/* Floor grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
          backgroundSize:"48px 48px" }} />

        {/* Ceiling strip */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:18,
          background:"linear-gradient(#e2e8f0,#f1f5f9)", borderBottom:"1px solid #e2e8f0" }} />

        {/* Title */}
        <div style={{ position:"absolute", top:28, left:"50%", transform:"translateX(-50%)",
          textAlign:"center", pointerEvents:"none" }}>
          <div style={{ fontFamily:PF, fontSize:10, color:"#e2e8f0", letterSpacing:"0.1em" }}>JED ROSEMAN</div>
          <div style={{ fontFamily:PF, fontSize:6, color:"#e9eef5", marginTop:6, letterSpacing:"0.1em" }}>
            WALK UP TO A CABINET · PRESS ENTER
          </div>
        </div>

        {/* Cabinets */}
        {CABINETS.map((cab, i) => (
          <div key={cab.id} style={{ position:"absolute", left:CAB_POSITIONS[i].cx - 100, top:CAB_CY - 130 }}>
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
        <div style={{ position:"absolute", bottom:12, left:16, fontFamily:PF, fontSize:6,
          color:"#cbd5e1", letterSpacing:"0.1em" }}>
          WASD / ARROWS · MOVE
        </div>
        {nearId && (
          <div style={{ position:"absolute", bottom:12, right:16, fontFamily:PF, fontSize:6,
            color: CABINETS.find(c => c.id === nearId)?.color, letterSpacing:"0.1em" }}>
            [ ENTER ] INSERT COIN
          </div>
        )}

        {/* Boot overlay */}
        {!booted && (
          <div style={{ position:"absolute", inset:0, zIndex:20 }}>
            <BootScreen onDone={() => setBooted(true)} />
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:28, marginTop:12 }}>
        {CABINETS.map(c => (
          <div key={c.id} style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer" }}
            onClick={() => setActiveSection(c.id)}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:c.color }} />
            <span style={{ fontFamily:PF, fontSize:6, color:"#94a3b8", letterSpacing:"0.1em" }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Section overlays */}
      {activeSection === "about"    && <AboutSection    color={activeCab.color} onClose={close} />}
      {activeSection === "projects" && <ProjectsSection color={activeCab.color} onClose={close} />}
      {activeSection === "resume"   && <ResumeSection   color={activeCab.color} onClose={close} />}
      {activeSection === "contact"  && <ContactSection  color={activeCab.color} onClose={close} />}
    </div>
  );
}