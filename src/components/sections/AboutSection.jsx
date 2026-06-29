import Header from "../shared/Header";
import { PF, SANS, HOBBIES } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function AboutSection({ color, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="ABOUT.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>

        {/* Intro */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>INTRO</SectionLabel>
          <p style={{ fontSize: 16, color: TEXT_PRIMARY, lineHeight: 1.85, margin: 0, fontWeight: 400 }}>
            Hey, I'm Jed Roseman, a sophomore at the University of Michigan studying Electrical Engineering.
            I'm passionate about defense technology, venture, and building things that matter. Whether I'm
            running Michigan Defense Technology, advising startups, or wiring up a motor drivetrain, I'm always
            working at the intersection of technical depth and real-world impact.
          </p>
          <p style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: 1.85, margin: "1.25rem 0 0", fontWeight: 400 }}>
            My goal is to work on hard problems in national security, deep tech, and emerging industries.
            Eventually founding or leading ventures that push the frontier. I care about execution, not just ideas.
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>QUICK STATS</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[["U OF M", "Class of 2028"], ["MAJOR", "Electrical Eng."], ["LOCATION", "Ann Arbor, MI"]].map(([k, v]) => (
              <div key={k} style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 10, padding: "1.25rem",
                borderTop: `2px solid ${color}`,
              }}>
                <div style={{ fontFamily: PF, fontSize: 6, color, letterSpacing: "0.12em", marginBottom: 10 }}>{k}</div>
                <div style={{ fontSize: 15, color: TEXT_PRIMARY, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>FEATURED VIDEO</SectionLabel>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, aspectRatio: "16/9", background: CARD }}>
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/iLFml5LZlQs"
              title="Jed Roseman featured video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>GALLERY</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.875rem" }}>
            {["Photo 1", "Photo 2", "Photo 3"].map((l, i) => (
              <div key={i} style={{
                aspectRatio: "1", background: CARD,
                border: `1px dashed ${BORDER}`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: PF, fontSize: 6, color: "#374151", letterSpacing: "0.1em" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <SectionLabel color={color}>OUTSIDE THE LAB</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {HOBBIES.map(h => (
              <span
                key={h}
                style={{
                  fontSize: 13, padding: "6px 14px",
                  background: `${color}18`, border: `1px solid ${color}44`,
                  borderRadius: 20, color: TEXT_PRIMARY, fontWeight: 500,
                  transition: "background 0.2s ease-out, border-color 0.2s ease-out",
                  cursor: "default",
                }}
              >{h}</span>
            ))}
          </div>
        </div>
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
