import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
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
  return (
    <div className="min-h-screen bg-background text-text-light">
      {/* 2. Glassmorphism Header Navbar */}
      <Navbar />

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Rest of the Sections */}
      <TrustBar />
      <Services 
        hoveredService={null} 
        onHoverService={function (_index: number | null): void {
          throw new Error("Function not implemented.");
        }} 
      />
      <About />
      <Stats />
      <ServicesDetail />
      <Testimonials />
      <Careers />
      <CtaBanner />
      <Footer />
    </div>
  );
}

export default App;