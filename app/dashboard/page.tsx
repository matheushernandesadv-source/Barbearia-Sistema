import { OwnerDashboardClient } from "@/components/dashboard/OwnerDashboardClient";
import { getBarbers, getAppointmentsToday, getCashFlow, getRevenueByBarber, getOwnerSummary } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function OwnerDashboard() {
  const [ownerSummary, appointmentsToday, barbers, cashFlow, revenueByBarber] = await Promise.all([
    getOwnerSummary(),
    getAppointmentsToday(),
    getBarbers(),
    getCashFlow(),
    getRevenueByBarber(),
  ]);

  return (
    <OwnerDashboardClient
      ownerSummary={ownerSummary}
      appointmentsToday={appointmentsToday}
      barbers={barbers}
      cashFlow={cashFlow}
      revenueByBarber={revenueByBarber}
    />
  );
}
