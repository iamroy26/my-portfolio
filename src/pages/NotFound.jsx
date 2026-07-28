import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function NotFound({ dark }) {
  const { text, muted, accent, border } = useTheme(dark);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <p className="mono" style={{ color: accent, fontSize: 13, letterSpacing: "0.15em", marginBottom: 12 }}>
          404
        </p>
        <h1 className="display" style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12, color: text }}>
          Page not found
        </h1>
        <p style={{ color: muted, marginBottom: "2rem", maxWidth: 360, lineHeight: 1.7 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary"
          style={{ display: "inline-block", textDecoration: "none", padding: "12px 28px" }}
        >
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}
