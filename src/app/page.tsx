import Navbar from "@/components/Navbar";
import ReadingProgress from "@/components/ReadingProgress";
import AmbientBackground from "@/components/AmbientBackground";
import Hero from "@/components/Hero";
import CodeTracesShowcase from "@/components/CodeTracesShowcase";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AmbientBackground />
      <ReadingProgress />
      <Navbar />
      <Hero />
      <Experience />
      <About />
      <Projects />
      <CodeTracesShowcase />
      <Achievements />
      <Skills />
      <BlogTeaser />
      <Contact />
      <Footer />
    </main>
  );
}
