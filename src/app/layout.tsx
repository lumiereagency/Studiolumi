import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "StudioLumi — Do mobile ao cinema.",
  description:
    "StudioLumi é uma produtora audiovisual responsiva e estratégica. Do conteúdo mobile às produções cinematográficas, encontramos a linguagem certa para cada história.",
  keywords: [
    "produtora audiovisual",
    "brand film",
    "produção de vídeo",
    "StudioLumi",
    "conteúdo social",
    "cinema",
  ],
  openGraph: {
    title: "StudioLumi — Do mobile ao cinema.",
    description: "Uma linguagem para cada história.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
      </body>
    </html>
  );
}
