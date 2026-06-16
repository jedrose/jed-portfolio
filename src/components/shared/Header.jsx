import { PF } from "../../data/content";

export default function Header({ title, color, onClose }) {
  return (
    <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"1rem 2.5rem",
      display:"flex", alignItems:"center", gap:16, position:"sticky", top:0, zIndex:1 }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:color }} />
      <span style={{ fontFamily:PF, fontSize:9, color:color, letterSpacing:"0.12em" }}>{title}</span>
      <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontFamily:PF, fontSize:6, color:"#cbd5e1" }}>ESC TO EXIT</span>
        <button onClick={onClose}
          style={{ fontFamily:PF, fontSize:6, background:"none", border:"1px solid #e2e8f0",
            color:"#94a3b8", padding:"6px 12px", cursor:"pointer", borderRadius:4 }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor=color; e.currentTarget.style.color=color; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.color="#94a3b8"; }}>
          BACK
        </button>
      </div>
    </div>
  );
}