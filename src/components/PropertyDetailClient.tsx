"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSaved, SavedProperty } from "@/lib/SavedContext";
import { useUser, SignInButton } from "@clerk/nextjs";
import {
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Share2,
  User,
} from "lucide-react";

// ── Full property data ────────────────────────────────────────────────────────
const PROPERTIES: Record<string, {
  id: string;
  price: string;
  title: string;
  address: string;
  city: string;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  description: string;
  amenities: string[];
  images: string[];
  lat: number;
  lng: number;
  agent: {
    name: string;
    brokerage: string;
    avatar: string;
    bio: string;
    email: string;
    phone: string;
  };
}> = {
  seed_property_1: {
    id: "seed_property_1",
    price: "$3,450,000",
    title: "Modern Hillside Estate with Bay Views",
    address: "1234 Hillside Dr, San Francisco, CA 94114",
    city: "San Francisco, CA",
    type: "House",
    beds: 5,
    baths: 4,
    sqft: 4200,
    yearBuilt: 2020,
    description:
      "Perched high in the hills with sweeping bay views, this architectural masterpiece blends indoor and outdoor living seamlessly. Floor-to-ceiling glass walls frame the stunning panorama of the San Francisco Bay. The chef's kitchen features Miele appliances, custom cabinetry, and a large center island. The primary suite occupies the entire top floor with a spa-like bath and private terrace.",
    amenities: ["Pool", "Gym", "Parking", "Central AC", "Smart Home", "Rooftop Deck", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    lat: 37.7749,
    lng: -122.4194,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_2: {
    id: "seed_property_2",
    price: "$2,850,000",
    title: "Luxury Downtown Penthouse",
    address: "500 S Grand Ave PH1, Los Angeles, CA 90071",
    city: "Los Angeles, CA",
    type: "Apartment",
    beds: 3,
    baths: 3,
    sqft: 3100,
    yearBuilt: 2019,
    description:
      "Sky-high luxury in the heart of downtown Los Angeles. This extraordinary penthouse offers 360-degree city views from every room. Designed by award-winning architects, the open-plan living areas feature soaring 12-foot ceilings, wide-plank oak floors, and a seamless indoor-outdoor flow to the wraparound terrace.",
    amenities: ["Pool", "Gym", "Concierge", "Parking", "Smart Home", "Doorman", "Rooftop Deck"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    ],
    lat: 34.0522,
    lng: -118.2437,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_3: {
    id: "seed_property_3",
    price: "$1,275,000",
    title: "Charming Victorian in Capitol Hill",
    address: "204 10th Ave E, Seattle, WA 98102",
    city: "Seattle, WA",
    type: "House",
    beds: 4,
    baths: 2,
    sqft: 2800,
    yearBuilt: 1905,
    description:
      "A lovingly restored Victorian masterpiece in the heart of Capitol Hill. Original period details—ornate crown molding, bay windows, and a grand staircase—mingle with thoughtfully modern updates throughout. The chef's kitchen opens to a sunny breakfast nook overlooking the private rear garden.",
    amenities: ["Parking", "Central AC", "Garden", "Fireplace", "Basement", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    lat: 47.6219,
    lng: -122.3149,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_4: {
    id: "seed_property_4",
    price: "$1,895,000",
    title: "Austin Hill Country Retreat",
    address: "5678 Ranch Rd, Austin, TX 78746",
    city: "Austin, TX",
    type: "House",
    beds: 5,
    baths: 4,
    sqft: 4500,
    yearBuilt: 2018,
    description:
      "Escape to this stunning Hill Country sanctuary just minutes from downtown Austin. Set on 2 acres of lush terrain with panoramic hill views, this resort-style estate features an infinity pool, outdoor kitchen, and a detached guest house. The open main floor plan connects the great room, chef's kitchen, and dining area.",
    amenities: ["Pool", "Gym", "Parking", "Central AC", "Smart Home", "Guest House", "Outdoor Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
    lat: 30.2672,
    lng: -97.7431,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_5: {
    id: "seed_property_5",
    price: "$1,650,000",
    title: "Oceanfront Condo in Miami Beach",
    address: "1 Collins Ave #2104, Miami Beach, FL 33139",
    city: "Miami Beach, FL",
    type: "Condo",
    beds: 2,
    baths: 2,
    sqft: 1450,
    yearBuilt: 2021,
    description:
      "Wake up to ocean views every morning in this stunning oceanfront residence. This fully renovated condo features an open-plan layout with floor-to-ceiling impact windows framing unobstructed Atlantic Ocean views. The sleek chef's kitchen features waterfall quartz countertops and top-of-the-line Bosch appliances.",
    amenities: ["Pool", "Gym", "Concierge", "Parking", "Doorman", "Beach Access", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    lat: 25.7617,
    lng: -80.1918,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_6: {
    id: "seed_property_6",
    price: "$1,450,000",
    title: "Modern Mountain View Home",
    address: "789 Alpine Way, Denver, CO 80203",
    city: "Denver, CO",
    type: "House",
    beds: 4,
    baths: 3,
    sqft: 3200,
    yearBuilt: 2017,
    description:
      "Perched with commanding Rocky Mountain views, this stunning contemporary home combines architectural precision with warmth and livability. An open layout maximizes the mountain views from every room. The chef's kitchen includes a large island, custom cabinetry, and high-end appliances. The primary suite boasts a spa-inspired bath and mountain-view balcony.",
    amenities: ["Pool", "Gym", "Parking", "Central AC", "Smart Home", "Mountain View", "Fireplace"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    ],
    lat: 39.7392,
    lng: -104.9903,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_7: {
    id: "seed_property_7",
    price: "$1,195,000",
    title: "Marina District Flat",
    address: "2400 Chestnut St #3, San Francisco, CA 94123",
    city: "San Francisco, CA",
    type: "Apartment",
    beds: 2,
    baths: 1,
    sqft: 1150,
    yearBuilt: 2015,
    description:
      "Sophisticated flat in the heart of the Marina District. This beautifully renovated unit features hardwood floors throughout, an updated kitchen with quartz countertops and stainless appliances, and an open living and dining area. Steps from the Marina Green, world-class dining, and boutique shopping.",
    amenities: ["Parking", "Central AC", "Smart Home", "Doorman", "Bike Storage"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    lat: 37.8004,
    lng: -122.4361,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
  seed_property_8: {
    id: "seed_property_8",
    price: "$925,000",
    title: "Urban Loft in SoMa",
    address: "888 Brannan St #401, San Francisco, CA 94103",
    city: "San Francisco, CA",
    type: "Apartment",
    beds: 1,
    baths: 1,
    sqft: 1200,
    yearBuilt: 2010,
    description:
      "Cool industrial-chic loft in the vibrant SoMa neighborhood. Soaring 14-foot ceilings, exposed concrete, oversized windows, and polished concrete floors define this iconic live/work space. The open kitchen features custom Italian cabinetry, a gas range, and an oversized waterfall island.",
    amenities: ["Gym", "Parking", "Rooftop Deck", "Smart Home", "Bike Storage", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    lat: 37.7749,
    lng: -122.4056,
    agent: {
      name: "Sonny Sangha",
      brokerage: "PAPAFAM Brokerage",
      avatar: "SS",
      bio: "This is an awesome test. This is an amazing app. Wow, this is cool.",
      email: "sonny.sangha@gmail.com",
      phone: "0541234567",
    },
  },
};

// fallback for unknown ids
const DEFAULT_PROPERTY = PROPERTIES["seed_property_1"];

export default function PropertyDetailClient({ id }: { id: string }) {
  const property = PROPERTIES[id] ?? { ...DEFAULT_PROPERTY, id };
  const [currentImage, setCurrentImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const { isSignedIn } = useUser();
  const { isSaved, toggleSaved } = useSaved();
  const liked = isSaved(property.id);

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? property.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImage((i) => (i === property.images.length - 1 ? 0 : i + 1));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleHeart = () => {
    if (!isSignedIn) return;
    const savedProp: SavedProperty = {
      id: property.id,
      title: property.title,
      price: property.price,
      address: property.address,
      city: property.city,
      type: property.type,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      image: property.images[0],
    };
    toggleSaved(savedProp);
  };

  // Build static map URL using OpenStreetMap tile via a simple embed
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lng - 0.05}%2C${property.lat - 0.03}%2C${property.lng + 0.05}%2C${property.lat + 0.03}&layer=mapnik&marker=${property.lat}%2C${property.lng}`;

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-stone-600 transition-colors">Properties</Link>
          <span>›</span>
          <span className="text-stone-600 truncate max-w-xs">{property.title}</span>
        </div>

        {/* Main Grid: Left content + Right sidebar */}
        <div className="flex gap-8 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0">

            {/* Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-200 aspect-[16/10] mb-3">
              <Image
                src={property.images[currentImage]}
                alt={property.title}
                fill
                className="object-cover transition-opacity duration-300"
              />

              {/* Nav arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-stone-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-stone-700" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs rounded-md px-2 py-1 backdrop-blur-sm">
                {currentImage + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mb-6">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${currentImage === i ? "border-[#8B5E3C]" : "border-transparent"
                    }`}
                >
                  <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Price + Title + Heart + Share */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-3xl font-bold text-stone-800 mb-1">{property.price}</h1>
                <p className="text-stone-500 text-sm">{property.title}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {/* Share button */}
                <button
                  onClick={handleShare}
                  title={copied ? "Copied!" : "Copy link"}
                  className="w-9 h-9 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-stone-50 transition-colors relative group"
                >
                  <Share2 className="w-4 h-4 text-stone-500" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-stone-800 text-white px-2 py-0.5 rounded-md whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>

                {/* Heart button — only visible when signed in */}
                {isSignedIn && (
                  <button
                    onClick={handleHeart}
                    title={liked ? "Remove from saved" : "Save property"}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${liked
                        ? "border-[#8B5E3C] bg-[#8B5E3C]/10"
                        : "border-stone-200 bg-white hover:bg-stone-50"
                      }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${liked ? "text-[#8B5E3C] fill-[#8B5E3C]" : "text-stone-500"
                        }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Address + Type badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5" />
                {property.address}
              </div>
              <span className="text-xs bg-[#8B5E3C]/10 text-[#8B5E3C] font-medium rounded-full px-2.5 py-0.5">
                {property.type}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mb-7">
              {[
                { icon: Bed, value: property.beds, label: "Bedrooms" },
                { icon: Bath, value: property.baths, label: "Bathrooms" },
                { icon: Maximize, value: `${property.sqft.toLocaleString()}`, label: "Sq Ft" },
                { icon: Calendar, value: property.yearBuilt, label: "Year Built" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-4 border border-stone-100 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-bold text-stone-800">{value}</p>
                  <p className="text-xs text-stone-400">{label}</p>
                </div>
              ))}
            </div>

            {/* About This Property */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 mb-5">
              <h2 className="text-base font-semibold text-stone-800 mb-3">About This Property</h2>
              <p className="text-sm text-stone-500 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities & Features */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 mb-5">
              <h2 className="text-base font-semibold text-stone-800 mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-xs text-stone-600">
                    <Check className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="text-base font-semibold text-stone-800 mb-4">Location</h2>
              <div className="rounded-xl overflow-hidden border border-stone-100 h-56">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Property Location"
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="w-64 flex-shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
              {/* Agent Avatar + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {property.agent.avatar}
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{property.agent.name}</p>
                  <div className="flex items-center gap-1 text-xs text-stone-400 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {property.agent.brokerage}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-stone-500 leading-relaxed mb-4 border-t border-stone-100 pt-4">
                {property.agent.bio}
              </p>

              {/* Contact Details */}
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  {property.agent.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {property.agent.phone}
                </div>
              </div>

              {/* CTA Button — changes based on auth state */}
              {isSignedIn ? (
                <Button className="w-full bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-xs h-9 gap-2">
                  <User className="w-3.5 h-3.5" />
                  Contact Agent
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-xs h-9 gap-2">
                    <User className="w-3.5 h-3.5" />
                    Sign in to Contact
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
