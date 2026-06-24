import Header from "../shared/Header";
import { PF, SANS, PROJECTS_DATA } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function ProjectsSection({ color, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="PROJECTS.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>
        <p style={{ fontSize: 15, color: TEXT_MUTED, marginBottom: "2.5rem", lineHeight: 1.75, letterSpacing: "0.01em" }}>
          A selection of what I've built and led. More to come.
        </p>

        {PROJECTS_DATA.map(g => (
          <div key={g.cat} style={{ marginBottom: "2.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, boxShadow: `0 0 6px ${g.color}` }} />
              <div style={{ fontFamily: PF, fontSize: 7, color: g.color, letterSpacing: "0.14em" }}>{g.cat}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {g.items.map(p => (
                <div key={p.title} style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${g.color}`,
                  borderRadius: 10,
                  padding: "1.375rem 1.5rem",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: "0.01em" }}>{p.title}</div>
                    <div style={{ fontFamily: PF, fontSize: 6, color: TEXT_MUTED, letterSpacing: "0.1em", whiteSpace: "nowrap", marginLeft: 12 }}>{p.year}</div>
                  </div>
                  <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.75, margin: "0 0 0.875rem", letterSpacing: "0.01em" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 11, padding: "3px 10px",
                        background: `${g.color}18`, border: `1px solid ${g.color}44`,
                        borderRadius: 4, color: g.color, fontWeight: 600, letterSpacing: "0.04em",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ border: `1px dashed ${BORDER}`, borderRadius: 10, padding: "2rem", textAlign: "center" }}>
          <div style={{ fontFamily: PF, fontSize: 7, color: "#374151", letterSpacing: "0.12em" }}>MORE COMING SOON</div>
        </div>
      </div>
    </div>
  );
}
