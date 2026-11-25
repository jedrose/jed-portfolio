import { PF, CABINETS } from "../../data/content";

export default function NavBar({ activeId, onNavigate, floating }) {
  return (
    <nav
      aria-label="Sections"
      style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6,
        ...(floating ? {
          position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)",
          maxWidth: "calc(100vw - 24px)", padding: 6, zIndex: 30,
          background: "#0d1117ee", border: "1px solid #21262d", borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        } : {}),
      }}
    >
      {CABINETS.map(cab => {
        const active = cab.id === activeId;
        return (
          <button
            key={cab.id}
            onClick={() => onNavigate(cab.id)}
            aria-current={active ? "page" : undefined}
            style={{
              fontFamily: PF, fontSize: 8, letterSpacing: "0.08em",
              padding: "8px 10px", minHeight: 32, borderRadius: 4, cursor: "pointer",
              background: active ? `${cab.color}22` : "none",
              border: `1px solid ${active ? cab.color : `${cab.color}44`}`,
              color: active ? cab.color : "#8b949e",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = cab.color; e.currentTarget.style.color = cab.color; }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = active ? cab.color : `${cab.color}44`;
              e.currentTarget.style.color = active ? cab.color : "#8b949e";
            }}
          >
            {cab.label}
          </button>
        );
      })}
    </nav>
  );
}
