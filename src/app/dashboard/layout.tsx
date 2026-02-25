"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    Star,
} from "lucide-react";
import { useEffect } from "react";

const NAV_ITEMS = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Listings", icon: List, href: "/dashboard/listings" },
    { label: "Add Listing", icon: PlusCircle, href: "/dashboard/add" },
    { label: "Lead Inbox", icon: Inbox, href: "/dashboard/leads" },
    { label: "Agent Profile", icon: User, href: "/dashboard/profile" },
    { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoaded, user } = useUser();
    const { isAgent, unsubscribe } = useAgent();
    const router = useRouter();
    const pathname = usePathname();

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
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive
                                    ? "bg-[#8B5E3C] text-white font-medium shadow-sm"
                                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-stone-400"}`} />
                                {item.label}
                            </Link>
                        );
                    })}
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
            <div className="ml-56 flex-1">
                {children}
            </div>
        </div>
    );
}
