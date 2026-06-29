import { useState } from "react";
import Header from "../shared/Header";
import ProjectDetail from "./ProjectDetail";
import { PF, SANS, PROJECTS_DATA, DEEP_PROJECTS } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function ProjectsSection({ color, onClose }) {
  const [openProject, setOpenProject] = useState(null);

  if (openProject) {
    return (
      <ProjectDetail
        project={openProject}
        color={color}
        onBack={() => setOpenProject(null)}
      />
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="PROJECTS.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>
        <p style={{ fontSize: 15, color: TEXT_MUTED, marginBottom: "2.5rem", lineHeight: 1.75 }}>
          A selection of what I've built and led. More to come.
        </p>

        {/* Clickable deep-dive project cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
          {DEEP_PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => setOpenProject(p)}
              aria-label={`View project: ${p.title}`}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                overflow: "hidden",
                minHeight: 44,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.coverColor;
                e.currentTarget.style.boxShadow = `0 0 20px ${p.coverColor}22`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Cover image */}
              <div style={{
                height: 140,
                overflow: "hidden",
                borderBottom: `1px solid ${BORDER}`,
                position: "relative",
                background: "#010409",
              }}>
                <img
                  src={p.coverImage}
                  alt={`Cover image for ${p.title}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to top, ${CARD}cc 0%, transparent 60%)`,
                }} />
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  background: `${p.coverColor}22`,
                  border: `1px solid ${p.coverColor}55`,
                  borderRadius: 4, padding: "2px 8px",
                  fontFamily: PF, fontSize: 5, color: p.coverColor, letterSpacing: "0.1em",
                }}>
                  ML / AI
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "1.125rem 1.25rem" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 5, lineHeight: 1.4 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: PF, fontSize: 5, color: p.coverColor, letterSpacing: "0.1em", marginBottom: 8 }}>
                  {p.subtitle}
                </div>
                <p style={{ fontSize: 12, color: TEXT_MUTED, lineHeight: 1.65, margin: "0 0 10px" }}>{p.blurb}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                  {p.tags.slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontSize: 10, padding: "2px 7px",
                      background: `${p.coverColor}18`, border: `1px solid ${p.coverColor}44`,
                      borderRadius: 4, color: p.coverColor, fontWeight: 600,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: p.coverColor, fontWeight: 700, letterSpacing: "0.06em" }}>
                  VIEW PROJECT +
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Other projects */}
        {PROJECTS_DATA.map(g => (
          <div key={g.cat} style={{ marginBottom: "2.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, boxShadow: `0 0 6px ${g.color}` }} />
              <div style={{ fontFamily: PF, fontSize: 7, color: g.color, letterSpacing: "0.14em" }}>{g.cat}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {g.items.map(p => (
                <div key={p.title} style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderLeft: `3px solid ${g.color}`,
                  borderRadius: 10, padding: "1.375rem 1.5rem",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{p.title}</div>
                    <div style={{ fontFamily: PF, fontSize: 6, color: TEXT_MUTED, whiteSpace: "nowrap", marginLeft: 12 }}>{p.year}</div>
                  </div>
                  <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.75, margin: "0 0 0.875rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 11, padding: "3px 10px",
                        background: `${g.color}18`, border: `1px solid ${g.color}44`,
                        borderRadius: 4, color: g.color, fontWeight: 600,
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
