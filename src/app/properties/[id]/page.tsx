import PropertyDetailClient from "@/components/PropertyDetailClient";

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PropertyDetailClient id={params.id} />;
}
