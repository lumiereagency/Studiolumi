import { getSiteUrl } from "./site-url";
import { WHATSAPP_NUMBER } from "./contact";

const siteUrl = getSiteUrl();

export const STUDIO = {
  name: "StudioLumi",
  url: siteUrl,
  email: "lumiereagencyoficial@gmail.com",
  phone: `+${WHATSAPP_NUMBER}`,
  phoneDisplay: "+55 21 96645-4367",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: "https://www.instagram.com/studiolumi_co/",
  city: "Rio de Janeiro",
  region: "RJ",
  founder: "Gustavo Turques",
  title: "StudioLumi | Produtora audiovisual no Rio de Janeiro",
  metaDescription:
    "Produtora audiovisual no Rio de Janeiro. Vídeo institucional, eventos, redes sociais, tempo real e casamentos. Atendemos todo o Brasil.",
  description:
    "Produtora audiovisual no Rio de Janeiro que atende todo o Brasil. Vídeo institucional, conteúdo para redes sociais, cobertura de eventos, conteúdo em tempo real, gestão de perfil para figuras públicas e filmes de casamento, com direção, produção e pós-produção em uma única operação.",
};

export const SERVICES = [
  { name: "Filme institucional", description: "Vídeo institucional e brand film para posicionamento e autoridade de marca." },
  { name: "Conteúdo para redes sociais", description: "Séries de vídeos verticais para Instagram, TikTok e YouTube Shorts, do roteiro ao corte." },
  { name: "Cobertura de eventos", description: "Filmagem e fotografia de eventos corporativos, congressos, palestras e ativações de marca." },
  { name: "Conteúdo em tempo real", description: "Captação, edição e publicação de vídeos durante o próprio evento." },
  { name: "Motion e branding", description: "Vinhetas, logo animada e motion graphics." },
  { name: "Fotografia de produção", description: "Fotografia para campanhas, marcas e redes sociais." },
  { name: "Captação aérea com drone", description: "Imagens aéreas com drone para filmes e eventos." },
  { name: "Gestão de perfil e edição de vídeo", description: "Operação contínua de gestão de redes sociais e edição de vídeos para figuras públicas." },
  { name: "Filme de casamento", description: "Filmagem de casamento e pré-wedding com linguagem cinematográfica." },
];

export const PRICES = [
  { name: "Pacote Mobile", price: 1500, description: "Conteúdo ágil para redes sociais com roteiro, direção, captação mobile e edição." },
  { name: "Pacote Produção", price: 4500, description: "Produção completa com direção criativa, captação profissional, edição, cor e motion." },
  { name: "Pacote Cinema", price: 12000, description: "Campanhas e brand films com estrutura cinematográfica, drone e pós-produção avançada." },
  { name: "Gestão + Edição para figuras públicas", price: 2800, description: "Gestão de perfil, planejamento de conteúdo e edição de vídeos." },
  { name: "Casamento", price: 1800, description: "Captação da cerimônia e da festa, filme editado e versão para redes sociais." },
  { name: "Combo pré-wedding + casamento", price: 2990, description: "Pré-wedding somado à cobertura do casamento." },
];

export const FAQ = [
  {
    q: "O que a StudioLumi faz?",
    a: "A StudioLumi é uma produtora audiovisual no Rio de Janeiro. Fazemos vídeo institucional, conteúdo para redes sociais, cobertura de eventos, conteúdo em tempo real, motion, fotografia, imagens com drone, gestão de perfil para figuras públicas e filmes de casamento, com direção, produção e pós-produção na mesma equipe.",
  },
  {
    q: "Vocês atendem fora do Rio de Janeiro?",
    a: "Sim. Nossa base é no Rio de Janeiro e atendemos produções em todo o Brasil.",
  },
  {
    q: "Quanto custa uma produção de vídeo com a StudioLumi?",
    a: "Os pacotes partem de R$ 1.500 (Mobile), R$ 4.500 (Produção) e R$ 12.000 (Cinema). Gestão + Edição para figuras públicas parte de R$ 2.800, casamento de R$ 1.800 e o combo pré-wedding + casamento sai por R$ 2.990. O valor final depende do escopo definido no briefing.",
  },
  {
    q: "O que é conteúdo em tempo real?",
    a: "É a captação, edição e publicação de vídeos durante o próprio evento. A marca aparece nas redes enquanto o assunto ainda está acontecendo, em vez de esperar dias pela edição.",
  },
  {
    q: "Vocês fazem gestão de redes para figuras públicas?",
    a: "Sim. No plano Gestão + Edição cuidamos da gestão de perfil, do planejamento de conteúdo e da edição de vídeos como uma operação contínua. Trabalhamos com nomes como Sergio Mallandro, Sr. Bemvindo Sequeira e Gustavo Mendes.",
  },
  {
    q: "Vocês filmam casamentos?",
    a: "Sim. O pacote Casamento inclui captação da cerimônia e da festa, filme editado e versão curta para redes sociais. Também oferecemos o combo pré-wedding + casamento.",
  },
  {
    q: "Como funciona o processo de produção?",
    a: "São quatro etapas: imersão (entender marca, contexto e objetivo), direção (conceito, linguagem e plano de produção), produção (captação com direção técnica e criativa) e pós-produção (edição, cor, motion e finalização para cada formato).",
  },
  {
    q: "Como peço um orçamento?",
    a: "Pelo formulário do site, que abre uma conversa direta com a equipe no WhatsApp, ou pelo número +55 21 96645-4367.",
  },
];

const orgId = `${siteUrl}/#organization`;

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: STUDIO.name,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/opengraph-image`,
        description: STUDIO.description,
        email: STUDIO.email,
        telephone: STUDIO.phone,
        priceRange: "R$ 1.500 a R$ 12.000+",
        founder: { "@type": "Person", name: STUDIO.founder },
        address: {
          "@type": "PostalAddress",
          addressLocality: STUDIO.city,
          addressRegion: STUDIO.region,
          addressCountry: "BR",
        },
        areaServed: [
          { "@type": "City", name: "Rio de Janeiro" },
          { "@type": "State", name: "Rio de Janeiro" },
          { "@type": "Country", name: "Brasil" },
        ],
        sameAs: [STUDIO.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: STUDIO.phone,
          email: STUDIO.email,
          availableLanguage: ["Portuguese"],
          areaServed: "BR",
        },
        knowsAbout: SERVICES.map((s) => s.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pacotes de produção audiovisual",
          itemListElement: PRICES.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.description,
            priceCurrency: "BRL",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: p.price,
              priceCurrency: "BRL",
            },
            seller: { "@id": orgId },
          })),
        },
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": orgId } },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: STUDIO.name,
        description: STUDIO.description,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
