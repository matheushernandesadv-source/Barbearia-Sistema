import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudioBlack — Sistema de Gestão para Barbearias",
  description:
    "StudioBlack: agendamento online, financeiro, comissões, estoque, PDV, assinaturas e muito mais em um só sistema para sua barbearia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-ink-900 text-ink-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
