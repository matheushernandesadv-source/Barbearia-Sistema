import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ink-900 bg-noise">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <MobileNav />
        {children}
      </div>
    </div>
  );
}
