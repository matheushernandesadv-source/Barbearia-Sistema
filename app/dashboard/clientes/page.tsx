import { ClientesClient } from "@/components/dashboard/ClientesClient";
import { getClients } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const clients = await getClients();
  return <ClientesClient clients={clients} />;
}
