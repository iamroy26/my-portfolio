import Reveal from "./Reveal";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";

export default function StatsBar({ dark }) {
  const { border, muted, text, accent, accent2 } = useTheme(dark);

  return (
    <section style={{ padding: "0 2rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 16,
            padding: "1.5rem",
            borderRadius: 16,
            border: `1px solid ${border}`,
            background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          {DATA.stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "0.5rem" }}>
              <div
                className="display"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${accent}, ${accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <p className="mono" style={{ fontSize: 11, color: muted, marginTop: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
