import { Heart, ShieldCheck, Users } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description: "Every property is verified by our team to ensure accuracy and quality.",
  },
  {
    icon: Users,
    title: "Trusted Agents",
    description: "Connect with experienced agents who specialize in helping first-time buyers.",
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description: "Save favorites, get recommendations, and track your home search journey.",
  },
];

const STATS = [
  { value: "500+", label: "Happy Homeowners" },
  { value: "1,000+", label: "Active Listings" },
  { value: "50+", label: "Trusted Agents" },
  { value: "4.9", label: "Average Rating" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F5EFE8] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-medium text-stone-500 border border-stone-300 inline-block rounded-full px-3 py-1 mb-4">
            Why Choose Nestwell
          </p>
          <h2 className="text-4xl font-bold text-stone-800 mb-4">
            Built for First-Time Homebuyers
          </h2>
          <p className="text-stone-500 mb-8 text-sm leading-relaxed max-w-md">
            We understand that buying your first home can be overwhelming. That's why
            we've designed Nestwell to make the process as simple and stress-free as possible.
          </p>

          <div className="flex flex-col gap-5">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-stone-200">
                  <Icon className="w-4 h-4 text-stone-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Stats Card */}
        <div className="bg-[#8B5E3C] rounded-3xl p-10 text-white">
          <h3 className="text-xl font-semibold mb-8">Trusted by Thousands</h3>
          <div className="grid grid-cols-2 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-5xl font-bold">{value}</p>
                <p className="text-sm text-amber-100/80 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
