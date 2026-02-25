"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bath,
  Bed,
  ChevronDown,
  Filter,
  LayoutGrid,
  Map,
  MapPin,
  Maximize,
  Search,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── All seed properties ────────────────────────────────────────────────────
const ALL_PROPERTIES = [
  {
    id: "seed_property_1",
    price: "$3,450,000",
    priceNum: 3450000,
    title: "Modern Hillside Estate with Bay Views",
    beds: 5,
    baths: 4,
    sqft: 4200,
    city: "San Francisco",
    location: "San Francisco, CA",
    type: "house",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "seed_property_2",
    price: "$2,850,000",
    priceNum: 2850000,
    title: "Luxury Downtown Penthouse",
    beds: 3,
    baths: 3,
    sqft: 3100,
    city: "Los Angeles",
    location: "Los Angeles, CA",
    type: "apartment",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: "seed_property_3",
    price: "$1,275,000",
    priceNum: 1275000,
    title: "Charming Victorian in Capitol Hill",
    beds: 4,
    baths: 2,
    sqft: 2800,
    city: "Seattle",
    location: "Seattle, WA",
    type: "house",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: "seed_property_4",
    price: "$1,895,000",
    priceNum: 1895000,
    title: "Austin Hill Country Retreat",
    beds: 5,
    baths: 4,
    sqft: 4500,
    city: "Austin",
    location: "Austin, TX",
    type: "house",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: "seed_property_5",
    price: "$1,650,000",
    priceNum: 1650000,
    title: "Oceanfront Condo in Miami Beach",
    beds: 2,
    baths: 2,
    sqft: 1450,
    city: "Miami Beach",
    location: "Miami Beach, FL",
    type: "condo",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: "seed_property_6",
    price: "$1,450,000",
    priceNum: 1450000,
    title: "Modern Mountain View Home",
    beds: 4,
    baths: 3,
    sqft: 3200,
    city: "Denver",
    location: "Denver, CO",
    type: "house",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "seed_property_7",
    price: "$1,195,000",
    priceNum: 1195000,
    title: "Marina District Flat",
    beds: 2,
    baths: 1,
    sqft: 1150,
    city: "San Francisco",
    location: "San Francisco, CA",
    type: "apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: "seed_property_8",
    price: "$925,000",
    priceNum: 925000,
    title: "Urban Loft in SoMa",
    beds: 1,
    baths: 1,
    sqft: 1200,
    city: "San Francisco",
    location: "San Francisco, CA",
    type: "apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
];

const PROPERTY_TYPES = ["All Types", "House", "Apartment", "Condo", "Townhouse"];
const BED_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];
const BATH_OPTIONS = ["Any", "1", "2", "3", "4+"];

interface Props {
  searchQuery: string;
}

export default function PropertiesPageClient({ searchQuery }: Props) {
  const [location, setLocation] = useState(searchQuery);
  const [propertyType, setPropertyType] = useState("All Types");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [view, setView] = useState<"grid" | "map">("grid");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  // Applied filter state (only updates on Apply)
  const [appliedFilters, setAppliedFilters] = useState({
    location: searchQuery,
    propertyType: "All Types",
    minPrice: "",
    maxPrice: "",
    beds: "Any",
    baths: "Any",
  });

  const handleApply = () => {
    setAppliedFilters({ location, propertyType, minPrice, maxPrice, beds, baths });
  };

  const filtered = useMemo(() => {
    return ALL_PROPERTIES.filter((p) => {
      // Location
      if (
        appliedFilters.location &&
        !p.city.toLowerCase().includes(appliedFilters.location.toLowerCase()) &&
        !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase()) &&
        !p.title.toLowerCase().includes(appliedFilters.location.toLowerCase())
      )
        return false;

      // Type
      if (
        appliedFilters.propertyType !== "All Types" &&
        p.type !== appliedFilters.propertyType.toLowerCase()
      )
        return false;

      // Min price
      if (appliedFilters.minPrice && p.priceNum < Number(appliedFilters.minPrice))
        return false;

      // Max price
      if (appliedFilters.maxPrice && p.priceNum > Number(appliedFilters.maxPrice))
        return false;

      // Beds
      if (appliedFilters.beds !== "Any") {
        const minBeds = appliedFilters.beds === "5+" ? 5 : Number(appliedFilters.beds);
        if (p.beds < minBeds) return false;
      }

      // Baths
      if (appliedFilters.baths !== "Any") {
        const minBaths = appliedFilters.baths === "4+" ? 4 : Number(appliedFilters.baths);
        if (p.baths < minBaths) return false;
      }

      return true;
    });
  }, [appliedFilters]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#F5EFE8]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-stone-600">Properties</span>
        </div>

        <h1 className="text-3xl font-bold text-stone-800">Browse Properties</h1>
        <p className="text-stone-500 text-sm mt-1">Find your perfect nest from our curated selection</p>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-16 flex gap-6 items-start">
        {/* ── Sidebar Filters ── */}
        <aside className="w-64 flex-shrink-0 bg-white rounded-2xl p-5 border border-stone-100 sticky top-20">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="w-4 h-4 text-stone-500" />
            <span className="font-semibold text-stone-800 text-sm">Filters</span>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="text-xs font-medium text-stone-600 mb-1.5 block">Location</label>
            <Input
              placeholder="City or ZIP code..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-9 text-xs border-stone-200 focus-visible:ring-[#8B5E3C]"
            />
          </div>

          {/* Property Type */}
          <div className="mb-4">
            <label className="text-xs font-medium text-stone-600 mb-1.5 block">Property Type</label>
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full h-9 text-xs rounded-md border border-stone-200 bg-white px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] text-stone-700"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="text-xs font-medium text-stone-600 mb-1.5 block">Price Range</label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min..."
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-9 text-xs border-stone-200 focus-visible:ring-[#8B5E3C]"
              />
              <span className="text-stone-400 text-xs">–</span>
              <Input
                placeholder="Max..."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-9 text-xs border-stone-200 focus-visible:ring-[#8B5E3C]"
              />
            </div>
          </div>

          {/* Beds & Baths */}
          <div className="mb-4 flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-stone-600 mb-1.5 block">Bedrooms</label>
              <div className="relative">
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full h-9 text-xs rounded-md border border-stone-200 bg-white px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] text-stone-700"
                >
                  {BED_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-stone-600 mb-1.5 block">Bathrooms</label>
              <div className="relative">
                <select
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-full h-9 text-xs rounded-md border border-stone-200 bg-white px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] text-stone-700"
                >
                  {BATH_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* More Filters */}
          <button
            onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
            className="w-full flex items-center justify-between text-xs text-stone-600 border border-stone-200 rounded-md px-3 h-9 hover:bg-stone-50 transition-colors mb-4"
          >
            <span>More Filters</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreFiltersOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Apply Button */}
          <Button
            onClick={handleApply}
            className="w-full bg-[#8B5E3C] hover:bg-[#7a5234] text-white h-9 text-xs gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            Apply Filters
          </Button>
        </aside>

        {/* ── Results Area ── */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-semibold text-stone-800 text-sm">
                {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Showing filtered results</p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === "grid"
                    ? "bg-[#8B5E3C] text-white"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid View
              </button>
              <button
                onClick={() => setView("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === "map"
                    ? "bg-[#8B5E3C] text-white"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Map View
              </button>
            </div>
          </div>

          {/* Property Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-stone-100">
              <p className="text-stone-400 text-sm">No properties found matching your filters.</p>
              <button
                onClick={() => {
                  setLocation("");
                  setPropertyType("All Types");
                  setMinPrice("");
                  setMaxPrice("");
                  setBeds("Any");
                  setBaths("Any");
                  setAppliedFilters({ location: "", propertyType: "All Types", minPrice: "", maxPrice: "", beds: "Any", baths: "Any" });
                }}
                className="mt-3 text-xs text-[#8B5E3C] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/properties/${p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow duration-300 block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-bold text-stone-800 mb-0.5">{p.price}</p>
                    <p className="text-xs text-stone-500 mb-3 leading-snug">{p.title}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5" /> {p.beds}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5" /> {p.baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5" /> {p.sqft.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {p.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
