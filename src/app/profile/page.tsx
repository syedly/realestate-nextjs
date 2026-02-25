"use client";

import { useUser } from "@clerk/nextjs";
import { Heart, Home, MapPin, Star, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const savedHomes = [
    {
        id: 1,
        title: "Modern Apartment in Downtown",
        location: "New York, NY",
        price: "$3,200/mo",
        beds: 2,
        baths: 2,
        sqft: "1,100",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=260&fit=crop",
        rating: 4.8,
    },
    {
        id: 2,
        title: "Cozy Suburban Home",
        location: "Austin, TX",
        price: "$2,800/mo",
        beds: 3,
        baths: 2,
        sqft: "1,450",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=260&fit=crop",
        rating: 4.6,
    },
    {
        id: 3,
        title: "Luxury Penthouse Suite",
        location: "Miami, FL",
        price: "$5,500/mo",
        beds: 3,
        baths: 3,
        sqft: "2,200",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=260&fit=crop",
        rating: 4.9,
    },
];

const stats = [
    { label: "Saved Homes", value: "12", icon: Heart },
    { label: "Properties Viewed", value: "48", icon: Home },
    { label: "Locations Explored", value: "7", icon: MapPin },
];

export default function ProfilePage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-8 h-8 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <Navbar />

            {/* Hero / Cover */}
            <div className="pt-16">
                <div className="h-48 bg-gradient-to-r from-[#8B5E3C] via-[#a57048] to-[#c49a6c] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-16">
                {/* Profile Header */}
                <div className="relative -mt-16 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="flex items-end gap-5">
                        {/* Avatar */}
                        <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-stone-200 flex-shrink-0">
                            {user?.imageUrl ? (
                                <img
                                    src={user.imageUrl}
                                    alt={user.fullName ?? "Profile"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-stone-600">
                                    {user?.firstName?.[0] ?? "U"}
                                </div>
                            )}
                        </div>

                        {/* Name & Email */}
                        <div className="pb-1">
                            <h1 className="text-2xl font-bold text-stone-900">
                                {user?.fullName ?? "Welcome!"}
                            </h1>
                            <p className="text-stone-500 text-sm mt-0.5">
                                {user?.primaryEmailAddress?.emailAddress ?? ""}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-[#8B5E3C] bg-[#8B5E3C]/10 px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 fill-current" /> Verified Member
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pb-1">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            Browse Homes
                        </Link>
                        <div className="scale-110">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 bg-[#8B5E3C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <stat.icon className="w-5 h-5 text-[#8B5E3C]" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                                <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-stone-900">Account Details</h2>
                        <button className="flex items-center gap-1.5 text-sm text-[#8B5E3C] hover:underline">
                            <Settings className="w-4 h-4" /> Manage via Clerk
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Full Name</p>
                            <p className="text-stone-800 font-medium">{user?.fullName ?? "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Email</p>
                            <p className="text-stone-800 font-medium">
                                {user?.primaryEmailAddress?.emailAddress ?? "—"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Member Since</p>
                            <p className="text-stone-800 font-medium">
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Account ID</p>
                            <p className="text-stone-800 font-medium text-xs truncate">{user?.id ?? "—"}</p>
                        </div>
                    </div>
                </div>

                {/* Saved Homes */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-stone-900">Saved Homes</h2>
                        <Link href="/properties" className="text-sm text-[#8B5E3C] hover:underline">
                            Browse more →
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {savedHomes.map((home) => (
                            <div
                                key={home.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow group"
                            >
                                <div className="relative overflow-hidden h-44">
                                    <img
                                        src={home.image}
                                        alt={home.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                                        <Heart className="w-4 h-4 text-[#8B5E3C] fill-[#8B5E3C]" />
                                    </button>
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-stone-700">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        {home.rating}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-stone-900 text-sm leading-tight mb-1">
                                        {home.title}
                                    </h3>
                                    <p className="text-xs text-stone-500 flex items-center gap-1 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        {home.location}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#8B5E3C] font-bold text-sm">{home.price}</span>
                                        <div className="flex items-center gap-2 text-xs text-stone-400">
                                            <span>{home.beds}bd</span>
                                            <span>·</span>
                                            <span>{home.baths}ba</span>
                                            <span>·</span>
                                            <span>{home.sqft} ft²</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
