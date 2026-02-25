"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    PlusCircle,
    MoreHorizontal,
    Edit2,
    Trash2,
    Eye,
    ChevronDown,
} from "lucide-react";

// Mock Data
const INITIAL_LISTINGS = [
    {
        id: "seed_property_1",
        title: "Architectural Gem in Silver Lake",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
        price: "$1,875,000",
        status: "Active",
        details: "3 beds • 2 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_2",
        title: "Modern Townhome in Playa Vista",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
        price: "$1,650,000",
        status: "Active",
        details: "3 beds • 3 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_3",
        title: "Craftsman Bungalow in Pasadena",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
        price: "$975,000",
        status: "Active",
        details: "3 beds • 2 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_4",
        title: "Sleek West Hollywood Condo",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
        price: "$1,350,000",
        status: "Active",
        details: "2 beds • 2 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_5",
        title: "Spanish Colonial in Los Feliz",
        image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=400&q=80",
        price: "$3,450,000",
        status: "Pending",
        details: "5 beds • 4 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_6",
        title: "Mid-Century Modern in Hollywood Hills",
        image: "https://images.unsplash.com/photo-1600607687940-467f4b63030e?auto=format&fit=crop&w=400&q=80",
        price: "$2,850,000",
        status: "Active",
        details: "3 beds • 3 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_7",
        title: "Contemporary Santa Monica Beach House",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
        price: "$5,200,000",
        status: "Active",
        details: "4 beds • 4 baths",
        created: "Feb 5, 2026",
    },
    {
        id: "seed_property_8",
        title: "Luxurious Downtown Penthouse",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=400&q=80",
        price: "$3,950,000",
        status: "Active",
        details: "4 beds • 4 baths",
        created: "Feb 5, 2026",
    },
];

export default function MyListingsPage() {
    const [listings, setListings] = useState(INITIAL_LISTINGS);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this listing?")) {
            setListings(listings.filter((l) => l.id !== id));
            setOpenMenuId(null);
        }
    };

    return (
        <main className="p-8">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">My Listings</h1>
                    <p className="text-stone-400 text-sm mt-1">Manage your property listings</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-all shadow-sm">
                    <PlusCircle className="w-4 h-4" />
                    Add Listing
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-stone-50">
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Property</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-center">Status</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {listings.map((item) => (
                            <tr key={item.id} className="hover:bg-stone-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-stone-800 line-clamp-1">{item.title}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-stone-900">{item.price}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9f4] border border-[#dcfce7] text-[#166534] shadow-sm cursor-pointer hover:bg-[#dcfce7] transition-colors group/status">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${item.status === 'Pending' ? 'text-amber-700 bg-amber-50 border-amber-100' : ''}`}>
                                                {item.status}
                                            </span>
                                            <ChevronDown className="w-3 h-3 text-stone-400 group-hover/status:text-stone-600 transition-colors" />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-[12px] text-stone-500">{item.details}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-[12px] text-stone-400">{item.created}</p>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                        className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-600"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>

                                    {/* Action Menu */}
                                    {openMenuId === item.id && (
                                        <div className="absolute right-6 top-14 w-36 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <button
                                                onClick={() => router.push(`/dashboard/listings/edit/${item.id}`)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" /> Edit
                                            </button>
                                            <button
                                                onClick={() => router.push(`/properties/${item.id}`)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> View
                                            </button>
                                            <div className="h-[1px] bg-stone-50 my-1" />
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Click outside backdrop for menu */}
            {openMenuId && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenuId(null)}
                />
            )}
        </main>
    );
}
