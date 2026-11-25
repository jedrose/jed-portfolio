import { useState, useEffect, useRef, useCallback } from "react";
import BootScreen      from "./components/BootScreen";
import ArcadeCabinet   from "./components/ArcadeCabinet";
import Sprite          from "./components/Sprite";
import NavBar          from "./components/shared/NavBar";
import AboutSection    from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ResumeSection   from "./components/sections/ResumeSection";
import ContactSection  from "./components/sections/ContactSection";
import { createAudioCtx, playSelect } from "./utils/audio";
import { PF, CABINETS, CAB_POSITIONS, CAB_CY, ROOM_W, ROOM_H, SPEED, DEEP_PROJECTS } from "./data/content";

// Routes live in the URL hash so any page can be linked directly:
//   #/about  #/projects  #/projects/<project-id>  #/resume  #/contact
const SECTION_IDS = CABINETS.map(c => c.id);

function parseRoute() {
  const [section, projectId] = window.location.hash.replace(/^#\/?/, "").split("/");
  if (!SECTION_IDS.includes(section)) return { section: null, projectId: null };
  const valid = section === "projects" && DEEP_PROJECTS.some(p => p.id === projectId);
  return { section, projectId: valid ? projectId : null };
}

function routeTitle({ section, projectId }) {
  if (projectId) return `${DEEP_PROJECTS.find(p => p.id === projectId).title} | Jed Roseman`;
  if (section) return `${section[0].toUpperCase()}${section.slice(1)} | Jed Roseman`;
  return "Jed Roseman";
}

function getScale() {
  return Math.min(window.innerWidth / ROOM_W, window.innerHeight / ROOM_H);
}

export default function App() {
  const [route,         setRoute]         = useState(parseRoute);
  // Deep links skip the intro and land straight on the content
  const [booted,        setBooted]        = useState(() => parseRoute().section !== null);
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

  const activeSection = route.section;

  // Push a new history entry so the browser back button walks back through pages
  const navigate = useCallback(path => {
    const target = path ? `#/${path}` : "";
    if (target !== window.location.hash) {
      window.history.pushState(null, "", target || window.location.pathname + window.location.search);
    }
    setRoute(parseRoute());
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(parseRoute());
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("hashchange", onPop); };
  }, []);

  useEffect(() => { document.title = routeTitle(route); }, [route]);

  // Navigating to a page (e.g. back/forward or editing the URL) dismisses the intro
  useEffect(() => { if (route.section) setBooted(true); }, [route.section]);

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
        if (near && !activeSection) { playSelect(audioRef.current); navigate(near); }
      }
      if (e.type === "keydown" && e.code === "Escape" && activeSection) navigate(null);
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup",   onKey);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); };
  }, [booted, getNear, activeSection, navigate]);

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
  const close = () => navigate(null);
  const goTo  = id => { playSelect(audioRef.current); navigate(id); };
  const openProject = id => navigate(id ? `projects/${id}` : "projects");

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

        /* Phones: navigation becomes a single row of four equal tabs */
        @media (max-width: 600px) {
          .navbar {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px !important;
            width: 100%;
          }
          .navbar button {
            font-size: 7px !important;
            letter-spacing: 0.04em !important;
            padding: 0 2px !important;
            min-height: 40px !important;
            white-space: nowrap;
          }
          .navbar--floating {
            left: 12px !important;
            right: 12px !important;
            bottom: calc(12px + env(safe-area-inset-bottom)) !important;
            transform: none !important;
            max-width: none !important;
            width: auto !important;
          }
          /* Section headers: title + BACK on top, tabs full-width below */
          .hdr-right { display: contents !important; }
          .hdr-back { order: 1; margin-left: auto; }
          .hdr-right > .navbar { order: 2; flex-basis: 100%; }
          .hdr-nav { margin-left: 0 !important; flex-basis: 100%; }
        }
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
              onEnter={() => { if (!activeSection) goTo(cab.id); }}
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
      </div>

      {/* Boot overlay — outside the scaled room so it renders at full size on phones */}
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {/* Quick-jump nav, for visitors who'd rather not walk to a cabinet */}
      {booted && !activeSection && <NavBar floating onNavigate={goTo} />}

      {/* Section overlays */}
      {activeSection === "about"    && <AboutSection    color={activeCab.color} onClose={close} onNavigate={goTo} />}
      {activeSection === "projects" && <ProjectsSection color={activeCab.color} onClose={close} onNavigate={goTo} openProjectId={route.projectId} onOpenProject={openProject} />}
      {activeSection === "resume"   && <ResumeSection   color={activeCab.color} onClose={close} onNavigate={goTo} />}
      {activeSection === "contact"  && <ContactSection  color={activeCab.color} onClose={close} onNavigate={goTo} />}
    </div>
  );
}
