
export function useTheme(dark) {
  return {
    bg: dark ? "#030304" : "#fafafa",
    surface: dark ? "#0a0a0d" : "#ffffff",
    surfaceElevated: dark ? "#121216" : "#f4f4f5",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
    borderStrong: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)",
    text: dark ? "#fafafa" : "#09090b",
    muted: dark ? "#a1a1aa" : "#71717a",
    accent: "#a78bfa",
    accent2: "#22d3ee",
    accent3: "#4ade80",
    accentHot: "#f472b6",
    gradient:
      "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 25%, #22d3ee 60%, #4ade80 100%)",
    gradientBtn: "linear-gradient(135deg, #8b5cf6, #6366f1, #0ea5e9)",
    glow: dark ? "rgba(167,139,250,0.35)" : "rgba(99,102,241,0.25)",
    glowCyan: dark ? "rgba(34,211,238,0.2)" : "rgba(14,165,233,0.15)",
    navBg: dark ? "rgba(3,3,4,0.72)" : "rgba(250,250,250,0.72)",
  };
}
