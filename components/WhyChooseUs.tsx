import { siteConfig } from "@/lib/site-config";
import { Container } from "./ui/Container";

/**
 * BLOCO 5 — "Por que contratar?" (MASTER_SPEC §10).
 *
 * Cada pilar explica o que a palavra significa na prática. Nada de
 * "qualidade", "segurança" e "compromisso" como títulos soltos. Nenhum texto
 * promete garantia contratual — são diferenciais declarados no briefing.
 */
const PILLARS = [
  {
    title: `${siteConfig.yearsExperience} anos de estrada`,
    text: "Tempo de rua suficiente para saber como um móvel sai de um apartamento, o que cabe no veículo e quanto tempo o serviço realmente leva.",
  },
  {
    title: "Pontualidade",
    text: "Horário combinado é tratado como parte do serviço, não como detalhe.",
  },
  {
    title: "Organização",
    text: "Alinhamento prévio do que será transportado, origem, destino e data, antes do dia do serviço.",
  },
  {
    title: "Atendimento direto",
    text: "O contato é feito diretamente com quem acompanha o serviço — sem central de atendimento no meio do caminho.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="por-que" className="bg-cream py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink sm:text-[34px]">
          Por que contratar?
        </h2>

        <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
          {PILLARS.map(({ title, text }) => (
            <div key={title} className="border-t-2 border-gold pt-4">
              <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
