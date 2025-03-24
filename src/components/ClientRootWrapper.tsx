"use client";
import Footer from "@/components/ui/Footer";
import { Navigation } from "@/components/ui/Navbar";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function ClientRootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>

      {isAdmin ? (
        // Se for rota admin, apenas renderiza o conteúdo do /admin layout
        <>
          {children}
        </>
      ) : (
        // Caso contrário, exibe navbar, footer, etc.
        <>
          <Navigation />
          <main className="mx-auto mt-36 w-full max-w-6xl px-4">{children}</main>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}
