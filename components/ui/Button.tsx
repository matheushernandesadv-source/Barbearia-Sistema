import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-900 font-semibold hover:brightness-110 shadow-gold",
  secondary: "bg-ink-700 text-ink-50 hover:bg-ink-600 border border-ink-500/60",
  ghost: "text-ink-100 hover:bg-ink-700/60",
  outline: "border border-gold-400/50 text-gold-300 hover:bg-gold-400/10",
};

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 whitespace-nowrap",
    variantMap[variant],
    sizeMap[size],
    disabled && "opacity-40 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
