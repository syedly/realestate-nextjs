import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PropertyCard, { Property } from "./PropertyCard";

const FEATURED_PROPERTIES: Property[] = [
  {
    id: "seed_property_1",
    price: "$3,450,000",
    title: "Modern Hillside Estate with Bay Views",
    beds: 5,
    baths: 4,
    sqft: 4200,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: "seed_property_2",
    price: "$2,850,000",
    title: "Luxury Downtown Penthouse",
    beds: 3,
    baths: 3,
    sqft: 3100,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: "seed_property_3",
    price: "$1,275,000",
    title: "Charming Victorian in Capitol Hill",
    beds: 4,
    baths: 2,
    sqft: 2800,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: "seed_property_4",
    price: "$1,895,000",
    title: "Austin Hill Country Retreat",
    beds: 5,
    baths: 4,
    sqft: 4500,
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: "seed_property_5",
    price: "$1,650,000",
    title: "Oceanfront Condo in Miami Beach",
    beds: 2,
    baths: 2,
    sqft: 1450,
    location: "Miami Beach, FL",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: "seed_property_6",
    price: "$1,450,000",
    title: "Modern Mountain View Home",
    beds: 4,
    baths: 3,
    sqft: 3200,
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-[#F5EFE8] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-stone-800">Featured Properties</h2>
            <p className="text-stone-500 mt-1 text-sm">Hand-picked homes curated just for you</p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg px-4 py-2 hover:border-stone-400 transition-colors"
          >
            View All Properties
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
