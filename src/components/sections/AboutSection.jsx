import Header from "../shared/Header";
import { PF, SANS, HOBBIES } from "../../data/content";

export default function AboutSection({ color, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", overflowY:"auto", zIndex:50, fontFamily:SANS }}>
      <Header title="ABOUT.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth:760, margin:"0 auto", padding:"2rem 2.5rem 4rem" }}>

        {/* Intro */}
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:PF, fontSize:8, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>INTRO</div>
          <p style={{ fontSize:15, color:"#334155", lineHeight:1.8, margin:0 }}>
            Hey — I'm Jed Roseman, a sophomore at the University of Michigan studying Electrical Engineering.
            I'm passionate about defense technology, venture, and building things that matter. Whether I'm
            running Michigan Defense Technology, advising startups, or wiring up a motor drivetrain, I'm always
            working at the intersection of technical depth and real-world impact.
          </p>
          <p style={{ fontSize:15, color:"#334155", lineHeight:1.8, margin:"1rem 0 0" }}>
            My goal is to work on hard problems in national security, deep tech, and emerging industries —
            eventually founding or leading ventures that push the frontier. I care about execution, not just ideas.
          </p>
        </div>

        {/* Video */}
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:PF, fontSize:8, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>FEATURED VIDEO</div>
          <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid #e2e8f0", aspectRatio:"16/9", background:"#f8fafc" }}>
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/iLFml5LZlQs"
              title="Jed Roseman"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display:"block" }}
            />
          </div>
        </div>

        {/* Gallery placeholders */}
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:PF, fontSize:8, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>GALLERY</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.75rem" }}>
            {["Photo 1","Photo 2","Photo 3"].map((l,i) => (
              <div key={i} style={{ aspectRatio:"1", background:"#f1f5f9", border:"2px dashed #cbd5e1",
                borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:PF, fontSize:6, color:"#94a3b8", letterSpacing:"0.1em" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:PF, fontSize:8, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>QUICK STATS</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem" }}>
            {[["U OF M","Class of 2028"],["MAJOR","Electrical Eng."],["LOCATION","Ann Arbor, MI"]].map(([k,v]) => (
              <div key={k} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:"1rem" }}>
                <div style={{ fontFamily:PF, fontSize:6, color:color, letterSpacing:"0.12em", marginBottom:6 }}>{k}</div>
                <div style={{ fontSize:13, color:"#334155", fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <div style={{ fontFamily:PF, fontSize:8, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>OUTSIDE THE LAB</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {HOBBIES.map(h => (
              <span key={h} style={{ fontSize:12, padding:"5px 12px", background:"#f1f5f9",
                border:"1px solid #e2e8f0", borderRadius:20, color:"#475569", fontWeight:500 }}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}