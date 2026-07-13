import { PrismaClient } from "@prisma/client";
import {
  barbers,
  services,
  clients,
  appointmentsToday,
  waitlist,
  products,
  receivables,
  payables,
  commissions,
  plans,
  teamSchedule,
} from "../lib/mock-data";

const prisma = new PrismaClient();

function todayAt(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

async function main() {
  console.log("Seeding StudioBlack...");

  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.receivable.deleteMany();
  await prisma.payable.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.waitlistEntry.deleteMany();
  await prisma.scheduleShift.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.product.deleteMany();
  await prisma.client.deleteMany();
  await prisma.service.deleteMany();
  await prisma.barber.deleteMany();

  for (const b of barbers) {
    await prisma.barber.create({
      data: {
        id: b.id,
        name: b.name,
        role: b.role,
        avatarInitials: b.avatarInitials,
        color: b.color,
        rating: b.rating,
      },
    });
  }

  for (const s of services) {
    await prisma.service.create({
      data: { id: s.id, name: s.name, duration: s.duration, price: s.price },
    });
  }

  for (const c of clients) {
    await prisma.client.create({
      data: {
        id: c.id,
        name: c.name,
        phone: c.phone,
        birthday: c.birthday,
        preference: c.preference,
        loyaltyPoints: c.loyaltyPoints,
        status: c.status,
        createdAt: new Date(c.lastVisit),
      },
    });
  }

  const clientNameToId = new Map(clients.map((c) => [c.name, c.id]));
  let fallbackClientCounter = 0;
  for (const a of appointmentsToday) {
    let clientId = clientNameToId.get(a.client);
    if (!clientId) {
      fallbackClientCounter += 1;
      const walkIn = await prisma.client.create({
        data: {
          name: a.client,
          phone: "(11) 90000-000" + fallbackClientCounter,
          status: "ativo",
        },
      });
      clientId = walkIn.id;
    }
    const service = services.find((s) => s.name === a.service);
    await prisma.appointment.create({
      data: {
        date: todayAt(a.time),
        time: a.time,
        clientId,
        barberId: a.barberId,
        serviceId: service?.id ?? services[0].id,
        status: a.status,
        price: a.price,
      },
    });
  }

  for (const w of waitlist) {
    await prisma.waitlistEntry.create({
      data: {
        clientName: w.client,
        service: w.service,
        preferredBarber: w.preferredBarber,
        desiredWindow: w.desiredWindow,
      },
    });
  }

  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        sku: p.sku,
        stock: p.stock,
        minStock: p.min,
        cost: p.cost,
        price: p.price,
        expiry: new Date(p.expiry),
      },
    });
  }

  for (const r of receivables) {
    await prisma.receivable.create({
      data: {
        description: r.desc,
        dueDate: new Date(r.due),
        value: r.value,
        status: r.status,
      },
    });
  }

  for (const p of payables) {
    await prisma.payable.create({
      data: {
        description: p.desc,
        dueDate: new Date(p.due),
        value: p.value,
        status: p.status,
      },
    });
  }

  const refMonth = new Date().toISOString().slice(0, 7);
  for (const c of commissions) {
    await prisma.commission.create({
      data: {
        barberId: c.barberId,
        refMonth,
        service: c.service,
        product: c.product,
        bonus: c.bonus,
        total: c.total,
      },
    });
  }

  for (const p of plans) {
    await prisma.plan.create({
      data: { id: p.id, name: p.name, price: p.price, benefits: p.benefits },
    });
  }

  const subscriptionSeeds = [
    { clientId: "c1", planId: "pl2", status: "ativo" as const },
    { clientId: "c4", planId: "pl3", status: "ativo" as const },
    { clientId: "c6", planId: "pl1", status: "vencido" as const },
    { clientId: "c2", planId: "pl1", status: "ativo" as const },
  ];
  for (const s of subscriptionSeeds) {
    const nextBilling = new Date();
    nextBilling.setDate(nextBilling.getDate() + (s.status === "ativo" ? 5 : -8));
    await prisma.subscription.create({
      data: {
        clientId: s.clientId,
        planId: s.planId,
        status: s.status,
        nextBilling,
      },
    });
  }

  for (const row of teamSchedule) {
    const days: [string, number][] = [
      [row.mon, 1],
      [row.tue, 2],
      [row.wed, 3],
      [row.thu, 4],
      [row.fri, 5],
      [row.sat, 6],
      [row.sun, 0],
    ];
    for (const [shift, weekday] of days) {
      await prisma.scheduleShift.create({
        data: { barberId: row.barberId, weekday, shift },
      });
    }
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
