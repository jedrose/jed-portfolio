import Header from "../shared/Header";
import { PF, SANS, PROJECTS_DATA } from "../../data/content";

export default function ProjectsSection({ color, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", overflowY:"auto", zIndex:50, fontFamily:SANS }}>
      <Header title="PROJECTS.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth:760, margin:"0 auto", padding:"2rem 2.5rem 4rem" }}>
        <p style={{ fontSize:14, color:"#64748b", marginBottom:"2rem", lineHeight:1.7 }}>
          A selection of what I've built and led. More to come.
        </p>

        {PROJECTS_DATA.map(g => (
          <div key={g.cat} style={{ marginBottom:"2.5rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:g.color }} />
              <div style={{ fontFamily:PF, fontSize:7, color:g.color, letterSpacing:"0.12em" }}>{g.cat}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
              {g.items.map(p => (
                <div key={p.title} style={{ background:"#f8fafc", border:"1px solid #e2e8f0",
                  borderRadius:10, padding:"1.25rem 1.5rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"flex-start", marginBottom:"0.5rem" }}>
                    <div style={{ fontSize:15, fontWeight:700, color:"#0f172a" }}>{p.title}</div>
                    <div style={{ fontFamily:PF, fontSize:6, color:"#94a3b8", letterSpacing:"0.1em",
                      whiteSpace:"nowrap", marginLeft:12 }}>{p.year}</div>
                  </div>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7, margin:"0 0 0.75rem" }}>{p.desc}</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize:11, padding:"2px 9px", background:"#f1f5f9",
                        border:"1px solid #e2e8f0", borderRadius:4, color:"#475569", fontWeight:500 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ border:"2px dashed #e2e8f0", borderRadius:10, padding:"2rem", textAlign:"center" }}>
          <div style={{ fontFamily:PF, fontSize:7, color:"#cbd5e1", letterSpacing:"0.12em" }}>MORE COMING SOON</div>
        </div>
      </div>
    </div>
  );
}