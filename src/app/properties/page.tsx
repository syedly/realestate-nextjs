import PropertiesPageClient from "@/components/PropertiesPageClient";

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { city?: string; q?: string };
}) {
  return <PropertiesPageClient searchQuery={searchParams.city || searchParams.q || ""} />;
}
