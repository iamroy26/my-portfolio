import Reveal from "./Reveal";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";

export default function About({ dark }) {
  const { border, muted, text, accent, accent2 } = useTheme(dark);

  return (
    <section id="about" style={{ padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="section-label">About Me</span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginTop: 12,
              lineHeight: 1.1,
            }}
          >
            Turning ideas into
            <br />
            <span className="grad">digital reality</span>
          </h2>
        </div>
      </Reveal>

      <div className="about-grid">
        <div>
          <Reveal delay={0.1}>
            <p style={{ color: muted, lineHeight: 1.85, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              I'm a Computer Science student at {DATA.education.school}, passionate about building software
              that's both technically excellent and a joy to use.
            </p>
            <p style={{ color: muted, lineHeight: 1.85, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              I'm passionate about building modern, responsive UIs and transforming ideas into interactive web
              experiences. I focus on clean design, performance, and user-centered development.
            </p>
            <p style={{ color: muted, lineHeight: 1.85, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              Beyond personal projects, I serve as media and IT support personnel at my church, where I've
              contributed to building and maintaining church websites and supporting the technical side of
              media operations.
            </p>
            <p style={{ color: muted, lineHeight: 1.85, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
              When I'm not coding, I contribute to open-source projects, explore modern web technologies, and
              stay updated with advancements in AI and frontend development.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="grad-border card-hover"
              style={{
                borderRadius: 16,
                padding: "1.5rem 1.75rem",
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="mono section-label" style={{ marginBottom: 12, color: accent2 }}>
                education
              </div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 6 }}>{DATA.education.school}</div>
              <div style={{ color: muted, fontSize: 14 }}>
                {DATA.education.degree} · {DATA.education.year}
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          {Object.entries(DATA.skills).map(([cat, skills], ci) => (
            <Reveal key={cat} delay={ci * 0.1}>
              <div style={{ marginBottom: "2rem" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: "0.9rem",
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="mono"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${border}`,
                        fontSize: 12,
                        fontWeight: 500,
                        color: text,
                        transition: "all 0.25s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `${accent2}14`;
                        e.target.style.borderColor = `${accent2}45`;
                        e.target.style.color = accent2;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
                        e.target.style.borderColor = border;
                        e.target.style.color = text;
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}