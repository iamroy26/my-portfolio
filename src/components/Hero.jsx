import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";
import { openContactPrefill } from "../utils/contact";

const CHIPS = [
  {
    label: "React.js",
    top: "12%",
    left: "-10%",
    className: "chip-1",
    icon: "⚛️",
  },
  {
    label: "Tailwind CSS",
    top: "38%",
    right: "-12%",
    className: "chip-2",
    icon: "🎨",
  },
  {
    label: "Framer Motion",
    bottom: "-6%",
    left: "50%",
    className: "chip-3",
    icon: "✨",
  },
];

function scrollTo(id) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero({ dark }) {
  const { border, text, muted, accent, accent2, accent3, glow, glowCyan } = useTheme(dark);
  

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "88px 2rem 4rem",
        overflow: "hidden",
      }}
    >
      <div
        className="hero-glow"
        style={{
          top: "8%",
          left: "0%",
          width: 560,
          height: 560,
          background: `radial-gradient(circle, ${accent}22 0%, transparent 68%)`,
        }}
      />
      <div
        className="hero-glow"
        style={{
          bottom: "0%",
          right: "0%",
          width: 480,
          height: 480,
          background: `radial-gradient(circle, ${accent2}18 0%, transparent 68%)`,
          animationDelay: "2s",
        }}
      />
      <div
        className="hero-glow"
        style={{
          top: "35%",
          right: "15%",
          width: 320,
          height: 320,
          background: `radial-gradient(circle, ${accent3}12 0%, transparent 70%)`,
          animationDelay: "4s",
        }}
      />

      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: dark ? 0.035 : 0.05,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={dark ? "#fff" : "#000"}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "4rem",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 16px",
              borderRadius: 100,
              background: dark ? "rgba(74,222,128,0.08)" : "rgba(34,197,94,0.08)",
              border: `1px solid ${accent3}35`,
              color: accent3,
              fontSize: 12,
              fontWeight: 500,
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: accent3,
                boxShadow: `0 0 12px ${accent3}`,
                display: "inline-block",
              }}
            />
            available for work
          </div>

          <p
            className="mono"
            style={{
              fontSize: 13,
              color: muted,
              marginBottom: "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            // hello world
          </p>

          <h1
            className="display"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: "1.25rem",
            }}
          >
            Hey, I'm
            <br />
            <span className="grad">{DATA.name}</span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: muted,
              lineHeight: 1.75,
              maxWidth: 500,
              marginBottom: "2.25rem",
              fontWeight: 400,
            }}
          >
            {DATA.bio}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>
              View Projects
            </button>
            <a
              className="btn-ghost"
              href="/Resume/Shadrack-Quaye-Resume.html"
              download="Shadrack-Quaye-Resume.html"
              style={{
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: muted,
                border: "1px solid white",
              }}
            >
              <Icon name="download" size={15} /> Resume
            </a>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {DATA.contactLinks.map(({ icon, label, messagePrefill }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Message via ${label}`}
                  onClick={() => openContactPrefill(messagePrefill)}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    border: `1px solid ${border}`,
                    background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: muted,
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accent2;
                    e.currentTarget.style.borderColor = `${accent2}50`;
                    e.currentTarget.style.boxShadow = `0 0 24px ${glowCyan}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = muted;
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon name={icon} size={17} />
                </button>
              )
            )}
          </div>
        </div>

       <div
          className="hero-avatar float"
          style={{
            position: "relative",
            flexShrink: 0,
            width: "clamp(220px, 45vw, 340px)",
            height: "clamp(220px, 45vw, 340px)",
            margin: "0 auto",
          }}
        >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "50%",
            position: "relative",
            boxShadow: `0 0 0 1px ${accent}30,
                        0 0 100px ${glow},
                        0 0 60px ${glowCyan}`,
            animation: "blob 9s ease-in-out infinite",
          }}
        >
            <img
              src="/Resume/shadrack_quaye.jpg"
              alt="Shadrack Quaye"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(
                  160deg,
                  ${accent}18,
                  transparent 50%,
                  ${accent2}10
                )`,
              }}
            />
          </div>

          {CHIPS.map(({ label, icon, className, ...position }) => (
            <div
              key={label}
              className={`chip ${className}`}
              style={{
                position: "absolute",
                ...position,
                borderRadius: 12,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 600,
                color: muted,
                backdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 12px 32px rgba(0,0,0,${dark ? 0.4 : 0.12})`,
                whiteSpace: "nowrap", background: dark ? "rgba(10,10,13,0.9)" : "rgba(255,255,255,0.92)",
              }}
            >
              {icon} {label}
            </div>
          ))}
        </div>
      </div>

      <div
        className="mono"
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          color: muted,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span>scroll</span>
        <div
          style={{
            width: 1,
            height: 48,
            background: `linear-gradient(to bottom, ${accent2}80, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
