import Noise from "../components/Noise";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import StackMarquee from "../components/StackMarquee";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import BackToTopFab from "../components/BackToTopFab";

export default function PortfolioPage({ dark, setDark }) {
  return (
    <>
      <ScrollProgress dark={dark} />
      <Noise />
      <Navbar dark={dark} setDark={setDark} initials="SQ" />
      <main style={{ overflowX: "hidden" }} id="main-content">
        <Hero dark={dark} />
        <StatsBar dark={dark} />
        <StackMarquee dark={dark} />
        <About dark={dark} />
        <Projects dark={dark} />
        <Experience dark={dark} />
        <Contact dark={dark} />
      </main>
      <Footer dark={dark} />
      <BackToTopFab dark={dark} />
    </>
  );
}
