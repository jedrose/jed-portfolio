import { useState, useEffect } from "react";
import { PF } from "../data/content";

export default function ArcadeCabinet({ cab, near, onEnter }) {
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    let timeout;
    const doFlicker = () => {
      setFlicker(0.7);
      setTimeout(() => setFlicker(1), 80);
      setTimeout(() => { setFlicker(0.85); setTimeout(() => setFlicker(1), 60); }, 160);
      timeout = setTimeout(doFlicker, 3000 + Math.random() * 4000);
    };
    timeout = setTimeout(doFlicker, Math.random() * 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div onClick={onEnter}
      style={{ width:200, display:"flex", flexDirection:"column", alignItems:"center",
        cursor:"pointer",
        transform: near ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.2s",
        filter: near ? `drop-shadow(0 0 18px ${cab.color}88)` : "none" }}>

      {/* Top cap */}
      <div style={{ width:180, height:16, background: near ? cab.color : cab.color+"99",
        borderRadius:"8px 8px 0 0", border:`2px solid ${near ? cab.color : cab.color+"66"}`,
        borderBottom:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:PF, fontSize:5, color:"#fff", letterSpacing:"0.15em", opacity:0.9 }}>
          {cab.marquee}
        </span>
      </div>

      {/* Main body */}
      <div style={{ width:190, background:"#f8fafc", border:`2px solid ${near ? cab.color : cab.color+"55"}`,
        borderTop:"none", display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 10px 0" }}>

        {/* Screen bezel */}
        <div style={{ width:"100%", background:"#1e293b", borderRadius:6, padding:6,
          border:`3px solid ${near ? cab.color+"88" : "#334155"}`, marginBottom:8,
          boxShadow: near ? `inset 0 0 20px ${cab.color}33` : "inset 0 0 10px #00000055" }}>
          {/* Screen */}
          <div style={{ background:cab.screen, borderRadius:4, height:110,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            gap:8, position:"relative", overflow:"hidden", opacity:flicker }}>
            {/* Scanlines */}
            <div style={{ position:"absolute", inset:0,
              backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
              pointerEvents:"none" }} />
            <div style={{ fontSize:32, lineHeight:1, zIndex:1 }}>{cab.icon}</div>
            <div style={{ fontFamily:PF, fontSize:7, color:cab.color, letterSpacing:"0.1em", zIndex:1 }}>
              {cab.label}
            </div>
            {near && (
              <div style={{ fontFamily:PF, fontSize:5, color:cab.color+"99", letterSpacing:"0.08em", zIndex:1 }}>
                PRESS ENTER
              </div>
            )}
          </div>
        </div>

        {/* Control panel */}
        <div style={{ width:"100%", background:"#e2e8f0", borderRadius:"0 0 4px 4px",
          padding:"8px 12px", display:"flex", alignItems:"center", justifyContent:"space-between",
          border:`1px solid ${cab.color}22`, borderTop:`2px solid ${cab.color}33` }}>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"#94a3b8",
            border:"3px solid #cbd5e1", boxShadow:"0 2px 4px rgba(0,0,0,0.2)" }} />
          <div style={{ display:"flex", gap:6 }}>
            {[cab.color,"#ef4444","#f59e0b"].map((c,i) => (
              <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:c,
                boxShadow:`0 2px 4px rgba(0,0,0,0.25), 0 0 6px ${c}66` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Base */}
      <div style={{ width:200, height:18, background:"#e2e8f0",
        border:`2px solid ${near ? cab.color+"44" : "#e2e8f0"}`,
        borderTop:"none", borderRadius:"0 0 6px 6px",
        boxShadow:"0 4px 12px rgba(0,0,0,0.08)" }} />
    </div>
  );
}
