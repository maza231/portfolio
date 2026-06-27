import Grain from "@/components/Grain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Grain />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
