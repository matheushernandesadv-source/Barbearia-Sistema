import { Nav } from "@/components/site/Nav";
import { Button } from "@/components/ui/Button";
import { plans } from "@/lib/mock-data";
import { formatBRL } from "@/lib/utils";
import {
  CalendarCheck2, Users, Wallet, Percent, Boxes, ShoppingCart, Repeat,
  BarChart3, Megaphone, UsersRound, Sparkles, MessageCircleMore, Smartphone,
  BrainCircuit, LineChart, ShieldCheck, Building2, CheckCircle2, Star, ArrowRight,
} from "lucide-react";

const featureGroups = [
  {
    icon: CalendarCheck2,
    title: "Agendamento",
    desc: "Agenda por barbeiro, agendamento online, lembretes automáticos e lista de espera.",
    items: ["Agenda por barbeiro", "Agendamento online", "Confirmação automática", "Lembretes por WhatsApp", "Lista de espera", "Bloqueio de horários"],
  },
  {
    icon: Users,
    title: "Clientes",
    desc: "Histórico completo, preferências e programa de fidelidade.",
    items: ["Histórico de atendimentos", "Fotos antes/depois", "Aniversário", "Frequência de visitas", "Programa de fidelidade"],
  },
  {
    icon: Wallet,
    title: "Financeiro",
    desc: "Fluxo de caixa, contas e DRE simplificada em tempo real.",
    items: ["Fluxo de caixa", "Contas a pagar e receber", "Fechamento diário", "DRE simplificada", "Metas de faturamento"],
  },
  {
    icon: Percent,
    title: "Comissões",
    desc: "Cálculo automático por barbeiro, serviço e produto vendido.",
    items: ["Comissão por barbeiro", "Comissão por serviço", "Comissão por produto", "Bonificações"],
  },
  {
    icon: Boxes,
    title: "Estoque",
    desc: "Controle total de produtos, validade e consumo interno.",
    items: ["Entrada e saída", "Aviso de estoque baixo", "Controle de validade", "Custo dos produtos"],
  },
  {
    icon: ShoppingCart,
    title: "Vendas (PDV)",
    desc: "Venda de serviços e produtos com qualquer forma de pagamento.",
    items: ["PIX, cartão, dinheiro, vale", "Emissão de recibo", "Cashback e descontos"],
  },
  {
    icon: Repeat,
    title: "Assinaturas",
    desc: "Planos mensais com cobrança recorrente e renovação automática.",
    items: ["Cobrança recorrente", "Controle de utilização", "Bloqueio em atraso"],
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    desc: "Indicadores completos de faturamento, clientes e equipe.",
    items: ["Faturamento por barbeiro", "Serviços mais vendidos", "Ticket médio", "Clientes inativos"],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Campanhas automáticas via WhatsApp e programa de indicação.",
    items: ["Campanhas por WhatsApp", "Mensagem de aniversário", "Cupons de desconto", "Indicações"],
  },
  {
    icon: UsersRound,
    title: "Gestão de equipe",
    desc: "Escala, metas, ranking e controle de ponto dos barbeiros.",
    items: ["Escala de trabalho", "Controle de férias", "Metas individuais", "Ranking mensal"],
  },
];

const differentiators = [
  { icon: BrainCircuit, title: "IA para prever horários vazios", desc: "Sugestão automática de promoções para preencher a agenda." },
  { icon: Sparkles, title: "Encaixe inteligente", desc: "Sugestão automática do melhor horário disponível para encaixes." },
  { icon: LineChart, title: "Dashboard em tempo real", desc: "Gráficos e indicadores atualizados a cada atendimento." },
  { icon: Smartphone, title: "App para o cliente", desc: "Agendamento em poucos cliques, direto do celular." },
  { icon: MessageCircleMore, title: "Integração com WhatsApp", desc: "Confirmações e lembretes automáticos, sem esforço manual." },
  { icon: ShieldCheck, title: "Assinatura digital de termos", desc: "Para procedimentos específicos, com validade jurídica." },
  { icon: Building2, title: "Múltiplas unidades", desc: "Painel para acompanhar indicadores de cada unidade separadamente." },
];

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-noise">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs text-gold-300">
                <Sparkles size={13} /> Sistema completo de gestão para barbearias
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink-50 mt-6 leading-[1.1]">
                A barbearia <span className="text-gradient-gold">StudioBlack</span> agora tem um sistema à altura do seu padrão
              </h1>
              <p className="text-ink-300 text-lg mt-6 max-w-2xl">
                Agende online, gerencie clientes, finanças, estoque, comissões e equipe em um único
                painel elegante e completo. Tudo o que a StudioBlack precisa para crescer com controle.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button href="/agendar" size="lg">
                  Agendar meu horário <ArrowRight size={16} />
                </Button>
                <Button href="/dashboard" variant="outline" size="lg">
                  Ver painel do proprietário
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-ink-400">
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="fill-gold-300 text-gold-300" /> 4.9 de avaliação
                </div>
                <div>+2.400 cortes realizados</div>
                <div>4 barbeiros especialistas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" className="border-t border-ink-600/50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl mb-14">
              <p className="text-gold-300 text-sm font-medium tracking-wide uppercase">Recursos</p>
              <h2 className="font-display text-3xl lg:text-4xl text-ink-50 mt-3">
                Um sistema, todos os módulos da sua operação
              </h2>
              <p className="text-ink-300 mt-4">
                Do agendamento ao fechamento de caixa — a StudioBlack roda sua barbearia em um único lugar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureGroups.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-ink-600/60 bg-ink-800/40 p-6 hover:border-gold-400/30 hover:bg-ink-800/70 transition-colors"
                >
                  <div className="h-11 w-11 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25 mb-4">
                    <f.icon size={20} className="text-gold-300" />
                  </div>
                  <h3 className="font-display text-lg text-ink-50">{f.title}</h3>
                  <p className="text-sm text-ink-400 mt-1.5 mb-4">{f.desc}</p>
                  <ul className="space-y-1.5">
                    {f.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-xs text-ink-300">
                        <CheckCircle2 size={13} className="text-gold-400/70 shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section id="diferenciais" className="border-t border-ink-600/50 py-20 lg:py-28 bg-ink-850/40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl mb-14">
              <p className="text-gold-300 text-sm font-medium tracking-wide uppercase">Diferenciais</p>
              <h2 className="font-display text-3xl lg:text-4xl text-ink-50 mt-3">
                O que poucos sistemas de barbearia oferecem
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {differentiators.map((d) => (
                <div key={d.title} className="flex gap-4 rounded-2xl border border-gold-400/15 bg-gradient-to-b from-gold-400/[0.04] to-transparent p-6">
                  <div className="h-10 w-10 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25 shrink-0">
                    <d.icon size={18} className="text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-ink-50 font-medium">{d.title}</h3>
                    <p className="text-sm text-ink-400 mt-1">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="border-t border-ink-600/50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl mb-14">
              <p className="text-gold-300 text-sm font-medium tracking-wide uppercase">Assinaturas</p>
              <h2 className="font-display text-3xl lg:text-4xl text-ink-50 mt-3">
                Planos mensais para clientes StudioBlack
              </h2>
              <p className="text-ink-300 mt-4">Cortes ilimitados ou recorrentes, com renovação automática e benefícios exclusivos.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {plans.map((p, i) => (
                <div
                  key={p.id}
                  className={`rounded-2xl border p-7 ${
                    i === 2 ? "border-gold-400/50 bg-gold-400/[0.04] shadow-gold" : "border-ink-600/60 bg-ink-800/40"
                  }`}
                >
                  {i === 2 && <Badge>Mais popular</Badge>}
                  <p className="text-ink-300 text-sm mt-2">{p.name}</p>
                  <p className="font-display text-4xl text-ink-50 mt-2">
                    {formatBRL(p.price)}
                    <span className="text-sm text-ink-400">/mês</span>
                  </p>
                  <p className="text-sm text-ink-300 mt-3">{p.benefits}</p>
                  <Button href="/agendar" variant={i === 2 ? "primary" : "secondary"} className="w-full mt-6">
                    Assinar agora
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-ink-600/50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
            <h2 className="font-display text-3xl lg:text-4xl text-ink-50">
              Pronto para elevar o nível da sua experiência?
            </h2>
            <p className="text-ink-300 mt-4">
              Agende seu horário em poucos cliques ou conheça o painel completo de gestão da StudioBlack.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Button href="/agendar" size="lg">Agendar horário</Button>
              <Button href="/dashboard" variant="outline" size="lg">Explorar painel de gestão</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-600/50 py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-400">
          <span>© 2026 StudioBlack. Todos os direitos reservados.</span>
          <span>Rua das Palmeiras, 245 · (11) 4002-8922</span>
        </div>
      </footer>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold-400/15 px-3 py-1 text-xs font-medium text-gold-300">
      {children}
    </span>
  );
}
