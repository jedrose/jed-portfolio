import Header from "../shared/Header";
import { PF, SANS, RESUME_PDF_URL } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

function ResumeBlock({ color, heading, items }) {
  return (
    <div style={{ marginBottom: "2.25rem" }}>
      <SectionLabel color={color}>{heading}</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${color}55`, paddingLeft: "1.25rem" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 3 }}>{item.title}</div>
            <div style={{ fontSize: 13, color, marginBottom: item.detail ? 6 : 0, fontWeight: 600, letterSpacing: "0.02em" }}>{item.sub}</div>
            {item.detail && <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.75 }}>{item.detail}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeSection({ color, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="RESUME.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>

        {/* Download */}
        <div style={{ marginBottom: "2.75rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <a
            href={RESUME_PDF_URL}
            download="Jedidiah_Roseman_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Download Jedidiah Roseman resume PDF"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px", background: color, color: "#fff",
              borderRadius: 8, fontSize: 12, fontWeight: 700,
              textDecoration: "none", fontFamily: PF, letterSpacing: "0.08em",
              boxShadow: `0 0 16px ${color}55`,
              transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            DOWNLOAD PDF
          </a>
          <span style={{ fontFamily: PF, fontSize: 6, color: "#374151", letterSpacing: "0.1em" }}>
            JEDIDIAH_ROSEMAN_RESUME.PDF
          </span>
        </div>

        <ResumeBlock color={color} heading="EDUCATION" items={[
          {
            title: "University of Michigan",
            sub: "B.S. Electrical Engineering, Expected May 2028",
            detail: "Coursework: Programming and Data Structures, EE System Design, Intro Circuits, Semiconductor Devices, Signals and Systems"
          }
        ]} />

        <ResumeBlock color={color} heading="WORK EXPERIENCE" items={[
          {
            title: "First Financial Bank USA",
            sub: "Product Manager (Contract), Summer 2026",
            detail: "Led 7-member team through 13-week sprint. Full-stack fintech MVP targeting $50M in new retail IRA deposits. Cleared all 3 executive gate reviews."
          },
          {
            title: "Service Provider Capital",
            sub: "Investment Analyst Intern, Summer 2025",
            detail: "Quarterly valuations for $200M+ AUM. Tracked 100+ portfolio firms. Benchmarked competitors via PitchBook."
          },
        ]} />

        <ResumeBlock color={color} heading="LEADERSHIP AND PROJECTS" items={[
          {
            title: "Michigan Defense Technology",
            sub: "Co-President and Founder, 2025 to Present",
            detail: "U-M's first defense tech org. Anduril, Palantir, Gen. McMaster. 3 DARPA-aligned projects."
          },
          {
            title: "Ascend Consulting Group",
            sub: "VP of Consulting, 2024 to Present",
            detail: "10+ paid clients. 12 projects delivered on time. Founded VC scout team."
          },
          {
            title: "Midtown EV Rally",
            sub: "Co-Founder, 2022 to 2024",
            detail: "$25K raised. Engineered brushless DC drivetrain wiring. National competition."
          },
        ]} />

        {/* Skills */}
        <div style={{ marginBottom: "2.25rem" }}>
          <SectionLabel color={color}>SKILLS</SectionLabel>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              ["Hardware", "Circuit design, PCB prototyping, brushless DC motors, oscilloscope, MATLAB, Onshape (CAD)"],
              ["Software", "C++, Python, JavaScript, HTML, Excel, STAR.SDK, Claude Code, Cursor, Notion"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1rem", fontSize: 13 }}>
                <span style={{ fontWeight: 700, color, letterSpacing: "0.02em" }}>{k}</span>
                <span style={{ color: TEXT_MUTED, lineHeight: 1.6 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <ResumeBlock color={color} heading="HONORS" items={[
          { title: "Harvard National Debate Tournament", sub: "Quarter Finalist, Top 100 in the US" },
          { title: "MIT Inspirit AI", sub: "Trained CNN to classify pneumonia from chest X-rays" },
        ]} />
      </div>
    </div>
  );
}

function SectionLabel({ color, children }) {
  return (
    <div style={{
      fontFamily: PF, fontSize: 7, color,
      letterSpacing: "0.14em", marginBottom: "1.25rem",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ display: "inline-block", width: 16, height: 1, background: color }} />
      {children}
    </div>
  );
}
