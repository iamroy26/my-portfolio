
export default function ProjectLogo({ src, alt, size = 40, borderColor }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: size > 48 ? 14 : 10,
        objectFit: "cover",
        flexShrink: 0,
        border: borderColor ? `2px solid ${borderColor}` : "2px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
      }}
      loading="lazy"
    />
  );
}
