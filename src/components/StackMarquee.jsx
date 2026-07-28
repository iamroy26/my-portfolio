import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";

export default function StackMarquee({ dark }) {
  const { border, muted, accent, accent2 } = useTheme(dark);

  return (
    <div
      style={{
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        padding: "1.25rem 0",
        overflow: "hidden",
        background: dark
          ? "linear-gradient(90deg, rgba(167,139,250,0.04), transparent, rgba(34,211,238,0.04))"
          : "linear-gradient(90deg, rgba(99,102,241,0.03), transparent, rgba(14,165,233,0.03))",
      }}
    >
      <div className="marquee" style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap", width: "max-content" }}>
        {[...DATA.stack, ...DATA.stack].map((item, i) => (
          <span
            key={i}
            className="mono"
            style={{
              color: muted,
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 12,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: accent2, opacity: 0.7 }}>▸</span>
            {item}
            <span style={{ color: accent, opacity: 0.35, marginLeft: 4 }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
