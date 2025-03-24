import { siteConfig } from "@/app/siteConfig";
import ClientRootWrapper from "@/components/ClientRootWrapper";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Exporta o objeto metadata para definir título, descrição e robots
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  robots: {
    index: siteConfig.robots.index,
    follow: siteConfig.robots.follow,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.className} min-h-screen scroll-auto antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
      >
        <ClientRootWrapper>{children}</ClientRootWrapper>
      </body>
    </html>
  );
}
