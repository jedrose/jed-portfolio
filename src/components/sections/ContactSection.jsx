import Header from "../shared/Header";
import { PF, SANS, CONTACT_LINKS } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function ContactSection({ color, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="CONTACT.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>
        <p style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: 1.85, marginBottom: "2.75rem", letterSpacing: "0.01em" }}>
          Open to internships, defense tech, venture, and product roles. Always down to talk MDT or interesting projects.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "3rem" }}>
          {CONTACT_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "1.125rem 1.375rem",
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                textDecoration: "none",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background = `${color}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.background = CARD;
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: `${color}22`, border: `1px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: color, fontWeight: 700,
              }}>{l.icon}</div>
              <div>
                <div style={{ fontFamily: PF, fontSize: 6, color: color, letterSpacing: "0.12em", marginBottom: 5 }}>{l.label}</div>
                <div style={{ fontSize: 14, color: TEXT_PRIMARY, fontWeight: 500, letterSpacing: "0.01em" }}>{l.display}</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 16, color: "#374151" }}>→</div>
            </a>
          ))}
        </div>

        <div style={{ fontFamily: PF, fontSize: 7, color: "#374151", letterSpacing: "0.12em", textAlign: "center" }}>
          NO RECRUITERS PLEASE
        </div>
      </div>
    </div>
  );
}
