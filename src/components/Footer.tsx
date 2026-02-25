"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Send } from "lucide-react";
import Link from "next/link";

const BROWSE_LINKS = [
  { label: "All Properties", href: "/properties" },
  { label: "Houses", href: "/properties?type=house" },
  { label: "Apartments", href: "/properties?type=apartment" },
  { label: "Condos", href: "/properties?type=condo" },
  { label: "Townhouses", href: "/properties?type=townhouse" },
];

const AGENT_LINKS = [
  { label: "Become an Agent", href: "/agents" },
  { label: "Agent Dashboard", href: "/agent-dashboard" },
  { label: "Manage Listings", href: "/manage-listings" },
  { label: "Lead Inbox", href: "/leads" },
];

const ACCOUNT_LINKS = [
  { label: "Saved Properties", href: "/saved" },
  { label: "My Profile", href: "/profile" },
  { label: "Sign In", href: "/sign-in" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5EFE8] border-t border-stone-200 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#8B5E3C] rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-stone-800">Nestwell</span>
          </Link>
          <p className="text-xs text-stone-500 leading-relaxed mb-6">
            Making your first home journey simple and stress-free. Find your perfect
            nest with trusted agents and curated listings.
          </p>
          <p className="text-xs font-medium text-stone-700 mb-2">Stay Updated</p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your email..."
              className="text-xs h-9 bg-white border-stone-200 focus-visible:ring-[#8B5E3C]"
            />
            <Button
              size="sm"
              className="bg-[#8B5E3C] hover:bg-[#7a5234] text-white h-9 w-9 p-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Browse */}
        <div>
          <h4 className="text-sm font-semibold text-stone-800 mb-4">Browse</h4>
          <ul className="flex flex-col gap-2.5">
            {BROWSE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-stone-500 hover:text-stone-800 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Agents */}
        <div>
          <h4 className="text-sm font-semibold text-stone-800 mb-4">For Agents</h4>
          <ul className="flex flex-col gap-2.5">
            {AGENT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-stone-500 hover:text-stone-800 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-sm font-semibold text-stone-800 mb-4">Account</h4>
          <ul className="flex flex-col gap-2.5">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-stone-500 hover:text-stone-800 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-stone-200 flex items-center justify-between">
        <p className="text-xs text-stone-400">© 2026 Nestwell. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
