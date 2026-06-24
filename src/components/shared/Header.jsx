import { PF } from "../../data/content";

export default function Header({ title, color, onClose }) {
  return (
    <div style={{
      background: "#0d1117",
      borderBottom: `1px solid ${color}33`,
      padding: "1rem 2.5rem",
      display: "flex",
      alignItems: "center",
      gap: 16,
      position: "sticky",
      top: 0,
      zIndex: 1,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      <span style={{ fontFamily: PF, fontSize: 9, color: color, letterSpacing: "0.12em" }}>{title}</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontFamily: PF, fontSize: 6, color: "#374151" }}>ESC TO EXIT</span>
        <button
          onClick={onClose}
          style={{
            fontFamily: PF, fontSize: 6, background: "none",
            border: `1px solid ${color}44`, color: "#6b7280",
            padding: "6px 12px", cursor: "pointer", borderRadius: 4,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.color = "#6b7280"; }}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
