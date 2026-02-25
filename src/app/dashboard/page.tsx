"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAgent } from "@/lib/AgentContext";
import {
    Home,
    LayoutDashboard,
    List,
    PlusCircle,
    Inbox,
    User,
    CreditCard,
    PlusSquare,
    ChevronRight,
    TrendingUp,
    Star,
} from "lucide-react";
import { useEffect } from "react";

const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard", active: true },
    { label: "My Listings", icon: List, href: "/dashboard/listings" },
    { label: "Add Listing", icon: PlusCircle, href: "/dashboard/add" },
    { label: "Lead Inbox", icon: Inbox, href: "/dashboard/leads" },
    { label: "Agent Profile", icon: User, href: "/dashboard/profile" },
    { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];

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
    const { isAgent, unsubscribe } = useAgent();
    const router = useRouter();

    // Redirect non-agents away
    useEffect(() => {
        if (isLoaded && !isAgent) {
            router.push("/agents");
        }
    }, [isLoaded, isAgent, router]);

    if (!isLoaded || !isAgent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-8 h-8 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const firstName = user?.firstName ?? "Agent";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* ── SIDEBAR ── */}
            <aside className="w-56 flex-shrink-0 bg-white border-r border-stone-100 flex flex-col fixed top-0 left-0 bottom-0">
                {/* Back link */}
                <div className="px-4 pt-4 pb-2">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        Back to Nestwell
                    </Link>
                </div>

                {/* Brand */}
                <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Agent Dashboard</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Manage your listings and leads</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${item.active
                                    ? "bg-[#8B5E3C] text-white font-medium"
                                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                }`}
                        >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Billing note + cancel */}
                <div className="px-4 py-4 border-t border-stone-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-3.5 h-3.5 text-[#8B5E3C] fill-[#8B5E3C]" />
                        <span className="text-xs font-medium text-stone-700">Agent</span>
                        <span className="ml-auto text-xs text-stone-400">$29/mo</span>
                    </div>
                    <button
                        onClick={() => { unsubscribe(); router.push("/"); }}
                        className="text-[10px] text-stone-300 hover:text-red-400 transition-colors"
                    >
                        Cancel subscription
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="ml-56 flex-1 p-8">
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
        </div>
    );
}
