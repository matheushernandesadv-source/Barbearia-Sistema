import { prisma } from "@/lib/db";

function toNum(v: unknown): number {
  return v === null || v === undefined ? 0 : Number(v);
}

export async function getBarbers() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const barbers = await prisma.barber.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    include: {
      appointments: {
        where: { date: { gte: monthStart }, status: { in: ["confirmado", "em_atendimento"] } },
      },
    },
  });

  return barbers.map((b) => ({
    id: b.id,
    name: b.name,
    role: b.role,
    avatarInitials: b.avatarInitials,
    color: b.color,
    rating: Number(b.rating),
    revenueMonth: b.appointments.reduce((s, a) => s + toNum(a.price), 0),
    clientsMonth: new Set(b.appointments.map((a) => a.clientId)).size,
  }));
}

export async function getServices() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } });
  return services.map((s) => ({ ...s, price: toNum(s.price) }));
}

export async function getClients() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    include: { appointments: true, sales: { include: { items: true } } },
  });
  return clients.map((c) => {
    const visits = c.appointments.length;
    const totalSpent = c.sales.reduce((s, sale) => s + toNum(sale.total), 0);
    const lastVisit = c.appointments.length
      ? c.appointments.reduce((latest, a) => (a.date > latest ? a.date : latest), c.appointments[0].date)
      : c.createdAt;
    return {
      id: c.id,
      name: c.name,
      phone: c.phone,
      birthday: c.birthday ?? "",
      preference: c.preference ?? "",
      loyaltyPoints: c.loyaltyPoints,
      status: c.status,
      visits,
      totalSpent,
      lastVisit: lastVisit.toISOString(),
    };
  });
}

export async function getAppointmentsToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: { date: { gte: start, lte: end } },
    include: { client: true, service: true, barber: true },
    orderBy: { time: "asc" },
  });

  return appointments.map((a) => ({
    id: a.id,
    time: a.time,
    client: a.client.name,
    service: a.service.name,
    barberId: a.barberId,
    status: a.status,
    price: toNum(a.price),
  }));
}

export async function getWaitlist() {
  const entries = await prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" } });
  return entries.map((w) => ({
    id: w.id,
    client: w.clientName,
    service: w.service,
    preferredBarber: w.preferredBarber ?? "Qualquer",
    desiredWindow: w.desiredWindow,
  }));
}

export async function getProducts() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    stock: p.stock,
    min: p.minStock,
    cost: toNum(p.cost),
    price: toNum(p.price),
    expiry: p.expiry ? p.expiry.toISOString() : "",
  }));
}

export async function getReceivables() {
  const rows = await prisma.receivable.findMany({ orderBy: { dueDate: "asc" } });
  return rows.map((r) => ({ id: r.id, desc: r.description, due: r.dueDate.toISOString(), value: toNum(r.value), status: r.status }));
}

export async function getPayables() {
  const rows = await prisma.payable.findMany({ orderBy: { dueDate: "asc" } });
  return rows.map((p) => ({ id: p.id, desc: p.description, due: p.dueDate.toISOString(), value: toNum(p.value), status: p.status }));
}

export async function getCommissions() {
  const refMonth = new Date().toISOString().slice(0, 7);
  const rows = await prisma.commission.findMany({ where: { refMonth } });
  return rows.map((c) => ({
    barberId: c.barberId,
    service: toNum(c.service),
    product: toNum(c.product),
    bonus: toNum(c.bonus),
    total: toNum(c.total),
  }));
}

export async function getPlans() {
  const plans = await prisma.plan.findMany({
    orderBy: { price: "asc" },
    include: { _count: { select: { subscriptions: { where: { status: "ativo" } } } } },
  });
  return plans.map((p) => ({
    id: p.id,
    name: p.name,
    price: toNum(p.price),
    benefits: p.benefits,
    subscribers: p._count.subscriptions,
  }));
}

export async function getSubscriptions() {
  const subs = await prisma.subscription.findMany({
    include: { client: true, plan: true },
    orderBy: { nextBilling: "asc" },
  });
  return subs.map((s) => ({
    client: s.client.name,
    plan: s.plan.name,
    since: s.startedAt.toLocaleDateString("pt-BR"),
    renews: s.nextBilling.toLocaleDateString("pt-BR"),
    status: s.status,
  }));
}

export async function getTeamSchedule() {
  const shifts = await prisma.scheduleShift.findMany();
  const byBarber = new Map<string, Record<number, string>>();
  for (const s of shifts) {
    if (!byBarber.has(s.barberId)) byBarber.set(s.barberId, {});
    byBarber.get(s.barberId)![s.weekday] = s.shift;
  }
  return Array.from(byBarber.entries()).map(([barberId, days]) => ({
    barberId,
    mon: days[1] ?? "folga",
    tue: days[2] ?? "folga",
    wed: days[3] ?? "folga",
    thu: days[4] ?? "folga",
    fri: days[5] ?? "folga",
    sat: days[6] ?? "folga",
    sun: days[0] ?? "folga",
  }));
}

export async function getOwnerSummary() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const [appointmentsToday, salesToday, barbers] = await Promise.all([
    prisma.appointment.findMany({ where: { date: { gte: start, lte: end } } }),
    prisma.sale.findMany({ where: { createdAt: { gte: start, lte: end } }, include: { items: true } }),
    getBarbers(),
  ]);

  const revenueToday = salesToday.reduce((s, sale) => s + toNum(sale.total), 0) +
    appointmentsToday.filter((a) => a.status !== "cancelado" && a.status !== "falta").reduce((s, a) => s + toNum(a.price), 0);
  const clientsToday = new Set(appointmentsToday.map((a) => a.clientId)).size;
  const servicesSoldToday = appointmentsToday.filter((a) => a.status === "confirmado" || a.status === "em_atendimento").length;
  const productsSoldToday = salesToday.reduce((s, sale) => s + sale.items.filter((i) => i.productId).length, 0);
  const noShowsToday = appointmentsToday.filter((a) => a.status === "falta").length;

  return {
    revenueToday,
    clientsToday,
    servicesSoldToday,
    productsSoldToday,
    estimatedProfit: Math.round(revenueToday * 0.6),
    cashAvailable: revenueToday + 4950,
    topBarberToday: barbers.slice().sort((a, b) => b.revenueMonth - a.revenueMonth)[0]?.name ?? "—",
    noShowsToday,
  };
}

export async function getCashFlow() {
  const days: { day: string; entradas: number; saidas: number }[] = [];
  for (let i = 12; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);

    const [sales, payablesPaid] = await Promise.all([
      prisma.sale.findMany({ where: { createdAt: { gte: start, lte: end } } }),
      prisma.payable.findMany({ where: { status: "pago", dueDate: { gte: start, lte: end } } }),
    ]);

    const entradas = sales.reduce((s, sale) => s + toNum(sale.total), 0);
    const saidas = payablesPaid.reduce((s, p) => s + toNum(p.value), 0);

    days.push({
      day: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      entradas,
      saidas,
    });
  }
  return days;
}

export async function getRevenueByBarber() {
  const barbers = await getBarbers();
  return barbers.map((b) => ({ name: b.name.split(" ")[0], faturamento: b.revenueMonth }));
}

export async function getTopServices() {
  const grouped = await prisma.appointment.groupBy({
    by: ["serviceId"],
    where: { status: { in: ["confirmado", "em_atendimento"] } },
    _count: { serviceId: true },
  });
  const services = await prisma.service.findMany({ where: { id: { in: grouped.map((g) => g.serviceId) } } });
  return grouped
    .map((g) => ({
      name: services.find((s) => s.id === g.serviceId)?.name ?? "Serviço",
      value: g._count.serviceId,
    }))
    .sort((a, b) => b.value - a.value);
}

export async function getBusyHours() {
  const appointments = await prisma.appointment.findMany({
    where: { status: { in: ["confirmado", "em_atendimento"] } },
    select: { time: true },
  });
  const counts = new Map<string, number>();
  for (const a of appointments) {
    const hour = `${a.time.slice(0, 2)}h`;
    counts.set(hour, (counts.get(hour) ?? 0) + 1);
  }
  const max = Math.max(1, ...counts.values());
  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([hour, count]) => ({ hour, ocupacao: Math.round((count / max) * 100) }));
}
