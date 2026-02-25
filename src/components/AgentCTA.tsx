import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AgentCTA() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#6B7F5E] rounded-3xl p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-3">Are You a Real Estate Agent?</h2>
            <p className="text-green-100/80 text-sm leading-relaxed">
              Join our platform to list properties, connect with motivated buyers, and grow your
              business. Get started with our agent subscription today.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              asChild
              className="bg-[#8B5E3C] hover:bg-[#7a5234] text-white gap-2"
            >
              <Link href="/pricing">
                View Pricing Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
            >
              <Link href="/agent-dashboard">Go to Agent Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
