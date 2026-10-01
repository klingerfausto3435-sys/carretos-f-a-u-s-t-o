"use client";

import { siteConfig } from "@/lib/site-config";
import { trackPhoneClick, type Placement } from "@/lib/track";
import { PhoneIcon } from "./icons";

type Props = {
  placement: Placement;
  children?: React.ReactNode;
  /** `button` = aparência de CTA secundário. `inline` = link de texto. */
  tone?: "onDark" | "onLight" | "inline";
  className?: string;
};

/**
 * CTA secundário (§9): precisa existir, mas não pode competir visualmente
 * com o WhatsApp. Por isso nunca usa o dourado sólido.
 */
export function CtaPhone({
  placement,
  children,
  tone = "onDark",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-xl font-display font-semibold transition-colors duration-150";

  const tones = {
    onDark:
      "min-h-[52px] px-6 border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
    onLight:
      "min-h-[52px] px-6 border border-ink/15 bg-white text-ink hover:bg-ink/5 hover:border-ink/30",
    inline: "text-ink underline underline-offset-4 decoration-gold decoration-2",
  } as const;

  return (
    <a
      href={siteConfig.phoneHref}
      onClick={() => trackPhoneClick(placement)}
      data-placement={placement}
      className={[base, tones[tone], className].join(" ")}
    >
      <PhoneIcon className="size-5" />
      <span>{children ?? `Ligar ${siteConfig.phoneDisplay}`}</span>
    </a>
  );
}
