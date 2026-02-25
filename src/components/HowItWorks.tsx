import { Heart, Search, Users } from "lucide-react";

const STEPS = [
  {
    step: "Step 1",
    icon: Search,
    title: "Search Properties",
    description:
      "Browse our curated catalog with advanced filters, map view, and neighborhood insights.",
  },
  {
    step: "Step 2",
    icon: Heart,
    title: "Save Favorites",
    description:
      "Save properties you love and compare them side by side to find your perfect match.",
  },
  {
    step: "Step 3",
    icon: Users,
    title: "Connect with Agents",
    description:
      "Reach out to trusted agents, schedule viewings, and get expert guidance throughout your journey.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-stone-800 mb-3">How Nestwell Works</h2>
        <p className="text-stone-500 text-base max-w-xl mx-auto mb-14">
          Finding your first home has never been easier. Follow these simple steps to start your journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map(({ step, icon: Icon, title, description }) => (
            <div key={step} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                <Icon className="w-7 h-7 text-stone-700" />
              </div>
              <span className="text-xs font-medium text-stone-400 uppercase tracking-widest">{step}</span>
              <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
