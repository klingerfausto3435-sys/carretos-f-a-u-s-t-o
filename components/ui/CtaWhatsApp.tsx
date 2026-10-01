"use client";

import { whatsappUrl, whatsappUrlWithText, type ServiceKey } from "@/lib/whatsapp";
import { trackWhatsAppClick, type Placement } from "@/lib/track";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "outlineDark" | "outlineLight";
type Size = "md" | "lg" | "sm";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold text-ink shadow-[0_2px_0_0_var(--color-gold-deep)] hover:bg-gold-deep hover:shadow-none active:translate-y-px",
  outlineDark:
    "border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
  outlineLight:
    "border border-ink/15 bg-white text-ink hover:bg-ink/5 hover:border-ink/30",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm gap-2",
  md: "min-h-[52px] px-6 text-base gap-2.5",
  lg: "min-h-[58px] px-7 text-[17px] gap-3",
};

type Props = {
  /** Onde na página o botão está — vai para o parâmetro `placement` do evento */
  placement: Placement;
  /** Tipo de serviço, define a mensagem pré-preenchida e o parâmetro `service` */
  service?: ServiceKey;
  /** Texto avulso quando o contexto não cabe em nenhum `service` */
  customText?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
};

export function CtaWhatsApp({
  placement,
  service = "generic",
  customText,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: Props) {
  const href = customText ? whatsappUrlWithText(customText) : whatsappUrl(service);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Dispara UMA vez, no próprio link. Nenhum pai escuta o mesmo clique (§26).
      onClick={() => trackWhatsAppClick(placement, service)}
      data-placement={placement}
      className={[
        "inline-flex items-center justify-center rounded-xl font-display font-bold tracking-tight",
        "transition-colors duration-150",
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      <WhatsAppIcon className={size === "sm" ? "size-[18px]" : "size-[22px]"} />
      <span>{children}</span>
    </a>
  );
}
