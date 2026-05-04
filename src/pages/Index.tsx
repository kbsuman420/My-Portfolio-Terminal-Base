import { useState } from "react";
import { BootSequence } from "@/components/terminal/BootSequence";
import { Navbar } from "@/components/terminal/Navbar";
import { Hero } from "@/components/terminal/Hero";
import { About } from "@/components/terminal/About";
import { Skills } from "@/components/terminal/Skills";
import { Projects } from "@/components/terminal/Projects";
import { Experience } from "@/components/terminal/Experience";
import { EducationCerts } from "@/components/terminal/EducationCerts";
import { Footer } from "@/components/terminal/Footer";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { MatrixRain } from "@/components/terminal/MatrixRain";
import { KonamiEgg } from "@/components/terminal/KonamiEgg";
import { ContextMenu } from "@/components/terminal/ContextMenu";
import { ScrollProgress } from "@/components/terminal/ScrollProgress";
import { BackToTop } from "@/components/terminal/BackToTop";
import { Reveal } from "@/components/terminal/Reveal";

const Index = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <title>Suman Kundu — Full Stack Developer // Terminal Portfolio</title>
      <meta
        name="description"
        content="Suman Kundu — Full Stack Developer (React, Node.js, MongoDB). Projects, skills, and experience presented as a retro hacker terminal."
      />
      <link rel="canonical" href="/" />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <MatrixRain />
      <div className="scanlines" />
      <ScrollProgress />
      <div className="crt-flicker min-h-screen pb-64 md:pb-72">
        <Navbar />
        <main>
          <Reveal><Hero /></Reveal>
          <Reveal><About /></Reveal>
          <Reveal><Skills /></Reveal>
          <Reveal><Projects /></Reveal>
          <Reveal><Experience /></Reveal>
          <Reveal><EducationCerts /></Reveal>
        </main>
        <Footer />
      </div>

      <InteractiveTerminal />
      <KonamiEgg />
      <ContextMenu />
      <BackToTop />
    </>
  );
};

export default Index;
