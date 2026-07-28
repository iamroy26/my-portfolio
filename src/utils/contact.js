export function openContactPrefill(prefill = "") {
  window.dispatchEvent(new CustomEvent("portfolio:contact", { detail: { prefill } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
