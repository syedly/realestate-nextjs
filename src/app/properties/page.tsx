import PropertiesPageClient from "@/components/PropertiesPageClient";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; q?: string }>;
}) {
  const { city, q } = await searchParams;
  return <PropertiesPageClient searchQuery={city || q || ""} />;
}

