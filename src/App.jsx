import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/sections/HeroSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import TextInput from "./components/input/TextInput";
import Footer from "./components/sections/Footer";

const AchievementSection = lazy(() =>
  import("./components/sections/AchievementSection")
);

const App = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <Suspense
          fallback={
            <section
              id="achievements"
              className="min-h-[50vh] animate-pulse bg-gray-100 py-24 px-6 dark:bg-gray-900"
              aria-busy="true"
              aria-label="Loading achievements"
            />
          }
        >
          <AchievementSection />
        </Suspense>
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
