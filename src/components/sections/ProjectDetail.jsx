import { PF, SANS } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function ProjectDetail({ project, onBack }) {
  const c = project.coverColor;

  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 60, fontFamily: SANS }}>

      {/* Sticky header */}
      <div style={{
        background: "#0d1117", borderBottom: `1px solid ${c}33`,
        padding: "1rem 2.5rem", display: "flex", alignItems: "center", gap: 16,
        position: "sticky", top: 0, zIndex: 1,
      }}>
        <button
          onClick={onBack}
          aria-label="Back to projects"
          style={{
            fontFamily: PF, fontSize: 6, background: "none",
            border: `1px solid ${c}44`, color: "#6b7280",
            padding: "8px 14px", cursor: "pointer", borderRadius: 4,
            minWidth: 44, minHeight: 44, display: "flex", alignItems: "center",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.color = c; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${c}44`; e.currentTarget.style.color = "#6b7280"; }}
        >
          BACK
        </button>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}` }} />
        <span style={{ fontFamily: PF, fontSize: 8, color: c, letterSpacing: "0.12em" }}>PROJECT.EXE</span>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 2.5rem 5rem" }}>

        {/* Hero cover image */}
        <div style={{ position: "relative", height: 260, overflow: "hidden", marginBottom: "2.5rem" }}>
          <img
            src={project.coverImage}
            alt={`Cover image: ${project.title}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: project.coverPosition || "center", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, ${DARK} 0%, ${DARK}88 40%, transparent 100%)`,
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "1.5rem 2rem" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {project.title}
            </div>
          </div>
        </div>

        {/* Subtitle + blurb under hero */}
        <div style={{ fontFamily: PF, fontSize: 6, color: project.coverColor, letterSpacing: "0.1em", marginBottom: 12 }}>
          {project.subtitle}
        </div>
        {project.blurb && (
          <p style={{ fontSize: 15, color: TEXT_PRIMARY, lineHeight: 1.85, margin: "0 0 2rem", opacity: 0.85 }}>
            {project.blurb}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "2rem" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: 12, padding: "4px 12px",
              background: `${c}18`, border: `1px solid ${c}44`,
              borderRadius: 4, color: c, fontWeight: 600, letterSpacing: "0.04em",
            }}>{t}</span>
          ))}
        </div>

        {/* Context */}
        <div style={{ marginBottom: "2rem" }}>
          <SectionLabel color={c}>CONTEXT</SectionLabel>
          <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.85, margin: 0 }}>{project.context}</p>
        </div>

        {/* Tech stack - only shown when project has one */}
        {project.techStack?.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <SectionLabel color={c}>TECH STACK</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.techStack.map(t => (
                <span key={t} style={{
                  fontSize: 12, padding: "5px 14px",
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 6, color: TEXT_PRIMARY, fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Core impact */}
        <div style={{ marginBottom: "2rem" }}>
          <SectionLabel color={c}>CORE IMPACT</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {project.impact.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                background: CARD, border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${c}`,
                borderRadius: 8, padding: "0.875rem 1rem",
              }}>
                <span style={{ color: c, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>+</span>
                <span style={{ fontSize: 14, color: TEXT_PRIMARY, lineHeight: 1.7 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content sections */}
        {project.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <SectionLabel color={c}>{s.heading.toUpperCase()}</SectionLabel>
            <p style={{ fontSize: 15, color: TEXT_MUTED, lineHeight: 1.85, margin: "0 0 1.25rem" }}>{s.body}</p>

            {/* Inline images for this section */}
            {s.images && s.images.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: s.images.length === 1 && project.images[s.images[0]]?.fullWidth ? "1fr" : s.images.length === 1 ? "1fr" : "1fr 1fr",
                gap: "0.875rem",
                marginBottom: "1.25rem",
              }}>
                {s.images.map(imgIdx => {
                  const img = project.images[imgIdx];
                  if (img.fullWidth) {
                    return (
                      <img
                        key={imgIdx}
                        src={img.src}
                        alt=""
                        style={{ width: "100%", display: "block", borderRadius: 8 }}
                      />
                    );
                  }
                  const isPaired = s.images.length > 1;
                  return (
                    <div key={imgIdx} style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 8, overflow: "hidden",
                      height: isPaired ? 380 : (img.contain ? "auto" : 220),
                      minHeight: !isPaired && img.contain ? 180 : undefined,
                      background: DARK,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <img
                        src={img.src}
                        alt=""
                        style={{
                          width: "100%",
                          height: isPaired ? "100%" : (img.contain ? "auto" : "100%"),
                          objectFit: img.contain ? "contain" : "cover",
                          objectPosition: "center",
                          display: "block",
                          borderRadius: 7,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Inline videos for this section */}
            {s.videos && s.videos.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.25rem" }}>
                {s.videos.map((v, vi) => (
                  <div key={vi} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, background: "#000" }}>
                    {v.label && (
                      <div style={{ padding: "8px 14px", background: CARD, borderBottom: `1px solid ${BORDER}` }}>
                        <span style={{ fontFamily: PF, fontSize: 6, color: c, letterSpacing: "0.1em" }}>{v.label}</span>
                      </div>
                    )}
                    <video
                      controls
                      playsInline
                      style={{ width: "100%", display: "block", maxHeight: 420, background: "#000" }}
                    >
                      <source src={v.src} type={v.type || "video/mp4"} />
                    </video>
                  </div>
                ))}
              </div>
            )}

            {/* Live demo embed */}
            {s.liveDemo && project.liveDemo && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: PF, fontSize: 6, color: c, letterSpacing: "0.12em", marginBottom: 12 }}>
                  — TRY IT LIVE
                </div>
                <div style={{ border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden", boxShadow: `0 4px 24px #00000055` }}>
                  {/* Browser chrome */}
                  <div style={{ background: "#080c10", borderBottom: `1px solid ${BORDER}`, padding: "9px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: TEXT_MUTED, fontFamily: "inherit" }}>{project.liveDemo.label}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
                    </div>
                  </div>
                  <iframe
                    src={project.liveDemo.src}
                    title={project.liveDemo.title}
                    style={{ width: "100%", height: 600, border: "none", display: "block", background: "#fff" }}
                    allow="autoplay"
                  />
                </div>
                <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 8, textAlign: "center" }}>
                  Fully interactive — click through the onboarding and dashboard.
                </div>
              </div>
            )}

            {/* Code block */}
            {s.code && (
              <div style={{
                background: "#010409",
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: "1.25rem 1.5rem",
                overflowX: "auto",
              }}>
                <pre style={{
                  margin: 0, fontSize: 12.5, lineHeight: 1.75,
                  color: "#e6edf3",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  whiteSpace: "pre",
                }}>{s.code}</pre>
              </div>
            )}
          </div>
        ))}

        {/* Client quote */}
        {project.clientQuote && (
          <div style={{
            margin: "1rem 0 0",
            padding: "2rem 2rem 2rem 2.5rem",
            borderLeft: `3px solid ${c}`,
            background: CARD,
            borderRadius: "0 8px 8px 0",
          }}>
            <p style={{
              fontSize: 16, color: TEXT_PRIMARY, lineHeight: 1.8,
              fontStyle: "italic", margin: "0 0 1rem",
            }}>
              "{project.clientQuote.text}"
            </p>
            <div style={{ fontFamily: PF, fontSize: 6, color: c, letterSpacing: "0.1em" }}>
              {project.clientQuote.author}
            </div>
            <div style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 4 }}>
              {project.clientQuote.role}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function SectionLabel({ color, children }) {
  return (
    <div style={{
      fontFamily: PF, fontSize: 7, color,
      letterSpacing: "0.14em", marginBottom: "1rem",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ display: "inline-block", width: 16, height: 1, background: color }} />
      {children}
    </div>
  );
}
