"use client";

import { useSaved } from "@/lib/SavedContext";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Maximize, Trash2 } from "lucide-react";

export default function SavedPage() {
    const { isSignedIn, isLoaded } = useUser();
    const { saved, toggleSaved } = useSaved();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-8 h-8 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-28 pb-16">
                {/* Page Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-6 h-6 text-[#8B5E3C] fill-[#8B5E3C]" />
                    <h1 className="text-2xl font-bold text-stone-900">Saved Listings</h1>
                    {saved.length > 0 && (
                        <span className="text-sm text-stone-400 ml-1">({saved.length})</span>
                    )}
                </div>

                {/* Not signed in */}
                {!isSignedIn && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mb-5">
                            <Heart className="w-9 h-9 text-[#8B5E3C]" />
                        </div>
                        <h2 className="text-xl font-semibold text-stone-800 mb-2">Sign in to see your saved listings</h2>
                        <p className="text-stone-400 text-sm mb-6 max-w-xs">
                            Create an account or sign in to save and track your favourite properties.
                        </p>
                        <Link
                            href="/"
                            className="px-5 py-2.5 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            Browse Properties
                        </Link>
                    </div>
                )}

                {/* Signed in but no saved properties */}
                {isSignedIn && saved.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mb-5">
                            <Heart className="w-9 h-9 text-[#8B5E3C]" />
                        </div>
                        <h2 className="text-xl font-semibold text-stone-800 mb-2">No saved listings yet</h2>
                        <p className="text-stone-400 text-sm mb-6 max-w-xs">
                            Tap the heart on any property to save it here for easy access later.
                        </p>
                        <Link
                            href="/properties"
                            className="px-5 py-2.5 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            Browse Properties
                        </Link>
                    </div>
                )}

                {/* Saved properties grid */}
                {isSignedIn && saved.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {saved.map((property) => (
                            <div
                                key={property.id}
                                className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Remove button */}
                                    <button
                                        onClick={() => toggleSaved(property)}
                                        title="Remove from saved"
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors group/btn"
                                    >
                                        <Trash2 className="w-4 h-4 text-stone-400 group-hover/btn:text-red-500 transition-colors" />
                                    </button>
                                    {/* Type badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-xs bg-white/90 backdrop-blur-sm text-[#8B5E3C] font-medium rounded-full px-2.5 py-0.5">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-lg font-bold text-stone-900 mb-0.5">{property.price}</p>
                                    <p className="text-sm text-stone-700 font-medium leading-tight mb-1 line-clamp-1">
                                        {property.title}
                                    </p>
                                    <p className="text-xs text-stone-400 flex items-center gap-1 mb-3">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        {property.city}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Bed className="w-3.5 h-3.5" />
                                            {property.beds} bd
                                        </span>
                                        <span className="text-stone-200">·</span>
                                        <span className="flex items-center gap-1">
                                            <Bath className="w-3.5 h-3.5" />
                                            {property.baths} ba
                                        </span>
                                        <span className="text-stone-200">·</span>
                                        <span className="flex items-center gap-1">
                                            <Maximize className="w-3.5 h-3.5" />
                                            {property.sqft.toLocaleString()} ft²
                                        </span>
                                    </div>

                                    {/* View button */}
                                    <Link
                                        href={`/properties/${property.id}`}
                                        className="block w-full text-center py-2 rounded-xl border border-[#8B5E3C] text-[#8B5E3C] text-xs font-medium hover:bg-[#8B5E3C] hover:text-white transition-colors"
                                    >
                                        View Property
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
