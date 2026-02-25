"use client";

import { ExternalLink, ChevronDown } from "lucide-react";

const LEADS = [
    {
        buyer: "Alex Rivera",
        email: "alex.r@musiclabel.com",
        phone: "(323) 555-6284",
        property: "Architectural Gem in Silver Lake",
        status: "New",
        date: "Feb 5, 2026, 11:27 AM",
    },
    {
        buyer: "Sarah Collins",
        email: "s.collins@familylaw.com",
        phone: "(626) 555-7412",
        property: "Craftsman Bungalow in Pasadena",
        status: "New",
        date: "Feb 5, 2026, 11:27 AM",
    },
    {
        buyer: "Michael Thompson",
        email: "m.thompson@oceanside.com",
        phone: "(858) 555-2468",
        property: "Contemporary Santa Monica Beach House",
        status: "New",
        date: "Feb 5, 2026, 11:27 AM",
    },
    {
        buyer: "Marcus Williams",
        email: "marcus.w@entertainmentmgmt.com",
        phone: "(323) 555-4567",
        property: "Elegant Beverly Hills Estate",
        status: "New",
        date: "Feb 5, 2026, 11:27 AM",
    },
    {
        buyer: "Ryan Mitchell",
        email: "ryan.m@creativemedia.com",
        phone: "(323) 555-7531",
        property: "Sleek West Hollywood Condo",
        status: "New",
        date: "Feb 4, 2026, 11:27 AM",
    },
    {
        buyer: "Emily Richardson",
        email: "emily.r@designstudio.com",
        phone: "(310) 555-8901",
        property: "Contemporary Santa Monica Beach House",
        status: "New",
        date: "Feb 4, 2026, 11:27 AM",
    },
    {
        buyer: "James Harrison",
        email: "james.harrison@gmail.com",
        phone: "(213) 555-1234",
        property: "Stunning Modern Villa with Ocean Views",
        status: "New",
        date: "Feb 4, 2026, 11:27 AM",
    },
    {
        buyer: "Michelle Davis",
        email: "michele.d@amazon.com",
        phone: "(206) 555-8246",
        property: "Modern Townhome in Playa Vista",
        status: "New",
        date: "Feb 3, 2026, 11:27 AM",
    },
    {
        buyer: "Christopher Lee",
        email: "chris.lee@architech.com",
        phone: "(213) 555-9753",
        property: "Mid-Century Modern in Hollywood Hills",
        status: "New",
        date: "Feb 3, 2026, 11:27 AM",
    },
    {
        buyer: "Amanda Foster",
        email: "amanda.foster@lawfirm.com",
        phone: "(213) 555-3456",
        property: "Luxurious Downtown Penthouse",
        status: "New",
        date: "Feb 3, 2026, 11:27 AM",
    },
    {
        buyer: "Thomas Anderson",
        email: "tom.anderson@caltech.edu",
        phone: "(626) 555-3698",
        property: "Craftsman Bungalow in Pasadena",
        status: "New",
        date: "Feb 2, 2026, 11:27 AM",
    },
    {
        buyer: "Sophia Martinez",
        email: "sophia.martinez@luxuryrealty.com",
        phone: "(323) 555-7890",
        property: "Elegant Beverly Hills Estate",
        status: "Contacted",
        date: "Feb 2, 2026, 11:27 AM",
    },
    {
        buyer: "Lisa Anderson",
        email: "lisa.a@filmproduction.com",
        phone: "(323) 555-1357",
        property: "Mid-Century Modern in Hollywood Hills",
        status: "Contacted",
        date: "Feb 1, 2026, 11:27 AM",
    },
    {
        buyer: "Kevin Nguyen",
        email: "k.nguyen@google.com",
        phone: "(310) 555-9517",
        property: "Modern Townhome in Playa Vista",
        status: "Contacted",
        date: "Jan 31, 2026, 11:27 AM",
    },
];

export default function LeadInboxPage() {
    return (
        <main className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-stone-900">Leads Inbox</h1>
                <p className="text-stone-400 text-sm mt-1">Manage inquiries from potential buyers</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-stone-50">
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Buyer</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Property</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-right">Status</th>
                            <th className="px-6 py-4 text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {LEADS.map((lead, idx) => (
                            <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-stone-800">{lead.buyer}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-[12px] text-stone-500">{lead.email}</p>
                                    <p className="text-[12px] text-stone-400 mt-0.5">{lead.phone}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 group cursor-pointer">
                                        <p className="text-[12px] text-stone-600 group-hover:text-[#8B5E3C] transition-colors line-clamp-1">
                                            {lead.property}
                                        </p>
                                        <ExternalLink className="w-3 h-3 text-stone-300 group-hover:text-[#8B5E3C] transition-colors flex-shrink-0" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8B5E3C]/5 text-[#8B5E3C] border border-[#8B5E3C]/10 transition-all hover:bg-[#8B5E3C]/10 cursor-pointer">
                                        <span className={`text-[10px] font-bold ${lead.status === "New" ? "text-indigo-600" : "text-amber-600"}`}>
                                            {lead.status === "New" ? "New" : "Contacted"}
                                        </span>
                                        <ChevronDown className="w-3 h-3 opacity-50" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <p className="text-[11px] text-stone-400 whitespace-nowrap">{lead.date}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
