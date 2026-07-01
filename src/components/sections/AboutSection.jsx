import React from "react";
import Header from "../shared/Header";
import { PF, SANS, HOBBIES, TOP_FILMS, TOP_ARTISTS } from "../../data/content";

const DARK = "#0d1117";
const CARD = "#161b22";
const BORDER = "#21262d";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_MUTED = "#8b949e";

export default function AboutSection({ color, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, overflowY: "auto", zIndex: 50, fontFamily: SANS }}>
      <Header title="ABOUT.EXE" color={color} onClose={onClose} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 2.5rem 5rem" }}>

        {/* Headshot hero */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2.5rem" }}>
          <img
            src="/photos/headshot.jpg"
            alt="Jed Roseman"
            style={{
              width: 160, height: 160, objectFit: "cover", objectPosition: "center center",
              borderRadius: "50%", border: `3px solid ${color}`,
              boxShadow: `0 0 0 6px ${color}22, 0 16px 40px rgba(0,0,0,0.5)`,
              display: "block", marginBottom: "1rem",
            }}
          />
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: "-0.01em", marginBottom: 4 }}>Jed Roseman</div>
          <div style={{ fontSize: 13, color: TEXT_MUTED, fontWeight: 500 }}>Electrical Engineering · University of Michigan · Class of 2028</div>
        </div>

        {/* Intro */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>INTRO</SectionLabel>
          <p style={{ fontSize: 16, color: TEXT_PRIMARY, lineHeight: 1.85, margin: 0, fontWeight: 400 }}>
            Hey, I&#39;m Jed Roseman, a sophomore at the University of Michigan studying Electrical Engineering.
            I&#39;m passionate about deep tech, defense, and startups, and always looking to deepen my technical skillset.
            Whether I&#39;m running Michigan Defense Technology, leading a software team at a bank this summer, or building
            my own startups, I&#39;m always taking ownership of teams and products across defense, finance, and emerging tech.
          </p>
          <p style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: 1.85, margin: "1.25rem 0 0", fontWeight: 400 }}>
            My goal is to work on hard problems in national security, deep tech, and emerging industries, orchestrating
            the ideas, people, and execution that turn them into ventures. I care about ownership and getting things built, not just ideas.
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>QUICK STATS</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[["U OF M", "Class of 2028"], ["MAJOR", "Electrical Eng."], ["LOCATION", "Ann Arbor, MI"]].map(([k, v]) => (
              <div key={k} style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 10, padding: "1.25rem",
                borderTop: `2px solid ${color}`,
              }}>
                <div style={{ fontFamily: PF, fontSize: 6, color, letterSpacing: "0.12em", marginBottom: 10 }}>{k}</div>
                <div style={{ fontSize: 15, color: TEXT_PRIMARY, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>FEATURED VIDEO</SectionLabel>
          <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, aspectRatio: "16/9", background: CARD }}>
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/iLFml5LZlQs"
              title="Jed Roseman featured video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
          <p style={{ fontSize: 13, color: TEXT_MUTED, margin: "0.75rem 0 0", lineHeight: 1.6 }}>
            A backpacking trip through <span style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>Olympic National Park</span> — hiking out to Shi Shi Beach, one of the most remote stretches of coastline in the Pacific Northwest.
          </p>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>GALLERY</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.875rem" }}>
            {[
              { src: "/photos/backpacking.png", alt: "Backpacking at Olympic National Park" },
              { src: "/photos/florence.png", alt: "Florence, Italy — Duomo" },
              { src: "/photos/camping.png", alt: "Hammock camping" },
              { src: "/photos/hackathon photo.jpg", alt: "Hackathon" },
              { src: "/photos/car.jpg", alt: "EVR autocross racing" },
              { src: "/photos/mdt group photo.jpg", alt: "Michigan Defense Technology" },
              { src: "/photos/michigan national chip.png", alt: "Michigan National Championship" },
              { src: "/photos/EVR pic.png", alt: "EVR" },
            ].map(p => (
              <div key={p.src} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                <img src={p.src} alt={p.alt} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Letterboxd Films */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <SectionLabel color={color} noMargin>RECENT WATCHES</SectionLabel>
            <a
              href="https://letterboxd.com/jedandmic/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11, color: color, fontFamily: PF, letterSpacing: "0.08em",
                textDecoration: "none", opacity: 0.8,
                display: "flex", alignItems: "center", gap: 5,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}
            >
              VIEW PROFILE
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
            {TOP_FILMS.map((film) => (
              <FilmCard key={film.title} film={film} color={color} />
            ))}
          </div>
        </div>

        {/* Current Rotation */}
        <div style={{ marginBottom: "3rem" }}>
          <SectionLabel color={color}>CURRENT ROTATION</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
            {TOP_ARTISTS.map((artist) => (
              <ArtistCard key={artist.name} artist={artist} color={color} />
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <SectionLabel color={color}>OUTSIDE THE LAB</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {HOBBIES.map(h => (
              <span
                key={h}
                style={{
                  fontSize: 13, padding: "6px 14px",
                  background: `${color}18`, border: `1px solid ${color}44`,
                  borderRadius: 20, color: TEXT_PRIMARY, fontWeight: 500,
                  transition: "background 0.2s ease-out, border-color 0.2s ease-out",
                  cursor: "default",
                }}
              >{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}

function SectionLabel({ color, children, noMargin }) {
  return (
    <div style={{
      fontFamily: PF, fontSize: 7, color,
      letterSpacing: "0.14em", marginBottom: noMargin ? 0 : "1.25rem",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ display: "inline-block", width: 16, height: 1, background: color }} />
      {children}
    </div>
  );
}

function FilmCard({ film, color }) {
  const [hovered, setHovered] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 10, overflow: "hidden",
        aspectRatio: "2/3",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px ${color}` : `0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px #21262d`,
        transition: "transform 0.22s ease-out, box-shadow 0.22s ease-out",
        background: "#0d1117",
      }}
    >
      {!imgError ? (
        <img
          src={film.poster}
          alt={film.title}
          onError={() => setImgError(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, #1a1f2e 0%, #21262d 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: PF, fontSize: 6, color: "#374151", letterSpacing: "0.08em", textAlign: "center", padding: "0 0.5rem" }}>{film.title}</span>
        </div>
      )}
      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
        transition: "background 0.22s ease-out",
      }} />
      {/* info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.875rem 0.75rem 0.8rem" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 3 }}>{film.title}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", marginBottom: 6, fontWeight: 500 }}>{film.year} · {film.director}</div>
        <div style={{ fontSize: 12, color: "#f59e0b", letterSpacing: 2, lineHeight: 1 }}>{renderStars(film.rating)}</div>
      </div>
    </div>
  );
}

function ArtistCard({ artist, color }) {
  const [hovered, setHovered] = React.useState(false);
  const [imgError, setImgError] = React.useState(!artist.image);

  const initials = artist.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 10, overflow: "hidden",
        aspectRatio: "1", cursor: "default",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px ${color}` : `0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px #21262d`,
        transition: "transform 0.22s ease-out, box-shadow 0.22s ease-out",
      }}
    >
      {/* Background: real photo or gradient */}
      {!imgError ? (
        <img
          src={artist.image}
          alt={artist.name}
          onError={() => setImgError(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          position: "absolute", inset: 0,
          background: artist.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "rgba(255,255,255,0.15)", letterSpacing: 2, userSelect: "none" }}>{initials}</span>
        </div>
      )}
      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
      }} />
      {/* info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem 0.7rem 0.7rem" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 3 }}>{artist.name}</div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontFamily: PF, letterSpacing: "0.06em", lineHeight: 1.4 }}>{artist.genre}</div>
      </div>
    </div>
  );
}
