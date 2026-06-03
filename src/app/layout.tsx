import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Distinctive serif for display headlines (font-serif utility maps here)
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Andean Flow Technologies — Especiación de Cobre en el Frente de Carguío",
  description:
    "SpectraFlow AI clasifica especies mineralógicas de cobre (óxido, sulfuro, mixto) en el frente de carguío mediante LIBS y Machine Learning. La química define el destino del mineral.",
  metadataBase: new URL("https://andeanflow.ai"),
  openGraph: {
    title: "Andean Flow Technologies — SpectraFlow AI",
    description:
      "Inteligencia mineralógica en el frente de carguío. Especiación de cobre por LIBS + ML.",
    url: "https://andeanflow.ai",
    siteName: "Andean Flow Technologies",
    locale: "es_CL",
    type: "website",
  },
  icons: {
    icon: "/brand/favicon-32.png",
    apple: "/brand/favicon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
