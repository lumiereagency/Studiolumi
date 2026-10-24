import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import { STUDIO, buildSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = getSiteUrl();
const { title, metaDescription: description } = STUDIO;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | StudioLumi",
  },
  description,
  applicationName: "StudioLumi",
  category: "Produção audiovisual",
  keywords: [
    "produtora audiovisual Rio de Janeiro",
    "produtora de vídeo RJ",
    "vídeo institucional Rio de Janeiro",
    "filmagem de eventos Rio de Janeiro",
    "cobertura de eventos corporativos",
    "conteúdo em tempo real para eventos",
    "produção de conteúdo para redes sociais",
    "gestão de redes sociais para figuras públicas",
    "edição de vídeo para Reels e TikTok",
    "filmagem de casamento Rio de Janeiro",
    "pré-wedding",
    "brand film",
    "captação com drone",
    "StudioLumi",
  ],
  authors: [{ name: "StudioLumi", url: siteUrl }],
  creator: "StudioLumi",
  publisher: "StudioLumi",
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "StudioLumi",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  other: {
    "geo.region": "BR-RJ",
    "geo.placename": "Rio de Janeiro",
  },
};

export const viewport: Viewport = {
  themeColor: "#050403",
};

const siteJsonLd = buildSiteJsonLd();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
