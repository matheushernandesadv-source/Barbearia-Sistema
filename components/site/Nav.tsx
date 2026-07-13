import Link from "next/link";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-600/50 bg-ink-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center">
            <Scissors className="h-4.5 w-4.5 text-ink-900" size={18} />
          </div>
          <span className="font-display text-lg text-ink-50 tracking-wide">StudioBlack</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-200">
          <a href="#recursos" className="hover:text-gold-300 transition-colors">Recursos</a>
          <a href="#diferenciais" className="hover:text-gold-300 transition-colors">Diferenciais</a>
          <a href="#planos" className="hover:text-gold-300 transition-colors">Planos</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/dashboard" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Área do proprietário
          </Button>
          <Button href="/agendar" size="sm">Agendar horário</Button>
        </div>
      </div>
    </header>
  );
}
