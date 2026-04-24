
import ServiceDetailPage from "@/app/component/ServiceDetailPage";
import { services } from "@/data/services";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params; 

  const service = services.find((s) => s.slug === slug);

  if (!service) return notFound();

  return <ServiceDetailPage service={service} />;
}