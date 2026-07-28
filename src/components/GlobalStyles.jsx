export default function GlobalStyles({ dark }) {
  const accent = "#3b82f6";   
  const accent2 = "#6366f1";  
  const accent3 = "#4f46e5";   
  const bg = dark ? "#030304" : "#fafafa";
  const surface = dark ? "#0a0a0d" : "#ffffff";
  const text = dark ? "#fafafa" : "#09090b";
  const muted = dark ? "#a1a1aa" : "#71717a";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

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
      background: linear-gradient(180deg, ${accent}90, ${accent2}90);
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

    /* Gradients */
    .grad {
      background: linear-gradient(135deg, #93c5fd 0%, ${accent} 40%, ${accent2} 75%, ${accent3} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .grad-border {
      background:
        linear-gradient(${surface}, ${surface}) padding-box,
        linear-gradient(135deg, ${accent}70, ${accent2}50, ${accent3}40) border-box;
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
      background: ${dark ? "rgba(10,10,13,0.65)" : "rgba(255,255,255,0.72)"};
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
    }

    .card-hover {
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.35s ease,
                  border-color 0.35s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow:
        0 0 0 1px ${accent}25,
        0 24px 48px -12px ${accent}18,
        0 0 80px -20px ${accent2}15;
    }
    .card-hover:hover img {
      transform: scale(1.05);
    }

    /* Buttons */
    .btn-primary {
      padding: 12px 28px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #2563eb, #4f46e5, #4338ca);
      background-size: 200% 200%;
      box-shadow: 0 4px 24px ${accent}45, inset 0 1px 0 rgba(255,255,255,0.15);
      transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
    }
    .btn-primary:hover {
      background-position: 100% 100%;
      transform: translateY(-1px);
      box-shadow: 0 8px 32px ${accent}55, 0 0 40px ${accent2}25, inset 0 1px 0 rgba(255,255,255,0.2);
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
      box-shadow: 0 0 0 3px ${accent}20, 0 0 24px ${accent2}10 !important;
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
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.85; transform: scale(1.05); }
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
      filter: blur(80px);
      pointer-events: none;
      animation: pulse-glow 8s ease-in-out infinite;
    }
  `;

  return <style>{css}</style>;
}