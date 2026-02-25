import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SavedProvider } from "@/lib/SavedContext";
import { AgentProvider } from "@/lib/AgentContext";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nestwell - Find Your Perfect Nest",
  description: "Making your first home journey simple and stress-free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={geist.className}>
          <SavedProvider><AgentProvider>{children}</AgentProvider></SavedProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
