export default function GlobalStyles({ dark }) {
  // User-supplied palette: red-orange primary, deep red secondary, blue accent
  const accent = dark ? "#d9280d" : "#f24126";   // primary — CTA / links
  const accent2 = dark ? "#ee7c7c" : "#831111";  // secondary — labels, borders
  const accent3 = dark ? "#42b3f0" : "#0f80bd";  // accent — used sparingly, tertiary

  const bg = dark ? "#010e05" : "#f1fef5";       // deep green-black / pale mint
  const surface = dark ? "#04170a" : "#ffffff";  // card surface, lifted off bg
  const text = dark ? "#e7feee" : "#011808";     // pale mint / deep green-black
  const muted = dark ? "#9bcaa8" : "#4d6b53";    // muted green, same family as text
  const border = dark ? "rgba(231,254,238,0.08)" : "rgba(1,24,8,0.08)";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@400;500;600;700;800&display=swap');

    *, 
    *::before, 
    *::after { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
    }

    html {
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
      background: ${bg};
      color: ${text};
      transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      line-height: 1.6;
    }

    ::selection {
      background: ${accent}35;
      color: ${text};
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb {
      background: ${accent};
      border-radius: 99px;
    }

    /* Typography */
    .display {
      font-family: 'Outfit', system-ui, sans-serif;
      letter-spacing: -0.03em;
    }
    .syne { font-family: 'Outfit', system-ui, sans-serif; }
    .mono {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-feature-settings: 'liga' 0;
    }

    /* Gradients — stays in the red family; blue is reserved as a standalone accent, not blended in */
    .grad {
      background: linear-gradient(135deg, ${accent} 0%, ${accent2} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .grad-border {
      background:
        linear-gradient(${surface}, ${surface}) padding-box,
        linear-gradient(135deg, ${accent}50, ${accent2}35) border-box;
      border: 1px solid transparent;
    }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${accent2};
    }

    /* Surfaces */
    .glass {
      background: ${dark ? "rgba(28,24,21,0.7)" : "rgba(255,253,249,0.75)"};
      backdrop-filter: blur(16px) saturate(140%);
      -webkit-backdrop-filter: blur(16px) saturate(140%);
    }

    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px -10px rgba(0,0,0,0.18);
      border-color: ${accent}40;
    }
    .card-hover:hover img {
      transform: scale(1.03);
    }

    /* Buttons — flat fill instead of a moving gradient + neon shadow */
    .btn-primary {
      padding: 12px 28px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: ${accent};
      box-shadow: 0 2px 10px rgba(0,0,0,0.12);
      transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-primary:hover {
      background: #9a4530;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.16);
    }
    .btn-primary:active { transform: translateY(0); }

    .btn-ghost {
      padding: 12px 28px;
      border-radius: 12px;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      font-weight: 500;
      color: ${text};
      background: transparent;
      border: 1px solid ${border};
      transition: all 0.25s ease;
    }
    .btn-ghost:hover {
      border-color: ${accent}60;
      background: ${accent}12;
      color: ${accent};
    }

    /* Form */
    input, textarea {
      outline: none;
      font-family: inherit;
    }
    input:focus, textarea:focus {
      border-color: ${accent} !important;
      box-shadow: 0 0 0 3px ${accent}20 !important;
    }

    /* Layout */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    .show-mobile { display: none; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; align-items: center; }
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    }

    .projects-wrapper {
      width: 100%;
      overflow: hidden;
    }

    .projects-track {
      display: flex;
      gap: 1.5rem;
      width: max-content;
      animation: projectMove 40s linear infinite;
    }

    .projects-track:hover {
      animation-play-state: paused;
    }

    .projects-track:active {
      animation-play-state: paused;
    }

    .project-card {
      width:340px;
      min-height:430px;
      flex-shrink:0;
    }

    @keyframes projectMove {
      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(-50%);
      }
    }


    /* Mobile stacked scroll effect */
    @media (max-width: 768px) {

      .hide-mobile { 
        display: none !important; 
      }

      .show-mobile { 
        display: flex !important; 
        align-items: center; 
      }

      .about-grid { 
        grid-template-columns: 1fr; 
        gap: 2.5rem; 
      }


      .projects-wrapper {
        overflow: visible;
      }


      .projects-track {
        display: block;
        width: 100%;
        animation: none;
      }


      .project-card {
        width: 92%;
        margin: 0 auto;
        min-height: 380px;
        position: sticky;
        top: 90px;
        margin-bottom: 50px;
      }

    }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-14px); }
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes blob {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.35; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(1.03); }
    }
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }

    .float { animation: float 7s ease-in-out infinite; }
    .marquee { animation: marquee 35s linear infinite; }
    .blob { animation: blob 9s ease-in-out infinite; }

    .hero-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      animation: pulse-glow 8s ease-in-out infinite;
      background: ${accent3}30;
    }
  `;

  return <style>{css}</style>;
}