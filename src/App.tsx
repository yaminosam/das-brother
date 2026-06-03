import { useState } from "react";
import OpeningSequence from "./components/ui/OpeningSequence";
import CursorTrail from "./components/ui/CursorTrail";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import TowerScene from "./components/3d/TowerScene";
import TrustBar from "./components/sections/TrustBar";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import Stats from "./components/sections/Stats";
import ServicesDetail from "./components/sections/ServicesDetail";
import Testimonials from "./components/sections/Testimonials";
import Careers from "./components/sections/Careers";
import CtaBanner from "./components/sections/CtaBanner";
import Footer from "./components/sections/Footer";

function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const handleHoverService = (index: number | null) => {
    setHoveredService(index);
  };

  return (
    <>
      {!introCompleted ? (
        <OpeningSequence onComplete={() => setIntroCompleted(true)} />
      ) : (
        <div className="relative min-h-screen text-text-light selection:bg-electric-amber selection:text-deep-grid-navy overflow-x-hidden">
          
          {/* 1. Interactive 2D Lightning Cursor Trail */}
          <CursorTrail />

          {/* 2. Glassmorphism Header Navbar */}
          <Navbar />

          {/* 3. Hero Section (Wrapping background 3D Tower Canvas) */}
          <div className="relative w-full overflow-hidden isolate z-0">
            <TowerScene />
            <Hero />
          </div>

          {/* 4. Horizontal Auto-scroll Trust Bar */}
          <TrustBar />

          {/* 5. Services Section */}
          <Services hoveredService={hoveredService} onHoverService={handleHoverService} />

          {/* 6. About Legacy Section (Wraps 3D Substation inside) */}
          <About />

          {/* 7. Power Grid Stats Counters (Oscilloscope canvases inside) */}
          <Stats />

          {/* 8. Alternating Services Detail Layout (Vector blueprints inside) */}
          <ServicesDetail />

          {/* 9. Testimonials (3D Perspective carousel) */}
          <Testimonials />

          {/* 10. Careers (Floating apprentice cards) */}
          <Careers />

          {/* 11. Quote request CTA banner */}
          <CtaBanner />

          {/* 12. Footer information panel */}
          <Footer />

        </div>
      )}
    </>
  );
}

export default App;
