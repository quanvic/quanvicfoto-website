import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { LanguageProvider } from "@/lib/i18n";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Quân Vic Foto — Beauty Photographer",
  description:
    "Editorial beauty photography portfolio. 11 năm kinh nghiệm chụp ảnh Beauty — skin, light, and the architecture of a face, captured by Quân Vic Foto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
