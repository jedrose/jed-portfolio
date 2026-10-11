import { useState, useEffect, useRef } from "react";
import { PF } from "../data/content";
import { createAudioCtx, playBoot } from "../utils/audio";

const DURATION = 3200;

export default function BootScreen({ onDone, layout, scale, touch }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const [blink, setBlink]       = useState(true);
  const audioRef = useRef(null);
  const tall = layout.key === "tall";
  // Keep small pixel text readable once the stage is scaled down
  const fs = (base, min = 7) => Math.max(base, min / scale);

  useEffect(() => {
    audioRef.current = createAudioCtx();
    const t = setTimeout(() => playBoot(audioRef.current), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = now => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.code === "Enter" || e.code === "Space") onDone(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  const filled = Math.floor(progress * 20);

  return (
    <div onClick={onDone} style={{ position:"fixed", inset:0, background:"#000",
      display:"flex", alignItems:"center", justifyContent:"center",
      cursor:"pointer", zIndex:100, overflow:"hidden",
      userSelect:"none", WebkitUserSelect:"none" }}>

      {/* Stage is the same size and scale as the arcade room behind it */}
      <div style={{ width:layout.w, height:layout.h, flexShrink:0,
        transform:`scale(${scale})`, transformOrigin:"center center",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>

        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:PF, fontSize: tall ? 22 : "clamp(14px,3vw,26px)", color:"#fff",
            letterSpacing:"0.06em", lineHeight:1.5, marginBottom:14 }}>
            JED ROSEMAN
          </div>
          {tall ? (
            <div style={{ fontFamily:PF, fontSize:fs(8), color:"#64748b",
              letterSpacing:"0.12em", lineHeight:2.4 }}>
              <div>CLASS OF 2028</div>
              <div>UNIVERSITY OF MICHIGAN</div>
              <div>ELECTRICAL ENGINEERING</div>
            </div>
          ) : (
            <div style={{ fontFamily:PF, fontSize:`max(${fs(5)}px, min(1vw, 8px))`, color:"#475569",
              letterSpacing:"0.12em", lineHeight:2.5 }}>
              CLASS OF 2028 &nbsp;·&nbsp; UNIVERSITY OF MICHIGAN &nbsp;·&nbsp; ELECTRICAL ENGINEERING
            </div>
          )}
        </div>

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <div style={{ fontFamily:PF, fontSize:fs(7), color:"#334155", letterSpacing:"0.15em", marginBottom:4 }}>
            LOADING...
          </div>
          <div style={{ width:320, height:22, border:"2px solid #334155", borderRadius:2,
            padding:3, background:"#0a0a0a" }}>
            <div style={{ height:"100%", display:"flex", gap:2 }}>
              {Array.from({ length:20 }).map((_,i) => (
                <div key={i} style={{ flex:1, background:i<filled?"#38bdf8":"transparent",
                  borderRadius:1, boxShadow:i<filled?"0 0 6px #38bdf888":"none" }} />
              ))}
            </div>
          </div>
          <div style={{ fontFamily:PF, fontSize:fs(7), color:"#38bdf8", letterSpacing:"0.12em" }}>
            {Math.floor(progress * 100)}%
          </div>
        </div>

        {/* Reserve the line so the layout doesn't jump when it appears */}
        <div style={{ fontFamily:PF, fontSize:fs(tall ? 10 : 8, 9), color:done && blink?"#fbbf24":"transparent",
          letterSpacing:"0.15em", marginTop:"2.5rem" }}>
          {touch ? "TAP TO START" : "PRESS START"}
        </div>
        <div style={{ fontFamily:PF, fontSize:fs(6), color: touch ? "#334155" : "#1a2535", marginTop:"1.5rem", letterSpacing:"0.1em" }}>
          {touch ? "TAP ANYWHERE TO SKIP" : "CLICK OR PRESS ENTER TO SKIP"}
        </div>
      </div>
    </div>
  );
}
