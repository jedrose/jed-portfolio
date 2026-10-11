import { useState, useEffect, useRef, useCallback } from "react";
import BootScreen      from "./components/BootScreen";
import ArcadeCabinet   from "./components/ArcadeCabinet";
import Sprite          from "./components/Sprite";
import AboutSection    from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ResumeSection   from "./components/sections/ResumeSection";
import ContactSection  from "./components/sections/ContactSection";
import { createAudioCtx, playSelect } from "./utils/audio";
import { pickLayout, nearestCab, standPoint, planPath } from "./utils/room";
import { useIsTouch } from "./hooks/useMedia";
import { PF, CABINETS, SPEED } from "./data/content";

// Tap-to-walk moves a bit quicker than the keyboard so tapping a cabinet feels snappy
const WALK_SPEED = SPEED * 1.8;

function measure() {
  const layout = pickLayout(window.innerWidth, window.innerHeight);
  const scale  = Math.min(window.innerWidth / layout.w, window.innerHeight / layout.h);
  return { layout, scale };
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export default function App() {
  const [booted,        setBooted]        = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [nearId,        setNearId]        = useState(null);
  const [view,          setView]          = useState(measure);
  const [spritePos,     setSpritePos]     = useState(() => ({ ...view.layout.spawn }));
  const [spriteDir,     setSpriteDir]     = useState("down");
  const [moving,        setMoving]        = useState(false);
  const [frame,         setFrame]         = useState(0);
  const touch = useIsTouch();
  const { layout, scale } = view;

  const keysRef      = useRef({});
  const posRef       = useRef({ ...view.layout.spawn });
  const layoutRef    = useRef(layout);
  const walkRef      = useRef(null);      // { path: [{x,y}], open: cabinetId | null }
  const pointerRef   = useRef("mouse");   // last pointer type: "mouse" | "touch" | "pen"
  const roomRef      = useRef(null);
  const rafRef       = useRef(null);
  const lastRef      = useRef(null);
  const frameTimer   = useRef(0);
  const audioRef     = useRef(null);
  layoutRef.current = layout;

  useEffect(() => { audioRef.current = createAudioCtx(); }, []);

  useEffect(() => {
    const onResize = () => setView(measure());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // When the phone rotates the room changes shape, so put the sprite back at the start
  useEffect(() => {
    posRef.current = { ...layout.spawn };
    walkRef.current = null;
    setSpritePos({ ...layout.spawn });
    setNearId(null);
  }, [layout.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const getNear = useCallback((px, py) => nearestCab(layoutRef.current, px, py), []);

  const openSection = useCallback(id => {
    walkRef.current = null;
    playSelect(audioRef.current);
    setActiveSection(id);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const onKey = e => {
      keysRef.current[e.code] = e.type === "keydown";
      if (e.type === "keydown" && (e.code === "Enter" || e.code === "Space")) {
        const near = getNear(posRef.current.x, posRef.current.y);
        if (near && !activeSection) openSection(near);
      }
      if (e.type === "keydown" && e.code === "Escape") setActiveSection(null);
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup",   onKey);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); };
  }, [booted, getNear, activeSection, openSection]);

  useEffect(() => {
    if (!booted) return;
    const loop = ts => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;
      const k = keysRef.current;
      const L = layoutRef.current;
      let dx = 0, dy = 0, dir = null, isMoving = false;

      if (!activeSection) {
        if (k["ArrowUp"]   || k["KeyW"]) { dy = -1; dir = "up";    }
        if (k["ArrowDown"] || k["KeyS"]) { dy =  1; dir = "down";  }
        if (k["ArrowLeft"] || k["KeyA"]) { dx = -1; dir = "left";  }
        if (k["ArrowRight"]|| k["KeyD"]) { dx =  1; dir = "right"; }
        if (dx && dy) { dx *= 0.707; dy *= 0.707; }

        if (dx || dy) {
          // Keyboard always wins over a tap-to-walk in progress
          walkRef.current = null;
          posRef.current = {
            x: clamp(posRef.current.x + dx * SPEED * dt, 24, L.w - 24),
            y: clamp(posRef.current.y + dy * SPEED * dt, 24, L.h - 24),
          };
          isMoving = true;
        } else if (walkRef.current) {
          const w = walkRef.current;
          let { x, y } = posRef.current;
          let budget = WALK_SPEED * dt;
          while (budget > 0 && w.path.length) {
            const t = w.path[0];
            const ddx = t.x - x, ddy = t.y - y;
            const d = Math.hypot(ddx, ddy);
            if (d > 0.5) dir = Math.abs(ddx) > Math.abs(ddy) ? (ddx > 0 ? "right" : "left") : (ddy > 0 ? "down" : "up");
            if (d <= budget) { x = t.x; y = t.y; budget -= d; w.path.shift(); }
            else { x += (ddx / d) * budget; y += (ddy / d) * budget; budget = 0; }
          }
          posRef.current = { x, y };
          isMoving = true;
          if (!w.path.length) {
            walkRef.current = null;
            isMoving = false;
            if (w.open) openSection(w.open);
          }
        }

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
  }, [booted, activeSection, getNear, openSection]);

  // Remember how the person is pointing (mouse vs finger) and unlock audio on the
  // first tap. Mobile browsers keep audio muted until a real touch happens.
  const onAnyPointer = e => {
    pointerRef.current = e.pointerType || "mouse";
    const ctx = audioRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  };

  // Tap/click on the floor: walk there
  const onRoomPointerDown = e => {
    if (!booted || activeSection || e.button > 0) return;
    if (e.target.closest && e.target.closest("[data-cab]")) return;
    const r = roomRef.current.getBoundingClientRect();
    const L = layoutRef.current;
    const to = {
      x: clamp((e.clientX - r.left) / scale, 24, L.w - 24),
      // sprite's position is its feet, so aim a little lower than the tap to center the body on it
      y: clamp((e.clientY - r.top) / scale + 18, 24, L.h - 24),
    };
    walkRef.current = { path: planPath(L, posRef.current, to), open: null };
  };

  // Tap/click on a cabinet. Mouse opens it right away (unchanged desktop behavior);
  // on touch the sprite runs over to it first, then it opens.
  const onCabinet = id => {
    if (activeSection) return;
    if (pointerRef.current === "mouse") { openSection(id); return; }
    const L = layoutRef.current;
    const cab = L.cabs.find(c => c.id === id);
    walkRef.current = { path: planPath(L, posRef.current, standPoint(cab)), open: id };
  };

  // Pixel font sizes that would shrink below ~7px on screen get bumped up
  const fs = (base, min = 7) => Math.max(base, min / scale);

  const activeCab = activeSection ? CABINETS.find(c => c.id === activeSection) : null;
  const close = () => setActiveSection(null);
  const nearCab = nearId ? CABINETS.find(c => c.id === nearId) : null;

  return (
    <div
      onPointerDownCapture={onAnyPointer}
      style={{
        position: "fixed", inset: 0,
        background: "#080c10",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        touchAction: "manipulation",
      }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Arcade room — scaled to fill viewport */}
      <div
        ref={roomRef}
        onPointerDown={onRoomPointerDown}
        style={{
          position: "relative",
          width: layout.w,
          height: layout.h,
          background: "#0d1117",
          overflow: "hidden",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
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
          <div style={{ fontFamily: PF, fontSize: fs(6), color: "#4b5563", marginTop: 10, letterSpacing: "0.12em" }}>
            {touch ? "TAP A SCREEN TO ENTER" : "WALK UP TO A SCREEN · PRESS ENTER"}
          </div>
        </div>

        {/* Screens */}
        {CABINETS.map(cab => {
          const pos = layout.cabs.find(c => c.id === cab.id);
          return (
            <div key={cab.id} style={{ position: "absolute", left: pos.cx - 100, top: pos.cy - 130 }}>
              <ArcadeCabinet
                cab={cab}
                near={nearId === cab.id}
                touch={touch}
                scale={scale}
                onEnter={() => onCabinet(cab.id)}
              />
            </div>
          );
        })}

        {/* Sprite */}
        <Sprite x={spritePos.x} y={spritePos.y} dir={spriteDir} moving={moving} frame={frame} />

        {/* HUD */}
        <div style={{
          position: "absolute", bottom: 14, left: 18,
          fontFamily: PF, fontSize: fs(6), color: "#374151", letterSpacing: "0.1em",
          pointerEvents: "none",
        }}>
          {touch ? "TAP FLOOR · WALK" : "WASD / ARROWS · MOVE"}
        </div>
        {nearCab && (
          <div style={{
            position: "absolute", bottom: 14, right: 18,
            fontFamily: PF, fontSize: fs(6),
            color: nearCab.color,
            letterSpacing: "0.1em",
            pointerEvents: "none",
          }}>
            {touch ? "[ TAP ] OPEN" : "[ ENTER ] OPEN"}
          </div>
        )}
      </div>

      {/* Boot overlay. Lives outside the scaled room so it covers the whole screen. */}
      {!booted && (
        <BootScreen
          onDone={() => setBooted(true)}
          layout={layout}
          scale={scale}
          touch={touch}
        />
      )}

      {/* Section overlays */}
      {activeSection === "about"    && <AboutSection    color={activeCab.color} onClose={close} />}
      {activeSection === "projects" && <ProjectsSection color={activeCab.color} onClose={close} />}
      {activeSection === "resume"   && <ResumeSection   color={activeCab.color} onClose={close} />}
      {activeSection === "contact"  && <ContactSection  color={activeCab.color} onClose={close} />}
    </div>
  );
}
