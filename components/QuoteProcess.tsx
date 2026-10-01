import { Container } from "./ui/Container";
import { CtaWhatsApp } from "./ui/CtaWhatsApp";
import { WhatsAppIcon } from "./ui/icons";

/**
 * BLOCO 4 — "Mande as fotos" (MASTER_SPEC §10).
 *
 * Bloco de conversão principal: tira a ansiedade de "quanto vai custar?" sem
 * exigir formulário. A composição de celular mostra a mensagem REAL que o
 * link abre — nenhuma conversa de cliente fabricada, nenhum depoimento
 * inventado, como exige a spec.
 */
const STEPS = [
  {
    n: "1",
    title: "Chame no WhatsApp",
    text: "Sem formulário e sem cadastro. A conversa já começa com você.",
  },
  {
    n: "2",
    title: "Envie fotos ou vídeo + origem e destino",
    text: "Dá para entender o volume real do serviço antes de falar em preço.",
  },
  {
    n: "3",
    title: "Informe a data",
    text: "Assim dá para conferir a agenda e reservar o horário.",
  },
  {
    n: "4",
    title: "Receba o orçamento e combine o serviço",
    text: "Com o serviço entendido, o valor passa a fazer sentido para os dois lados.",
  },
];

const MESSAGE_PREVIEW = [
  "Olá! Vim pelo site e quero pedir um orçamento.",
  "",
  "Tipo de serviço:",
  "Origem:",
  "Destino:",
  "Data:",
  "O que preciso transportar:",
];

export function QuoteProcess() {
  return (
    <section id="orcamento" className="bg-ink py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <h2 className="font-display text-[26px] font-extrabold leading-[1.15] text-white sm:text-[34px]">
              Mande as fotos. A gente entende o serviço antes de passar o{" "}
              <span className="text-gold">orçamento</span>.
            </h2>

            <ol className="mt-7 space-y-5">
              {STEPS.map(({ n, title, text }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gold font-display text-[15px] font-extrabold text-ink">
                    {n}
                  </span>
                  <div className="pt-0.5">
                    <p className="font-display text-[15.5px] font-bold leading-snug text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/55">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <CtaWhatsApp
              placement="process"
              service="generic"
              size="lg"
              fullWidth
              className="mt-8 sm:w-auto"
            >
              Enviar fotos pelo WhatsApp
            </CtaWhatsApp>
          </div>

          {/* Composição estilizada. Não simula conversa: mostra o rascunho que
              o próprio link preenche. */}
          <div className="mx-auto w-full max-w-[320px]">
            <div className="rounded-[26px] border border-white/15 bg-graphite p-2.5 shadow-2xl">
              <div className="overflow-hidden rounded-[18px] bg-[#0f1a16]">
                <div className="flex items-center gap-2.5 border-b border-white/10 bg-[#14231d] px-4 py-3">
                  <WhatsAppIcon className="size-5 text-[#25D366]" />
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-white">
                      Fausto Transportes
                    </p>
                    {/* /40 reprovava em contraste AA (3,74:1) sobre este verde */}
                    <p className="text-[10.5px] text-white/65">
                      mensagem pronta para enviar
                    </p>
                  </div>
                </div>

                <div className="px-4 py-5">
                  <div className="ml-auto max-w-[94%] rounded-xl rounded-br-sm bg-[#1f3b2f] px-3.5 py-3">
                    {MESSAGE_PREVIEW.map((line, i) =>
                      line === "" ? (
                        <span key={i} className="block h-2.5" />
                      ) : (
                        <p
                          key={i}
                          className="text-[12.5px] leading-[1.5] text-white/85"
                        >
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[12px] text-white/60">
              É exatamente o texto que abre no seu WhatsApp. Você só completa e
              envia.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
