import Reveal from "./Reveal";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";

export default function Experience({ dark }) {
  const { border, muted, accent, accent2, accent3 } = useTheme(dark);

  return (
    <section id="experience" style={{ padding: "6rem 2rem", maxWidth: 900, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">Experience</span>
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
            My <span className="grad">journey</span>
          </h2>
        </div>
      </Reveal>

      <div style={{ position: "relative" }}>
        <div
          className="hide-mobile"
          style={{
            position: "absolute",
            left: "calc(50% - 1px)",
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, ${accent}90, ${accent2}60, ${accent3}30, transparent)`,
          }}
        />

        {DATA.experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.12}>
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                marginBottom: "3rem",
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                alignItems: "flex-start",
              }}
            >
              <div
                className="card-hover grad-border"
                style={{
                  flex: 1,
                  borderRadius: 16,
                  padding: "1.6rem",
                  background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div>
                    <h3 className="display" style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                      {e.role}
                    </h3>
                    <div style={{ color: accent2, fontSize: 14, fontWeight: 600, marginTop: 4 }}>{e.company}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      className="mono"
                      style={{
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: `${accent2}14`,
                        color: accent2,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {e.type}
                    </span>
                    <div className="mono" style={{ color: muted, fontSize: 12, marginTop: 6 }}>
                      {e.period}
                    </div>
                  </div>
                </div>

                <p style={{ color: muted, fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" }}>{e.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        border: `1px solid ${border}`,
                        color: muted,
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="hide-mobile"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: 24,
                  background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                  boxShadow: `0 0 20px ${accent}70, 0 0 40px ${accent2}30`,
                  position: "relative",
                  zIndex: 1,
                }}
              />

              <div style={{ flex: 1 }} className="hide-mobile" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
