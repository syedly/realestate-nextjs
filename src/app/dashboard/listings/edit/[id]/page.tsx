"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
    ChevronLeft,
    Upload,
    X,
    Plus,
    ChevronDown,
    MapPin,
    Check,
} from "lucide-react";

// Mock data for the specific property
const MOCK_PROPERTY = {
    title: "Architectural Gem in Silver Lake",
    description: "Striking contemporary architecture in the heart of Silver Lake. This unique home features dramatic angles, floor-to-ceiling windows, and an open floor plan that flows seamlessly to outdoor living spaces. The chef's kitchen includes custom cabinetry and premium appliances. Enjoy morning views of the reservoir and evening city lights from your private deck.",
    price: "1875000",
    type: "House",
    status: "Active",
    beds: "3",
    baths: "2",
    sqft: "1950",
    yearBuilt: "2017",
    address: "2567 Apex Ave, Los Angeles, CA, 90039",
    images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80",
    ],
    lat: 34.0844,
    lng: -118.2572,
};

const AMENITIES_LIST = [
    "Swimming Pool", "Garage", "Fitness Center / Gym", "Garden / Yard",
    "Fireplace", "Central Air Conditioning", "Hardwood Floors", "Washer / Dryer",
    "Dishwasher", "Balcony / Patio", "Parking", "Security System",
    "Smart Home Technology", "EV Charger", "Solar Panels", "Hot Tub / Spa",
    "Wine Cellar", "Home Theater", "Home Office", "Guest House / ADU",
    "Walk-in Closet", "Granite Countertops", "Stainless Steel Appliances", "Pet Friendly",
    "City View", "Ocean View", "Waterfront", "Mountain View"
];

const SELECTED_AMENITIES = ["Garage", "Fireplace", "Central Air Conditioning", "Hardwood Floors", "Balcony / Patio", "City View"];

export default function EditListingPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [formData, setFormData] = useState(MOCK_PROPERTY);
    const [amenities, setAmenities] = useState(SELECTED_AMENITIES);

    const toggleAmenity = (amenity: string) => {
        setAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleUpdate = () => {
        // Mock update logic
        alert("Listing updated successfully!");
        router.push("/dashboard/listings");
    };

    // Static map URL
    const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${formData.lng - 0.01}%2C${formData.lat - 0.005}%2C${formData.lng + 0.01}%2C${formData.lat + 0.005}&layer=mapnik&marker=${formData.lat}%2C${formData.lng}`;

    return (
        <main className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/listings"
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-4"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back to Listings
                </Link>
                <h1 className="text-2xl font-bold text-stone-900">Edit Listing</h1>
                <p className="text-stone-400 text-sm mt-1">Update your property details</p>
            </div>

            <div className="space-y-6">
                {/* Basic Information */}
                <Section title="Basic Information">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Property Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Property Type</label>
                                <div className="relative">
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all appearance-none"
                                    >
                                        <option>House</option>
                                        <option>Apartment</option>
                                        <option>Condo</option>
                                        <option>Townhouse</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Status</label>
                            <div className="relative">
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all appearance-none"
                                >
                                    <option>Active</option>
                                    <option>Pending</option>
                                    <option>Sold</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Property Images */}
                <Section title="Property Images">
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-5 h-5 text-[#8B5E3C]" />
                            </div>
                            <p className="text-sm font-medium text-stone-800">Drag & drop images here, or click to select</p>
                            <p className="text-xs text-stone-400 mt-1">3/10 images</p>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative w-32 h-24 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0 group">
                                    <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                                    <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm z-10">
                                        {idx + 1}
                                    </div>
                                    <button className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            <button className="w-32 h-24 rounded-xl border border-dashed border-stone-200 flex flex-col items-center justify-center gap-1 hover:bg-stone-50 transition-colors text-stone-400">
                                <Plus className="w-5 h-5" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider">Add More</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-stone-400 italic">Drag images to reorder. First image will be the main listing photo.</p>
                    </div>
                </Section>

                {/* Property Details */}
                <Section title="Property Details">
                    <div className="grid grid-cols-4 gap-4">
                        <DetailInput label="Bedrooms" value={formData.beds} onChange={(v) => setFormData({ ...formData, beds: v })} />
                        <DetailInput label="Bathrooms" value={formData.baths} onChange={(v) => setFormData({ ...formData, baths: v })} />
                        <DetailInput label="Square Feet" value={formData.sqft} onChange={(v) => setFormData({ ...formData, sqft: v })} />
                        <DetailInput label="Year Built" value={formData.yearBuilt} onChange={(v) => setFormData({ ...formData, yearBuilt: v })} />
                    </div>
                </Section>

                {/* Amenities */}
                <Section title="Amenities">
                    <div className="grid grid-cols-4 gap-y-3 gap-x-6">
                        {AMENITIES_LIST.map((amenity) => (
                            <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
                                <div
                                    onClick={() => toggleAmenity(amenity)}
                                    className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${amenities.includes(amenity)
                                            ? "bg-[#8B5E3C] border-[#8B5E3C]"
                                            : "bg-white border-stone-200 group-hover:border-[#8B5E3C]"
                                        }`}
                                >
                                    {amenities.includes(amenity) && <Check className="w-2.5 h-2.5 text-white" />}
                                </div>
                                <span className={`text-[12px] transition-colors ${amenities.includes(amenity) ? "text-stone-800 font-medium" : "text-stone-500 group-hover:text-stone-700"}`}>
                                    {amenity}
                                </span>
                            </label>
                        ))}
                    </div>
                </Section>

                {/* Property Address */}
                <Section title="Property Address">
                    <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Search Address</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
                            />
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <X className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 cursor-pointer hover:text-stone-600 transition-colors" />
                        </div>
                    </div>
                </Section>

                {/* Location on Map */}
                <Section title="Location on Map">
                    <div className="space-y-3">
                        <p className="text-xs text-stone-400">The map updates automatically when you select an address. You can also click to fine-tune the exact location.</p>
                        <div className="rounded-2xl overflow-hidden border border-stone-100 h-64 bg-stone-100 relative">
                            <iframe
                                src={mapSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Section>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 pb-12">
                    <button
                        onClick={() => router.push("/dashboard/listings")}
                        className="px-6 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-8 py-2.5 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98]"
                    >
                        Update Listing
                    </button>
                </div>
            </div>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-stone-800 mb-5">{title}</h2>
            {children}
        </div>
    );
}

function DetailInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
            />
        </div>
    );
}
