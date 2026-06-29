import Header from "../shared/Header";
import { PF, SANS, CONTACT_LINKS } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

const ICONS = {
  EMAIL: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  LINKEDIN: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  GITHUB: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  ),
  PHONE: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
};

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
              aria-label={`${l.label}: ${l.display}`}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "1.125rem 1.375rem",
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                textDecoration: "none",
                transition: "border-color 0.2s ease-out, background 0.2s ease-out, transform 0.15s ease-out",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background = `${color}0f`;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.background = CARD;
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: `${color}18`, border: `1px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: color,
              }}>
                {ICONS[l.label] || null}
              </div>
              <div>
                <div style={{ fontFamily: PF, fontSize: 6, color, letterSpacing: "0.12em", marginBottom: 5 }}>{l.label}</div>
                <div style={{ fontSize: 14, color: TEXT_PRIMARY, fontWeight: 500, letterSpacing: "0.01em" }}>{l.display}</div>
              </div>
              <div style={{ marginLeft: "auto", color: "#374151", fontSize: 14, fontWeight: 600 }}>→</div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
