import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MercadoLivreDoEmagrecimento — Mounjaro | Tirzepatida Brasil",
  description: "MercadoLivreDoEmagrecimento — Mounjaro/Tirzepatida dados, dosagens e informações completas. Black Friday — Últimas unidades para Mercado Brasileiro.",
  keywords: ["MercadoLivreDoEmagrecimento", "Mounjaro", "Tirzepatida", "dosagem", "caneta injetável", "Brasil", "Black Friday", "emagrecimento"],
  authors: [{ name: "MercadoLivreDoEmagrecimento" }],
  icons: {
    icon: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png",
    shortcut: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png",
    apple: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1763334345/favicon-16x16_f0upgq.png",
  },
  openGraph: {
    title: "MercadoLivreDoEmagrecimento — Mounjaro Encomende Hoje",
    description: "MercadoLivreDoEmagrecimento — Mounjaro/Tirzepatida dados, dosagens e informações completas. Black Friday — Últimas unidades para Mercado Brasileiro.",
    url: "/",
    siteName: "MercadoLivreDoEmagrecimento",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MercadoLivreDoEmagrecimento — Mounjaro Encomende Hoje",
    description: "MercadoLivreDoEmagrecimento — Mounjaro/Tirzepatida dados, dosagens e informações completas. Black Friday — Últimas unidades para Mercado Brasileiro.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
