"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
    PlusCircle,
    Inbox,
    List,
    PlusSquare,
    ChevronRight,
    TrendingUp,
    Home,
} from "lucide-react";

const QUICK_ACTIONS = [
    {
        icon: PlusSquare,
        label: "Create New Listing",
        desc: "Add a new property to your portfolio",
        href: "/dashboard/add",
    },
    {
        icon: List,
        label: "View All Listings",
        desc: "Manage your property listings",
        href: "/dashboard/listings",
    },
    {
        icon: Inbox,
        label: "View Lead Inbox",
        desc: "Respond to buyer inquiries",
        href: "/dashboard/leads",
    },
];

export default function DashboardPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    const firstName = user?.firstName ?? "Agent";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
        <main className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">
                        {greeting}, {firstName}!
                    </h1>
                    <p className="text-stone-400 text-sm mt-1">Here&apos;s an overview of your activity.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-colors">
                    <PlusCircle className="w-4 h-4" />
                    Add New Listing
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 mb-8">
                {[
                    { label: "Active properties", value: 0, badge: "LISTINGS", icon: Home },
                    { label: "Total inquiries", value: 0, badge: "LEADS", icon: Inbox },
                    { label: "Awaiting response", value: 0, badge: "NEW", icon: TrendingUp },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className="w-5 h-5 text-stone-300" />
                            <span className="text-[10px] font-semibold text-stone-300 tracking-widest">
                                {stat.badge}
                            </span>
                        </div>
                        <p className="text-4xl font-bold text-stone-800 mb-1">{stat.value}</p>
                        <p className="text-xs text-stone-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Bottom grid */}
            <div className="grid grid-cols-2 gap-5">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-stone-50">
                        <h2 className="text-sm font-semibold text-stone-800">Quick Actions</h2>
                    </div>
                    <div className="divide-y divide-stone-50">
                        {QUICK_ACTIONS.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-stone-100 group-hover:bg-[#8B5E3C]/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                    <action.icon className="w-4 h-4 text-stone-500 group-hover:text-[#8B5E3C] transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-stone-800">{action.label}</p>
                                    <p className="text-xs text-stone-400 mt-0.5">{action.desc}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors flex-shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Lead inbox / All Caught Up */}
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-stone-50">
                        <h2 className="text-sm font-semibold text-stone-800">Lead Inbox</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-3">
                            <Inbox className="w-5 h-5 text-stone-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-stone-800 mb-1">All Caught Up!</h3>
                        <p className="text-xs text-stone-400 mb-5 max-w-xs leading-relaxed">
                            You have no pending leads. Keep your listings updated to attract more buyers.
                        </p>
                        <Link
                            href="/dashboard/listings"
                            className="flex items-center gap-1.5 text-sm text-[#8B5E3C] hover:underline font-medium"
                        >
                            Review Listings <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
