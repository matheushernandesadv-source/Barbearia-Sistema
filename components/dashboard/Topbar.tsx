import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 lg:px-8 h-20 border-b border-ink-600/60 bg-ink-900/70 backdrop-blur sticky top-0 z-10">
      <div>
        <h1 className="font-display text-xl lg:text-2xl text-ink-50">{title}</h1>
        {subtitle && <p className="text-sm text-ink-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-ink-600/70 bg-ink-800/60 px-4 py-2 text-sm text-ink-400 w-64">
          <Search size={15} />
          <span>Buscar...</span>
        </div>
        <button className="h-10 w-10 rounded-full border border-ink-600/70 bg-ink-800/60 flex items-center justify-center text-ink-300 hover:text-gold-300 transition-colors relative">
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-gold-400" />
        </button>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center text-ink-900 font-semibold text-sm">
          MH
        </div>
      </div>
    </div>
  );
}
