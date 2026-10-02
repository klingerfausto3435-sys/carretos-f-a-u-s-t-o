/**
 * FONTE ÚNICA DE VERDADE DA LANDING PAGE
 * ---------------------------------------------------------------------------
 * Toda informação factual exibida na página sai daqui. Nenhum componente deve
 * ter texto de marca, telefone ou diferencial hardcoded.
 *
 * REGRA (MASTER_SPEC §4 e §13): só entra neste arquivo o que o cliente
 * confirmou. Tudo que ainda não foi confirmado fica em `pendentes` abaixo,
 * como `false` / `null`, e NÃO pode ser escrito como fato na página.
 */

export const siteConfig = {
  /** Nome de trabalho. Pendência #1: confirmar "Fausto Transportes" x "Amaral Carretos". */
  brandName: "Fausto Transportes",
  brandTagline: "Carretos e Pequenas Mudanças em Belo Horizonte",

  /** Formato internacional, sem máscara — usado em wa.me e tel: */
  phoneRaw: "5531992228411",
  /** Como o número aparece para o usuário */
  phoneDisplay: "(31) 99222-8411",
  /** href do link de ligação */
  phoneHref: "tel:+5531992228411",

  city: "Belo Horizonte",
  cityShort: "BH",
  state: "MG",

  /** Confirmado no briefing: 13 anos de estrada */
  yearsExperience: 13,

  /** URL canônica — trocar quando o domínio for definido */
  siteUrl: "https://faustotransportes.com.br",

  /**
   * ID da tag do Google (conta de Google Ads 675-073-6870).
   * Deixar `null` desliga o carregamento do gtag.js sem quebrar nada:
   * lib/track.ts só chama `window.gtag` se ele existir.
   */
  googleTagId: "AW-18488071731" as string | null,

  /**
   * Bairros citados pelo próprio cliente como de maior atuação (§2.2).
   * Não é lista de cobertura exaustiva nem página de SEO por bairro.
   */
  serviceAreas: [
    "São Bento",
    "Santa Lúcia",
    "Anchieta",
    "Sion",
    "Luxemburgo",
    "Gutierrez",
  ],

  /**
   * Diferenciais DECLARADOS pelo proprietário no briefing.
   * São afirmações de posicionamento, não garantias contratuais.
   */
  confirmedDifferentials: [
    "13 anos de estrada",
    "Pontualidade",
    "Organização",
    "Atendimento direto com quem acompanha o serviço",
    "Atendimento também aos fins de semana",
  ],

  /**
   * Prova social. Enquanto `enabled` for false, o bloco de avaliações
   * NÃO é renderizado. Nunca preencher com dados inventados.
   * Pendências #9 e #10: existe Perfil da Empresa no Google? Quantas avaliações?
   */
  socialProof: {
    enabled: false,
    rating: null as number | null,
    reviewCount: null as number | null,
    profileUrl: null as string | null,
    reviews: [] as Array<{ author: string; text: string; rating: number }>,
  },

  /**
   * PENDÊNCIAS (MASTER_SPEC §27). Nada aqui pode virar texto na página
   * enquanto estiver `false`/`null`. Ao confirmar, mudar aqui e só então
   * liberar a copy correspondente.
   */
  pendentes: {
    veiculoModelo: null as string | null,
    veiculoEhBauFechado: false,
    temMantasOuCintas: false,
    ajudanteIncluso: false,
    fazMontagemDesmontagem: false,
    formasDePagamento: null as string[] | null,
    emiteNotaFiscal: false,
    temSeguro: false,
    horarioAtendimento: null as string | null,
    atendeNoMesmoDia: false,
    enderecoComercial: null as string | null,
    cnpj: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
