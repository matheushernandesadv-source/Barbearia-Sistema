import { AgendaClient } from "@/components/dashboard/AgendaClient";
import { getBarbers, getAppointmentsToday, getWaitlist } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const [barbers, appointmentsToday, waitlist] = await Promise.all([
    getBarbers(),
    getAppointmentsToday(),
    getWaitlist(),
  ]);

  return <AgendaClient barbers={barbers} appointmentsToday={appointmentsToday} waitlist={waitlist} />;
}
