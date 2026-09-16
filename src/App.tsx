import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CateringSection from "./components/CateringSection";
import LocationSection from "./components/LocationSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";

export default function App() {
  const handleNavigate = (page: string) => {
    const sectionIds: Record<string, string> = {
      menu: "menu",
      catering: "catering",
      contact: "location",
      location: "location",
      about: "about",
    };

    if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = sectionIds[page];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    document.title = "The Outback F&B Service — Fresh Food. Big Flavour.";
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <Header onNavigate={handleNavigate} currentPage="home" />
      <Hero onNavigate={handleNavigate} currentPage="home" />
      <MenuPage />
      <CateringSection />
      <LocationSection />
      <AboutSection />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
