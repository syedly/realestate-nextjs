"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAgent } from "@/lib/AgentContext";
import { useUser, SignInButton } from "@clerk/nextjs";
import {
    Check,
    CreditCard,
    Home,
    Lock,
    Star,
    ChevronRight,
    BarChart2,
    Users,
    FileText,
    Headphones,
} from "lucide-react";

const FEATURES = [
    { icon: FileText, label: "Unlimited property listings" },
    { icon: Users, label: "Lead inbox & management" },
    { icon: Home, label: "Public agent profile" },
    { icon: Headphones, label: "Priority support" },
    { icon: BarChart2, label: "Professional agent dashboard" },
    { icon: Check, label: "Property status tracking" },
    { icon: BarChart2, label: "Analytics & insights" },
    { icon: Star, label: "Verified agent badge" },
];

export default function AgentsPage() {
    const { isSignedIn, user } = useUser();
    const { isAgent, subscribe } = useAgent();
    const router = useRouter();

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [country, setCountry] = useState("United States");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Format card number with spaces
    const formatCard = (v: string) =>
        v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

    // Format expiry MM/YY
    const formatExpiry = (v: string) => {
        const d = v.replace(/\D/g, "").slice(0, 4);
        return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;

        setError("");
        if (cardNumber.replace(/\s/g, "").length < 16) {
            setError("Please enter a valid card number.");
            return;
        }
        if (expiry.length < 5) {
            setError("Please enter a valid expiry date.");
            return;
        }
        if (cvc.length < 3) {
            setError("Please enter a valid CVC.");
            return;
        }

        setLoading(true);
        // Simulate payment processing
        await new Promise((r) => setTimeout(r, 1800));
        subscribe();
        setLoading(false);
        router.push("/dashboard");
    };

    // Already an agent
    if (isAgent) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
                <div className="w-16 h-16 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-[#8B5E3C] fill-[#8B5E3C]" />
                </div>
                <h1 className="text-2xl font-bold text-stone-900 mb-2">You&apos;re already an agent!</h1>
                <p className="text-stone-500 text-sm mb-6">Head to your dashboard to manage listings and leads.</p>
                <Link
                    href="/dashboard"
                    className="px-6 py-2.5 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-colors"
                >
                    Go to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5EFE8]">
            {/* Simple top nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#8B5E3C] rounded-lg flex items-center justify-center">
                            <Home className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-stone-800">Nestwell</span>
                    </Link>
                    <Link href="/" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
                        ← Back to Nestwell
                    </Link>
                </div>
            </nav>

            <div className="pt-24 pb-16 max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-stone-900 mb-3">Become a Real Estate Agent</h1>
                    <p className="text-stone-500 text-base max-w-lg mx-auto">
                        Upgrade to list properties, connect with buyers, and grow your business.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-10 max-w-2xl mx-auto">
                    {FEATURES.map((f) => (
                        <div key={f.label} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#8B5E3C]/15 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-[#8B5E3C]" />
                            </div>
                            <span className="text-sm text-stone-700">{f.label}</span>
                        </div>
                    ))}
                </div>

                {/* Checkout card */}
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                    {/* Plan summary */}
                    <div className="px-6 pt-6 pb-4 border-b border-stone-100">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-stone-400 uppercase tracking-wide">Plan</span>
                            <span className="text-xs text-stone-400 uppercase tracking-wide">Amount</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-stone-800">Agent</p>
                                <p className="text-xs text-stone-400">Only today</p>
                            </div>
                            <p className="font-semibold text-stone-800">$29.00</p>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-b border-stone-100 space-y-1.5 text-sm">
                        <div className="flex justify-between text-stone-500">
                            <span>Subtotal</span>
                            <span>$29.00</span>
                        </div>
                        <div className="flex justify-between font-semibold text-stone-800">
                            <span>Total Due Today</span>
                            <span>$29.00</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-6 py-5">
                        {!isSignedIn ? (
                            <div className="text-center py-4">
                                <p className="text-sm text-stone-500 mb-4">You need to be signed in to subscribe.</p>
                                <SignInButton mode="modal">
                                    <button className="w-full py-2.5 bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm font-medium rounded-xl transition-colors">
                                        Sign In to Continue
                                    </button>
                                </SignInButton>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Card number */}
                                <div>
                                    <label className="block text-xs text-stone-500 mb-1.5">Card number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="1234 1234 1234 1234"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCard(e.target.value))}
                                            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 pr-16"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                            <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                                                <CreditCard className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expiry + CVC */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1.5">Expiration date</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="MM / YY"
                                            value={expiry}
                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1.5">Security code</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="CVC"
                                            maxLength={4}
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30"
                                        />
                                    </div>
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-xs text-stone-500 mb-1.5">Country</label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 bg-white"
                                    >
                                        <option>United States</option>
                                        <option>United Arab Emirates</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Pakistan</option>
                                        <option>India</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                    </select>
                                </div>

                                {error && (
                                    <p className="text-xs text-red-500">{error}</p>
                                )}

                                {/* Disclaimer */}
                                <p className="text-[10px] text-stone-400 leading-relaxed">
                                    By providing your card information, you allow Nestwell to charge your card for future payments in accordance with their terms.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#8B5E3C] hover:bg-[#7a5234] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-3.5 h-3.5" />
                                            Pay $29.00
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
