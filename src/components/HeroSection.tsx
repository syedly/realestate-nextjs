"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin, Search } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = query.trim() ? `?city=${encodeURIComponent(query.trim())}` : "";
    router.push(`/properties${params}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="min-h-screen bg-[#F5EFE8] flex flex-col items-center justify-center px-6 pt-16">
      <div className="max-w-3xl w-full text-center flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/70 border border-stone-200 rounded-full px-4 py-1.5 text-sm text-stone-600">
          <Home className="w-3.5 h-3.5 text-[#8B5E3C]" />
          Perfect for First-Time Buyers
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-stone-800 leading-tight tracking-tight">
          Find Your{" "}
          <span className="text-[#8B5E3C]">Perfect Nest</span>
        </h1>

        {/* Subtitle */}
        <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
          Making your first home journey simple and stress-free. Browse curated
          properties, save your favorites, and connect with trusted agents.
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-xl gap-2 mt-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder="Enter city, neighborhood, or ZIP..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12 bg-white border-stone-200 rounded-lg text-stone-700 focus-visible:ring-[#8B5E3C]"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-[#8B5E3C] hover:bg-[#7a5234] text-white h-12 px-6 gap-2 rounded-lg"
          >
            <Search className="w-4 h-4" />
            Search Properties
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-4 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
            1,000+ Active Listings
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
            500+ Happy Homeowners
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
            50+ Trusted Agents
          </div>
        </div>
      </div>
    </section>
  );
}
