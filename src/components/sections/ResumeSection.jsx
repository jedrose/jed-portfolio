import Header from "../shared/Header";
import { PF, SANS, RESUME_PDF_URL } from "../../data/content";
import { useIsNarrow, useIsTouch } from "../../hooks/useMedia";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function ResumeSection({ color, onClose }) {
  const narrow = useIsNarrow();
  const touch = useIsTouch();
  // Phone and tablet browsers can't show a PDF inside the page ("Couldn't load plugin"),
  // so on those we skip the inline preview and lead with the open/download buttons.
  const showPreview = !narrow && !touch;
  const btnSize = narrow ? 8 : 7;
  const btnPad = narrow ? "16px 24px" : "11px 24px";

  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", overscrollBehavior: "contain", zIndex: 50, fontFamily: SANS }}>
      <Header title="RESUME.EXE" color={color} onClose={onClose} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: narrow ? "2rem 1.125rem 4rem" : "2.5rem 2.5rem 5rem" }}>

        {/* Title + subtitle */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT_PRIMARY, margin: "0 0 10px", letterSpacing: "-0.02em", fontFamily: SANS }}>
            My Resume
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0, fontFamily: SANS }}>
            {touch ? "Tap below to open or download the PDF." : "Click below to download or view full screen."}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 12,
          margin: narrow ? "0 auto 2rem" : "0 0 2rem",
          ...(narrow ? { flexDirection: "column", maxWidth: 360 } : {}),
        }}>
          <a
            href={RESUME_PDF_URL}
            download="Jedidiah_Roseman_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: btnPad, background: color, color: "#fff",
              borderRadius: 8, fontFamily: PF, fontSize: btnSize, letterSpacing: "0.08em",
              fontWeight: 700, textDecoration: "none",
              boxShadow: `0 0 16px ${color}44`,
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            DOWNLOAD PDF
          </a>
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: btnPad, background: CARD,
              border: `1px solid ${BORDER}`,
              color: TEXT_PRIMARY, borderRadius: 8,
              fontFamily: PF, fontSize: btnSize, letterSpacing: "0.08em", fontWeight: 700,
              textDecoration: "none",
              transition: "border-color 0.15s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {narrow ? "OPEN RESUME" : "OPEN FULL SCREEN"}
          </a>
        </div>

        {/* Browser-frame PDF preview (desktop only) */}
        {showPreview && <div style={{
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: `0 4px 32px #00000055`,
        }}>
          {/* Browser chrome bar */}
          <div style={{
            background: "#0d1117",
            borderBottom: `1px solid ${BORDER}`,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 12, color: TEXT_MUTED, fontFamily: SANS }}>
              Jedidiah Roseman - Resume 2026
            </span>
            <div style={{ display: "flex", gap: 7 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            </div>
          </div>

          {/* PDF embed */}
          <embed
            src={`${RESUME_PDF_URL}#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            style={{
              width: "100%",
              height: 780,
              border: "none",
              display: "block",
            }}
          />
        </div>}

      </div>
    </div>
  );
}
