"use client";

import { Button } from "@/components/ui/button";
import { Home, Heart } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

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
          <Link href="/agents" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Become an Agent
          </Link>
        </div>

        {/* Auth Area */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              {/* Heart / Saved button */}
              <Link
                href="/profile"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                title="Saved Homes"
              >
                <Heart className="w-5 h-5 text-stone-600 hover:text-[#8B5E3C] transition-colors" />
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
