import Header from "../shared/Header";
import { PF, SANS, RESUME_PDF_URL } from "../../data/content";

function ResumeBlock({ color, heading, items }) {
  return (
    <div style={{ marginBottom:"2rem" }}>
      <div style={{ fontFamily:PF, fontSize:7, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>{heading}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        {items.map((item,i) => (
          <div key={i} style={{ borderLeft:`2px solid ${color}44`, paddingLeft:"1rem" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:2 }}>{item.title}</div>
            <div style={{ fontSize:12, color:color, marginBottom:item.detail?4:0, fontWeight:500 }}>{item.sub}</div>
            {item.detail && <div style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{item.detail}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeSection({ color, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"#fff", overflowY:"auto", zIndex:50, fontFamily:SANS }}>
      <Header title="RESUME.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 2.5rem 4rem" }}>

        {/* Download button */}
        <div style={{ marginBottom:"2.5rem", display:"flex", gap:"0.75rem", alignItems:"center" }}>
          <a href={RESUME_PDF_URL} download="Jedidiah_Roseman_Resume.pdf" target="_blank" rel="noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px",
              background:color, color:"#fff", borderRadius:8, fontSize:12, fontWeight:700,
              textDecoration:"none", fontFamily:PF, letterSpacing:"0.08em" }}
            onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            ↓ DOWNLOAD PDF
          </a>
          <span style={{ fontFamily:PF, fontSize:6, color:"#94a3b8", letterSpacing:"0.1em" }}>
            JEDIDIAH_ROSEMAN_RESUME.PDF
          </span>
        </div>

        <ResumeBlock color={color} heading="EDUCATION" items={[
          { title:"University of Michigan", sub:"B.S. Electrical Engineering · Expected May 2028",
            detail:"Coursework: Programming & Data Structures, EE System Design, Intro Circuits, Semiconductor Devices, Signals & Systems" }
        ]} />

        <ResumeBlock color={color} heading="WORK EXPERIENCE" items={[
          { title:"First Financial Bank USA", sub:"Product Manager (Contract) · Summer 2026",
            detail:"Led 7-member team through 13-week sprint. Full-stack fintech MVP targeting $50M in new retail IRA deposits. Cleared all 3 executive gate reviews." },
          { title:"Service Provider Capital", sub:"Investment Analyst Intern · Summer 2025",
            detail:"Quarterly valuations for $200M+ AUM. Tracked 100+ portfolio firms. Benchmarked competitors via PitchBook." },
        ]} />

        <ResumeBlock color={color} heading="LEADERSHIP & PROJECTS" items={[
          { title:"Michigan Defense Technology", sub:"Co-President & Founder · 2025–Present",
            detail:"U-M's first defense tech org. Anduril, Palantir, Gen. McMaster. 3 DARPA-aligned projects." },
          { title:"Ascend Consulting Group", sub:"VP of Consulting · 2024–Present",
            detail:"10+ paid clients. 12 projects delivered on time. Founded VC scout team." },
          { title:"Midtown EV Rally", sub:"Co-Founder · 2022–2024",
            detail:"$25K raised. Engineered brushless DC drivetrain wiring. National competition." },
        ]} />

        <div style={{ marginBottom:"2rem" }}>
          <div style={{ fontFamily:PF, fontSize:7, color:color, letterSpacing:"0.12em", marginBottom:"1rem" }}>SKILLS</div>
          {[
            ["Hardware","Circuit design, PCB prototyping, brushless DC motors, oscilloscope, MATLAB, Onshape (CAD)"],
            ["Software","C++, Python, JavaScript, HTML, Excel, STAR.SDK, Claude Code, Cursor, Notion"],
          ].map(([k,v]) => (
            <div key={k} style={{ display:"grid", gridTemplateColumns:"110px 1fr", gap:"1rem",
              fontSize:13, color:"#334155", marginBottom:"0.5rem" }}>
              <span style={{ fontWeight:700, color:"#0f172a" }}>{k}</span>
              <span style={{ color:"#64748b" }}>{v}</span>
            </div>
          ))}
        </div>

        <ResumeBlock color={color} heading="HONORS" items={[
          { title:"Harvard National Debate Tournament", sub:"Quarter Finalist · Top 100 in the US" },
          { title:"MIT Inspirit AI", sub:"Trained CNN to classify pneumonia from chest X-rays" },
        ]} />
      </div>
    </div>
  );
}