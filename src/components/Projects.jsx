import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";
import { DATA } from "../data/data";
import { isExternal } from "./AllAppsBar";
import ProjectLogo from "./ProjectLogo";

const FILTERS = ["All", "React", "JavaScript", "CSS", "API"];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function Projects({ dark }) {
  const { border, muted, accent, accent2, surface, text } = useTheme(dark);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile();

  const filtered = DATA.projects.filter((p) => {
    const matchFilter =
      filter === "All" ||
      p.stack.some((s) =>
        s.toLowerCase().includes(filter.toLowerCase())
      );

    const q = search.trim().toLowerCase();

    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.stack.some((s) =>
        s.toLowerCase().includes(q)
      );

    return matchFilter && matchSearch;
  });

  // Only duplicate the list for the desktop marquee animation.
  // On mobile the track is static (no scroll animation), so duplicating
  // would just show every project card twice.
  const renderList = isMobile ? filtered : [...filtered, ...filtered];

  return (
    <section
      id="projects"
      style={{
        padding: "6rem 2rem",
        background: dark
          ? "linear-gradient(180deg, rgba(167,139,250,0.03) 0%, transparent 40%)"
          : "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 40%)",
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
      }}
    >

      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <div style={{
            textAlign:"center",
            marginBottom:"3.5rem"
          }}>
            <span className="section-label">
              Projects
            </span>
            <h2
              className="display"
              style={{
                fontSize:"clamp(2rem,4vw,3rem)",
                fontWeight:800
              }}
            >
              Things I've <span className="grad">built</span>
            </h2>

            <p
              style={{
                color:muted,
                marginTop:14
              }}
            >
              A selection of personal and professional projects.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            maxWidth:400,
            margin:"0 auto 1.5rem"
          }}>
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              style={{
                width:"100%",
                padding:"12px 16px",
                borderRadius:12,
                border:`1px solid ${border}`,
                background:surface,
                color:text
              }}
            />
          </div>

          <div style={{
            display:"flex",
            justifyContent:"center",
            gap:8,
            flexWrap:"wrap",
            marginBottom:"3rem"
          }}>
            {FILTERS.map((f)=>(
              <button
                key={f}
                onClick={()=>setFilter(f)}
                style={{
                  padding:"8px 18px",
                  borderRadius:10,
                  border:`1px solid ${
                    filter===f ? accent2 : border
                  }`,
                  background:
                    filter===f
                    ? `${accent2}14`
                    :"transparent",
                  color:
                    filter===f
                    ? accent2
                    : muted,
                  cursor:"pointer"
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          className="projects-wrapper"
          onMouseEnter={()=>setPaused(true)}
          onMouseLeave={()=>setPaused(false)}
          onTouchStart={()=>setPaused(true)}
          onTouchEnd={()=>setPaused(false)}
        >
          <div
            className={`projects-track ${
              paused ? "paused" : ""
            }`}
          >
          {renderList.map((p,i)=>(
            <Reveal
              key={`${p.title}-${i}`}
              delay={i*0.08}
            >
            <div
              className="project-card card-hover"
              style={{
                borderRadius:18,
                overflow:"hidden",
                border:
                `1px solid ${
                  p.featured
                  ? p.color+"50"
                  : border
                }`,
                background:
                dark
                ?"rgba(255,255,255,0.02)"
                :"rgba(255,255,255,0.85)",
                backdropFilter:"blur(12px)"
              }}
            >
              <div
                style={{
                  height:160,
                  position:"relative",
                  overflow:"hidden"
                }}
              >
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                  }}
                />
              )}
              <div
                style={{
                  position:"absolute",
                  inset:0,
                  background:
                  "linear-gradient(to top,rgba(0,0,0,.7),transparent)"
                }}
              />
              {p.logo && (
                <div
                  style={{
                    position:"absolute",
                    bottom:14,
                    left:14
                  }}
                >
                  <ProjectLogo
                    src={p.logo}
                    size={52}
                    borderColor={`${p.color}80`}
                  />
                </div>
              )}
              </div>
              <div style={{
                padding:"1.5rem"
              }}>
              <h3
                className="display"
                style={{
                  fontWeight:700
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color:muted,
                  margin:"10px 0"
                }}
              >
                {p.desc}
              </p>

              <div style={{
                display:"flex",
                flexWrap:"wrap",
                gap:6
              }}>
              {p.stack.map((s)=>(
                <span
                  key={s}
                  style={{
                    padding:"4px 10px",
                    borderRadius:6,
                    background:`${p.color}12`,
                    color:p.color,
                    fontSize:11
                  }}
                >
                  {s}
                </span>
              ))}
              </div>

              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Source Button */}
                <a
                  href={DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: `1px solid ${border}`,
                    color: muted,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    background: "transparent",
                    transition: "all .3s ease",
                  }}

                  onMouseEnter={(e)=>{
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "#111827";
                    e.currentTarget.style.borderColor = "#374151";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}

                  onMouseLeave={(e)=>{
                    e.currentTarget.style.color = muted;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon name="github" size={15}/>
                  Source
                </a>
                {p.demoPath && (
                  isExternal(p.demoPath)
                  ?
                  <a
                    href={p.demoPath}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:7,
                      padding:"8px 16px",
                      borderRadius:10,
                      color:"#fff",
                      textDecoration:"none",
                      fontSize:13,
                      fontWeight:600,
                      background:
                      `linear-gradient(135deg, ${accent}, ${accent2})`,
                      boxShadow:
                      `0 8px 25px ${accent}40`,
                      transition:"all .3s ease",
                    }}
                    onMouseEnter={(e)=>{
                      e.currentTarget.style.transform =
                      "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                      `0 12px 35px ${accent2}60`;
                    }}
                    onMouseLeave={(e)=>{
                      e.currentTarget.style.transform =
                      "translateY(0)";
                      e.currentTarget.style.boxShadow =
                      `0 8px 25px ${accent}40`;
                    }}
                  >
                    <Icon name="external" size={15}/>
                    Live App
                  </a>
                  :
                  <Link
                    to={p.demoPath}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:7,
                      padding:"8px 16px",
                      borderRadius:10,
                      color:"#fff",
                      textDecoration:"none",
                      fontSize:13,
                      fontWeight:600,
                      background:
                      `linear-gradient(135deg, ${accent}, ${accent2})`,
                      boxShadow:
                      `0 8px 25px ${accent}40`,
                      transition:"all .3s ease",
                    }}
                    onMouseEnter={(e)=>{
                      e.currentTarget.style.transform =
                      "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                      `0 12px 35px ${accent2}60`;
                    }}
                    onMouseLeave={(e)=>{
                      e.currentTarget.style.transform =
                      "translateY(0)";
                      e.currentTarget.style.boxShadow =
                      `0 8px 25px ${accent}40`;
                    }}
                  >
                    <Icon name="external" size={15}/>
                    Live Demo
                  </Link>
                )}
              </div>
              </div>
            </div>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}