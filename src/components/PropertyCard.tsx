import { Bath, Bed, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Property {
  id: string;
  price: string;
  title: string;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  image: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-stone-800 mb-1">{property.price}</p>
        <p className="text-sm text-stone-500 mb-3">{property.title}</p>
        <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.beds}</span>
          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.baths}</span>
          <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {property.sqft.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-stone-500">
          <MapPin className="w-3.5 h-3.5" />
          {property.location}
        </div>
      </div>
    </Link>
  );
}
