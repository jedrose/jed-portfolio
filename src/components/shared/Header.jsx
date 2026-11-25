import { PF } from "../../data/content";
import NavBar from "./NavBar";

export default function Header({ title, color, onClose, activeId, onNavigate }) {
  return (
    <div style={{
      background: "#0d1117",
      borderBottom: `1px solid ${color}33`,
      padding: "1rem clamp(1rem, 5vw, 2.5rem)",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      zIndex: 1,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      <span style={{ fontFamily: PF, fontSize: 9, color: color, letterSpacing: "0.12em" }}>{title}</span>
      <div className="hdr-right" style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        {onNavigate && <NavBar activeId={activeId} onNavigate={onNavigate} />}
        <button
          className="hdr-back"
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
