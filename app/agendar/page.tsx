import { AgendarClient } from "@/components/site/AgendarClient";
import { getBarbers, getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AgendarPage() {
  const [barbers, services] = await Promise.all([getBarbers(), getServices()]);
  return <AgendarClient barbers={barbers} services={services} />;
}
