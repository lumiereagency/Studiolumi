import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
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
const title = "StudioLumi | Produção audiovisual premium";
const description =
  "StudioLumi é uma produtora audiovisual estratégica. Direção, produção e pós-produção em uma única operação, da produção ágil para redes sociais a projetos cinematográficos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | StudioLumi",
  },
  description,
  keywords: [
    "produtora audiovisual",
    "brand film",
    "produção de vídeo",
    "StudioLumi",
    "conteúdo social",
    "vídeo institucional",
    "cinema",
  ],
  authors: [{ name: "StudioLumi" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
};

export const viewport: Viewport = {
  themeColor: "#050403",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StudioLumi",
  url: siteUrl,
  logo: `${siteUrl}/opengraph-image`,
  description,
  email: "lumiereagencyoficial@gmail.com",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
