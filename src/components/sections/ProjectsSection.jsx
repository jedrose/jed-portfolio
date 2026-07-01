import { useState } from "react";
import Header from "../shared/Header";
import ProjectDetail from "./ProjectDetail";
import { PF, SANS, ALL_PROJECTS, DEEP_PROJECTS } from "../../data/content";

const DARK   = "#0d1117";
const CARD   = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED   = "#8b949e";
const AMBER  = "#f59e0b";

function SectionLabel({ color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
      <div style={{ fontFamily: PF, fontSize: 7, color, letterSpacing: "0.14em" }}>{children}</div>
    </div>
  );
}

function ProjectCard({ item, color, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const deep = item.deepId ? DEEP_PROJECTS.find(d => d.id === item.deepId) : null;
  const isClickable = !!deep;
  const coverImg = deep?.coverImage || null;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View project: ${item.title}` : undefined}
      onClick={isClickable ? () => onOpen(deep) : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onOpen(deep); } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD,
        border: `1px solid ${hovered && isClickable ? color : BORDER}`,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: isClickable ? "pointer" : "default",
        transform: hovered && isClickable ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered && isClickable ? `0 0 20px ${color}22` : "none",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
      }}
    >
      {/* Cover area */}
      <div style={{
        height: 8,
        background: coverImg
          ? undefined
          : `linear-gradient(135deg, ${color}55 0%, ${color}22 100%)`,
        borderBottom: `1px solid ${color}33`,
        position: "relative",
        flexShrink: 0,
        ...(coverImg ? { height: 120, overflow: "hidden", background: "#010409" } : {}),
      }}>
        {coverImg && (
          <>
            <img
              src={coverImg}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: deep?.coverPosition || "center", opacity: 0.8 }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${CARD}cc 0%, transparent 60%)` }} />
          </>
        )}
        {!coverImg && (
          <div style={{ height: 8 }} />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem 1.375rem", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.4 }}>
            {item.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
            {item.status === "IN PROGRESS" && (
              <span style={{
                fontFamily: PF, fontSize: 5, color: AMBER,
                background: `${AMBER}18`, border: `1px solid ${AMBER}44`,
                borderRadius: 4, padding: "2px 6px", letterSpacing: "0.08em", whiteSpace: "nowrap",
              }}>
                IN PROGRESS
              </span>
            )}
            <div style={{ fontFamily: PF, fontSize: 6, color: TEXT_MUTED, whiteSpace: "nowrap" }}>{item.year}</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12.5, color: TEXT_MUTED, lineHeight: 1.75, margin: "0 0 14px", flex: 1 }}>
          {item.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: isClickable ? 12 : 0 }}>
          {item.tags.slice(0, 4).map(t => (
            <span key={t} style={{
              fontSize: 10, padding: "2px 7px",
              background: `${color}18`, border: `1px solid ${color}44`,
              borderRadius: 4, color, fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        {isClickable && (
          <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: "0.06em" }}>
            VIEW PROJECT +
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>
        <p style={{ fontSize: 15, color: TEXT_MUTED, marginBottom: "3rem", lineHeight: 1.75 }}>
          A selection of what I have built and led. More coming.
        </p>

        {ALL_PROJECTS.map(group => (
          <div key={group.cat} style={{ marginBottom: "3rem" }}>
            <SectionLabel color={group.color}>{group.cat}</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {group.items.map(item => (
                <ProjectCard
                  key={item.title}
                  item={item}
                  color={group.color}
                  onOpen={setOpenProject}
                />
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
