import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { LanguageProvider } from "@/lib/i18n";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
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
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
        <Analytics />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
