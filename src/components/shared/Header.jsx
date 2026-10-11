import { PF } from "../../data/content";
import { useIsNarrow, useIsTouch } from "../../hooks/useMedia";

export default function Header({ title, color, onClose }) {
  const narrow = useIsNarrow();
  const touch = useIsTouch();

  return (
    <div style={{
      background: "#0d1117",
      borderBottom: `1px solid ${color}33`,
      padding: narrow ? "0.5rem 1rem" : "1rem 2.5rem",
      display: "flex",
      alignItems: "center",
      gap: narrow ? 12 : 16,
      position: "sticky",
      top: 0,
      zIndex: 1,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0 }} />
      <span style={{ fontFamily: PF, fontSize: 9, color: color, letterSpacing: "0.12em" }}>{title}</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        {!touch && <span style={{ fontFamily: PF, fontSize: 6, color: "#374151" }}>ESC TO EXIT</span>}
        <button
          onClick={onClose}
          style={{
            fontFamily: PF, fontSize: touch || narrow ? 8 : 6, background: "none",
            border: `1px solid ${color}44`, color: touch ? "#9ca3af" : "#6b7280",
            padding: touch || narrow ? "0 16px" : "6px 12px",
            minHeight: touch || narrow ? 44 : undefined,
            cursor: "pointer", borderRadius: 4,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.color = touch ? "#9ca3af" : "#6b7280"; }}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
