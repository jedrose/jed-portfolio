import Header from "../shared/Header";
import { PF, SANS, CONTACT_LINKS } from "../../data/content";

export default function ContactSection({ color, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", overflowY:"auto", zIndex:50, fontFamily:SANS }}>
      <Header title="CONTACT.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth:600, margin:"0 auto", padding:"2rem 2.5rem 4rem" }}>
        <p style={{ fontSize:15, color:"#64748b", lineHeight:1.8, marginBottom:"2.5rem" }}>
          Open to internships, defense tech, venture, and product roles. Always down to talk MDT or interesting projects.
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem", marginBottom:"3rem" }}>
          {CONTACT_LINKS.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:16, padding:"1rem 1.25rem",
                background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10,
                textDecoration:"none", transition:"border-color 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=color; e.currentTarget.style.background="#f0f9ff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.background="#f8fafc"; }}>
              <div style={{ width:36, height:36, borderRadius:8, background:color+"18",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:14, color:color, fontWeight:700 }}>{l.icon}</div>
              <div>
                <div style={{ fontFamily:PF, fontSize:6, color:color, letterSpacing:"0.12em", marginBottom:4 }}>{l.label}</div>
                <div style={{ fontSize:13, color:"#334155", fontWeight:500 }}>{l.display}</div>
              </div>
              <div style={{ marginLeft:"auto", fontSize:16, color:"#cbd5e1" }}>→</div>
            </a>
          ))}
        </div>

        <div style={{ fontFamily:PF, fontSize:7, color:"#cbd5e1", letterSpacing:"0.12em", textAlign:"center" }}>
          NO RECRUITERS PLEASE
        </div>
      </div>
    </div>
  );
}