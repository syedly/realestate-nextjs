"use client";

import { Button } from "@/components/ui/button";
import { Home, Heart, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useSaved } from "@/lib/SavedContext";
import { useAgent } from "@/lib/AgentContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { saved } = useSaved();
  const { isAgent } = useAgent();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B5E3C] rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-stone-800">Nestwell</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/properties" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Browse Properties
          </Link>
          {isSignedIn && isAgent ? (
            <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-[#8B5E3C] font-medium hover:text-[#7a5234] transition-colors">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          ) : (
            <Link href="/agents" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Become an Agent
            </Link>
          )}
        </div>

        {/* Auth Area */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              {/* Heart / Saved button with badge */}
              <Link
                href="/saved"
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                title="Saved Listings"
              >
                <Heart className="w-5 h-5 text-stone-600 hover:text-[#8B5E3C] transition-colors" />
                {saved.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8B5E3C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {saved.length > 9 ? "9+" : saved.length}
                  </span>
                )}
              </Link>

              {/* Clerk user button (avatar + dropdown) */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-sm text-stone-600 hover:text-stone-900">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button className="bg-[#8B5E3C] hover:bg-[#7a5234] text-white text-sm px-5">
                  Get Started
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
