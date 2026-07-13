import { VendasClient } from "@/components/dashboard/VendasClient";
import { getServices, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function VendasPage() {
  const [services, products] = await Promise.all([getServices(), getProducts()]);
  return <VendasClient services={services} products={products} />;
}
