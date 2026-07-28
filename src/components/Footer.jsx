import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";
import { openContactPrefill } from "../utils/contact";

export default function Footer({ dark }) {
  const { border, text, muted, accent, accent2 } = useTheme(dark);

  return (
    <footer
      style={{
        borderTop: `1px solid ${border}`,
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <span className="mono" style={{ color: muted, fontSize: 12 }}>
        © 2026{" "}
        <span style={{ color: muted, fontWeight: 600 }}>{DATA.name}. All rights reserved</span>
      </span>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {DATA.contactLinks.map(({ icon, label, messagePrefill }) => (
            <button
              key={label}
              type="button"
              aria-label={`Message via ${label}`}
              onClick={() => openContactPrefill(messagePrefill)}
              style={{
                color: muted,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accent2;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = muted;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Icon name={icon} size={16} />
            </button>
          )
        )}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: `1px solid ${border}`,
            background: "transparent",
            cursor: "pointer",
            color: muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = accent;
            e.currentTarget.style.borderColor = `${accent}50`;
            e.currentTarget.style.boxShadow = `0 0 20px ${accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = muted;
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Icon name="arrow" size={14} />
        </button>
      </div>
    </footer>
  );
}
