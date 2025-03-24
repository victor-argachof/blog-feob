"use client";

import { Button } from "@/components/Button";
import useScroll from "@/lib/use-scroll";
import { cx } from "@/lib/utils";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";
import { ClinarioLogo } from "../../../public/ClinarioLogo";

export function AdminNavbar() {
  // Efeito de scroll
  const scrolled = useScroll(15);

  // Estado do menu (mobile)
  const [open, setOpen] = React.useState(false);

  // Função para realizar o logout via método POST
  async function handleLogout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      // Redireciona para a página de login ou outra rota apropriada
      window.location.href = "/login";
    } else {
      alert("Erro ao realizar logout.");
    }
  }

  return (
    <header
      className={cx(
        "fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl transform-gpu animate-slide-down-fade justify-center rounded-xl border border-transparent px-3 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
        open ? "h-auto" : "h-16",
        scrolled || open
          ? "backdrop-blur-nav max-w-4xl border-gray-100 bg-white/80 shadow-xl shadow-black/5 dark:border-white/15 dark:bg-black/70"
          : "bg-white/0 dark:bg-gray-950/0",
        "overflow-hidden md:overflow-visible"
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          {/* Logotipo (lado esquerdo) */}
          <Link href="/admin" aria-label="Admin Home">
            <span className="sr-only">Clinario Admin</span>
            <ClinarioLogo className="w-28 md:w-32" />
          </Link>

          {/* Menu desktop (centro) */}
          <nav className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
            <div className="flex items-center gap-10 font-medium">
              <Link
                className="px-2 py-1 text-gray-900 dark:text-gray-50"
                href="/admin"
              >
                Posts
              </Link>
              <Link
                className="px-2 py-1 text-gray-900 dark:text-gray-50"
                href="/admin/categories"
              >
                Categorias
              </Link>
            </div>
          </nav>

          {/* Lado direito (desktop): Logout */}
          <div className="flex gap-x-2">
            <Button
              variant="light"
              className="hidden h-10 font-semibold lg:flex"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Botão de menu (mobile) */}
          <div className="flex gap-x-2 lg:hidden">
            <Button
              onClick={() => setOpen(!open)}
              variant="light"
              className="aspect-square p-2"
              aria-label="Menu"
            >
              {open ? (
                <RiCloseLine aria-hidden="true" className="size-5" />
              ) : (
                <RiMenuLine aria-hidden="true" className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        <nav
          className={cx(
            "my-6 text-lg ease-in-out will-change-transform lg:hidden",
            open ? "" : "hidden"
          )}
        >
          <ul className="space-y-4 font-medium">
            <li onClick={() => setOpen(false)}>
              <Link
                href="/admin"
                className="block px-2 py-1 text-gray-900 dark:text-gray-50"
              >
                Posts
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link
                href="/admin/categories"
                className="block px-2 py-1 text-gray-900 dark:text-gray-50"
              >
                Categorias
              </Link>
            </li>
            {/* Logout (mobile) */}
            <li onClick={() => setOpen(false)}>
              <Button
                className="w-full h-10"
                variant="light"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
