import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";
import { openContactPrefill } from "../utils/contact";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ dark }) {
  const { border, text, muted, accent, accent2 } = useTheme(dark);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onContactOpen = (event) => {
      const prefill = event.detail?.prefill || "";
      if (prefill) {
        setFormData((prev) => ({
          ...prev,
          message: prev.message.trim() ? prev.message : prefill,
        }));
        setSent(false);
      }
    };

    window.addEventListener("portfolio:contact", onContactOpen);
    return () => window.removeEventListener("portfolio:contact", onContactOpen);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const next = {};
    if (!formData.name.trim()) next.name = "Please enter your name";
    if (!formData.email.trim()) next.email = "Please enter your email";
    else if (!isValidEmail(formData.email)) next.email = "Please enter a valid email";
    if (!formData.message.trim()) next.message = "Please enter a message";
    else if (formData.message.trim().length < 10) next.message = "Message should be at least 10 characters";

    setErrors(next);
    if (Object.keys(next).length) return;

    window.location.href = `mailto:${DATA.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
    setSent(true);
  };

  const INFO_ITEMS = [
    { icon: "mail", label: DATA.email, onClick: () => openContactPrefill(DATA.contactLinks[0].messagePrefill), hint: "Click to message" },
    { icon: "location", label: DATA.location },
    {
      icon: "github",
      label: "github.com/iamroy26",
      onClick: () => openContactPrefill(DATA.contactLinks[1].messagePrefill),
      hint: "Click to message",
    },
  ];

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    color: text,
    fontSize: 15,
    transition: "all 0.25s ease",
  };

  return (
    <section id="contact" style={{ padding: "6rem 2rem", borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-label">Contact</span>
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
              Let&apos;s <span className="grad">work together</span>
            </h2>
            <p style={{ color: muted, marginTop: 14, fontSize: "1.05rem" }}>
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            {INFO_ITEMS.map(({ icon, label, onClick, hint }) => {
              const inner = (
                <>
                  <span style={{ color: accent2, display: "flex" }}>
                    <Icon name={icon} size={15} />
                  </span>
                  <span>
                    {label}
                    {hint && (
                      <span className="mono" style={{ display: "block", fontSize: 10, color: muted, marginTop: 2 }}>
                        {hint}
                      </span>
                    )}
                  </span>
                </>
              );
              return (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className="mono grad-border"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 18px",
                    borderRadius: 12,
                    background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    color: muted,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: onClick ? "pointer" : "default",
                    fontFamily: "inherit",
                    border: undefined,
                  }}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="grad-border"
            style={{
              borderRadius: 20,
              padding: "2.5rem",
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.85)",
              backdropFilter: "blur(16px)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: `${accent2}18`,
                    border: `1px solid ${accent2}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    color: accent2,
                  }}
                >
                  <Icon name="check" size={26} />
                </div>
                <h3 className="display" style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 8 }}>
                  Opening your email client…
                </h3>
                <p style={{ color: muted }}>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  type="button"
                  className="btn-ghost"
                  style={{ marginTop: "1.25rem" }}
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  ["Name", "name", "text", "Your name"],
                  ["Email", "email", "email", "your@email.com"],
                ].map(([label, key, type, placeholder]) => (
                  <div key={key}>
                    <label
                      className="mono"
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 500,
                        marginBottom: 8,
                        color: muted,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, [key]: e.target.value }));
                        if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
                      }}
                      style={{
                        ...inputStyle,
                        borderColor: errors[key] ? "#f87171" : border,
                      }}
                    />
                    {errors[key] && (
                      <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors[key]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label
                    className="mono"
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 500,
                      marginBottom: 8,
                      color: muted,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, message: e.target.value }));
                      if (errors.message) setErrors((p) => ({ ...p, message: "" }));
                    }}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      borderColor: errors.message ? "#f87171" : border,
                    }}
                  />
                  {errors.message && (
                    <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.message}</p>
                  )}
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "15px" }}>
                  Send Message
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
