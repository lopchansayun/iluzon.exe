import { forwardRef } from "react";
import Hero from "../../components/Hero/Hero";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import ProjectList from "../../components/ProjectList/ProjectList";
import About from "../../components/About/About";
import Awards from "../../components/Awards/Awards";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const Home = forwardRef(function Home({ onOpenProject, galleryEnabled = true }, ref) {
  return (
    <div ref={ref}>
      <Hero galleryEnabled={galleryEnabled} />
      <ProjectGrid onOpenProject={onOpenProject} />
      <ProjectList onOpenProject={onOpenProject} />
      <About />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
});

export default Home;
