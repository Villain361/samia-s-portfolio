import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";
import { Certificates } from "@/components/Certificates";
import { Blogs } from "@/components/Blogs";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MusicToggle } from "@/components/MusicToggle";

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Achievements />
      <Certificates />
      <Blogs />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <MusicToggle />
    </main>
  );
}

export default App;