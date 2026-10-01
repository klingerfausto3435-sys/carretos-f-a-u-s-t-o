import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";
import { TruckIcon, BoltIcon, CalendarIcon } from "./ui/icons";

/**
 * BLOCO 2 — Faixa de microprovas (MASTER_SPEC §10).
 *
 * Três razões para continuar lendo. Todas saem do briefing — nenhum número
 * inventado, nenhum selo de garantia, nenhuma estrela decorativa (§4).
 */
const PROOFS = [
  {
    Icon: TruckIcon,
    title: `${siteConfig.yearsExperience} anos de estrada`,
    text: "Experiência real em carretos e pequenas mudanças.",
  },
  {
    Icon: BoltIcon,
    title: "Resposta rápida no WhatsApp",
    text: "Quem responde é o próprio responsável pelo serviço.",
  },
  {
    Icon: CalendarIcon,
    title: "Atendimento aos fins de semana",
    text: "Sábado e domingo conforme a agenda disponível.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-white">
      <Container>
        <ul className="grid gap-5 py-7 sm:grid-cols-3 sm:gap-7 sm:py-8">
          {PROOFS.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink">
                <Icon className="size-[18px] text-gold" />
              </span>
              <div>
                <p className="font-display text-[15px] font-bold leading-snug text-ink">
                  {title}
                </p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-muted">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
