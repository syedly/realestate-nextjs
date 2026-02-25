import AgentCTA from "@/components/AgentCTA";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <HowItWorks />
      <WhyChooseUs />
      <AgentCTA />
      <Footer />
    </main>
  );
}
