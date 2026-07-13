export const barbers = [
  { id: "b1", name: "Rafael Costa", role: "Barbeiro Sênior", avatarInitials: "RC", rating: 4.9, revenueMonth: 12480, clientsMonth: 96, color: "#d1a838" },
  { id: "b2", name: "Diego Alves", role: "Barbeiro Pleno", avatarInitials: "DA", rating: 4.8, revenueMonth: 10230, clientsMonth: 84, color: "#7dd3fc" },
  { id: "b3", name: "Marcos Lima", role: "Barbeiro Pleno", avatarInitials: "ML", rating: 4.7, revenueMonth: 8990, clientsMonth: 71, color: "#86efac" },
  { id: "b4", name: "Bruno Ferreira", role: "Barbeiro Júnior", avatarInitials: "BF", rating: 4.6, revenueMonth: 6120, clientsMonth: 58, color: "#f9a8d4" },
];

export const services = [
  { id: "s1", name: "Corte Clássico", duration: 40, price: 55 },
  { id: "s2", name: "Corte + Barba", duration: 60, price: 85 },
  { id: "s3", name: "Barba Terapia", duration: 30, price: 45 },
  { id: "s4", name: "Sobrancelha", duration: 15, price: 20 },
  { id: "s5", name: "Pigmentação", duration: 45, price: 70 },
  { id: "s6", name: "Platinado", duration: 90, price: 180 },
  { id: "s7", name: "Corte Infantil", duration: 30, price: 40 },
];

export const clients = [
  { id: "c1", name: "João Pedro Martins", phone: "(11) 98221-3345", visits: 24, lastVisit: "2026-07-08", totalSpent: 2340, birthday: "07-22", loyaltyPoints: 340, status: "ativo" as const, preference: "Corte degradê baixo, barba alinhada" },
  { id: "c2", name: "Lucas Andrade", phone: "(11) 99110-5521", visits: 18, lastVisit: "2026-07-11", totalSpent: 1890, birthday: "03-14", loyaltyPoints: 210, status: "ativo" as const, preference: "Corte social, sem máquina 0" },
  { id: "c3", name: "Felipe Souza", phone: "(11) 97722-8890", visits: 6, lastVisit: "2026-05-02", totalSpent: 480, birthday: "11-30", loyaltyPoints: 60, status: "inativo" as const, preference: "Navalhado nas laterais" },
  { id: "c4", name: "Gabriel Nogueira", phone: "(11) 98871-0023", visits: 31, lastVisit: "2026-07-12", totalSpent: 3120, birthday: "07-19", loyaltyPoints: 480, status: "ativo" as const, preference: "Platinado a cada 45 dias" },
  { id: "c5", name: "Thiago Ramos", phone: "(11) 96654-9021", visits: 3, lastVisit: "2026-06-20", totalSpent: 225, birthday: "09-05", loyaltyPoints: 25, status: "ativo" as const, preference: "Primeira visita — corte clássico" },
  { id: "c6", name: "André Barbosa", phone: "(11) 99823-7712", visits: 12, lastVisit: "2026-04-18", totalSpent: 960, birthday: "01-27", loyaltyPoints: 140, status: "inativo" as const, preference: "Corte + barba, gel matte" },
];

export const appointmentsToday = [
  { id: "a1", time: "09:00", client: "João Pedro Martins", service: "Corte + Barba", barberId: "b1", status: "confirmado" as const, price: 85 },
  { id: "a2", time: "09:30", client: "Lucas Andrade", service: "Corte Clássico", barberId: "b2", status: "confirmado" as const, price: 55 },
  { id: "a3", time: "10:00", client: "Gabriel Nogueira", service: "Platinado", barberId: "b1", status: "em_atendimento" as const, price: 180 },
  { id: "a4", time: "10:30", client: "Thiago Ramos", service: "Corte Clássico", barberId: "b3", status: "aguardando" as const, price: 55 },
  { id: "a5", time: "11:00", client: "Rodrigo Nunes", service: "Barba Terapia", barberId: "b4", status: "confirmado" as const, price: 45 },
  { id: "a6", time: "11:30", client: "Vitor Hugo", service: "Corte + Barba", barberId: "b2", status: "cancelado" as const, price: 85 },
  { id: "a7", time: "14:00", client: "Caio César", service: "Sobrancelha", barberId: "b3", status: "confirmado" as const, price: 20 },
  { id: "a8", time: "14:30", client: "Eduardo Melo", service: "Pigmentação", barberId: "b1", status: "aguardando" as const, price: 70 },
  { id: "a9", time: "15:00", client: "Renato Dias", service: "Corte Infantil", barberId: "b4", status: "falta" as const, price: 40 },
  { id: "a10", time: "16:00", client: "Otávio Prado", service: "Corte Clássico", barberId: "b3", status: "confirmado" as const, price: 55 },
];

export const waitlist = [
  { id: "w1", client: "Marcelo Tavares", service: "Corte + Barba", preferredBarber: "Rafael Costa", desiredWindow: "Hoje, à tarde" },
  { id: "w2", client: "Igor Fontes", service: "Platinado", preferredBarber: "Qualquer", desiredWindow: "Amanhã, manhã" },
];

export const cashFlow = [
  { day: "01/07", entradas: 2340, saidas: 680 },
  { day: "02/07", entradas: 1980, saidas: 420 },
  { day: "03/07", entradas: 2870, saidas: 590 },
  { day: "04/07", entradas: 3120, saidas: 710 },
  { day: "05/07", entradas: 2650, saidas: 480 },
  { day: "06/07", entradas: 1540, saidas: 320 },
  { day: "07/07", entradas: 2990, saidas: 640 },
  { day: "08/07", entradas: 3340, saidas: 820 },
  { day: "09/07", entradas: 2760, saidas: 510 },
  { day: "10/07", entradas: 3580, saidas: 690 },
  { day: "11/07", entradas: 3210, saidas: 560 },
  { day: "12/07", entradas: 3990, saidas: 900 },
  { day: "13/07", entradas: 1620, saidas: 240 },
];

export const receivables = [
  { id: "r1", desc: "Plano mensal — João Pedro Martins", due: "2026-07-15", value: 129, status: "pendente" as const },
  { id: "r2", desc: "Plano mensal — Gabriel Nogueira", due: "2026-07-15", value: 179, status: "pendente" as const },
  { id: "r3", desc: "Venda produtos — Lucas Andrade", due: "2026-07-13", value: 84, status: "pago" as const },
  { id: "r4", desc: "Plano mensal — André Barbosa", due: "2026-07-05", value: 129, status: "atrasado" as const },
];

export const payables = [
  { id: "p1", desc: "Aluguel do salão", due: "2026-07-20", value: 4200, status: "pendente" as const },
  { id: "p2", desc: "Fornecedor — produtos de barba", due: "2026-07-16", value: 890, status: "pendente" as const },
  { id: "p3", desc: "Energia elétrica", due: "2026-07-10", value: 610, status: "pago" as const },
  { id: "p4", desc: "Internet + telefonia", due: "2026-07-08", value: 220, status: "pago" as const },
];

export const products = [
  { id: "pr1", name: "Pomada Modeladora Matte", sku: "POM-001", stock: 4, min: 8, cost: 18, price: 39, expiry: "2027-02-01" },
  { id: "pr2", name: "Óleo para Barba Premium", sku: "OLB-002", stock: 12, min: 6, cost: 22, price: 48, expiry: "2027-05-01" },
  { id: "pr3", name: "Shampoo Anticaspa", sku: "SHA-003", stock: 3, min: 10, cost: 15, price: 32, expiry: "2026-12-01" },
  { id: "pr4", name: "Balm Pós-Barba", sku: "BAL-004", stock: 20, min: 8, cost: 14, price: 29, expiry: "2027-08-01" },
  { id: "pr5", name: "Cera Finalizadora", sku: "CER-005", stock: 9, min: 8, cost: 16, price: 34, expiry: "2027-01-01" },
];

export const commissions = [
  { barberId: "b1", service: 3120, product: 480, bonus: 200, total: 3800 },
  { barberId: "b2", service: 2560, product: 310, bonus: 100, total: 2970 },
  { barberId: "b3", service: 2245, product: 260, bonus: 0, total: 2505 },
  { barberId: "b4", service: 1530, product: 150, bonus: 50, total: 1730 },
];

export const plans = [
  { id: "pl1", name: "Plano Essencial", price: 129, benefits: "2 cortes/mês", subscribers: 34 },
  { id: "pl2", name: "Plano Completo", price: 179, benefits: "2 cortes + barba/mês", subscribers: 51 },
  { id: "pl3", name: "Plano Black", price: 249, benefits: "Ilimitado + 10% em produtos", subscribers: 19 },
];

export const revenueByBarber = barbers.map((b) => ({ name: b.name.split(" ")[0], faturamento: b.revenueMonth }));

export const topServices = [
  { name: "Corte + Barba", value: 142 },
  { name: "Corte Clássico", value: 118 },
  { name: "Barba Terapia", value: 76 },
  { name: "Platinado", value: 22 },
  { name: "Sobrancelha", value: 54 },
];

export const busyHours = [
  { hour: "09h", ocupacao: 62 },
  { hour: "10h", ocupacao: 78 },
  { hour: "11h", ocupacao: 85 },
  { hour: "14h", ocupacao: 70 },
  { hour: "15h", ocupacao: 88 },
  { hour: "16h", ocupacao: 95 },
  { hour: "17h", ocupacao: 90 },
  { hour: "18h", ocupacao: 74 },
];

export const campaigns = [
  { id: "cp1", name: "Aniversariantes de Julho", channel: "WhatsApp", audience: 41, status: "ativa" as const, sent: 41, opened: 33 },
  { id: "cp2", name: "Clientes inativos 45+ dias", channel: "WhatsApp", audience: 58, status: "agendada" as const, sent: 0, opened: 0 },
  { id: "cp3", name: "Indique um amigo — Julho", channel: "WhatsApp + App", audience: 210, status: "ativa" as const, sent: 210, opened: 152 },
];

export const teamSchedule = [
  { barberId: "b1", mon: "09-19", tue: "09-19", wed: "folga", thu: "09-19", fri: "09-19", sat: "09-17", sun: "folga" },
  { barberId: "b2", mon: "10-20", tue: "10-20", wed: "10-20", thu: "folga", fri: "10-20", sat: "09-17", sun: "folga" },
  { barberId: "b3", mon: "folga", tue: "09-19", wed: "09-19", thu: "09-19", fri: "09-19", sat: "09-17", sun: "folga" },
  { barberId: "b4", mon: "09-19", tue: "folga", wed: "09-19", thu: "09-19", fri: "09-19", sat: "09-17", sun: "10-15" },
];

export const ownerSummary = {
  revenueToday: 3990,
  clientsToday: 27,
  servicesSoldToday: 31,
  productsSoldToday: 9,
  estimatedProfit: 2380,
  cashAvailable: 8940,
  topBarberToday: "Rafael Costa",
  noShowsToday: 2,
};
