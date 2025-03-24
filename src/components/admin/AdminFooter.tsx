"use client";

import { IconHeartFilled } from "@tabler/icons-react";
import ThemeSwitch from "../ThemeSwitch";

/**
 * Componente AdminFooter
 * Exibe uma mensagem simples e o seletor de temas.
 * Em dispositivos móveis, o conteúdo é centralizado.
 * Em dispositivos maiores, o texto fica à esquerda e o seletor à direita.
 */
export default function AdminFooter() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-5">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-y-5">
        <div className="text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
          Feito com{" "}
          <IconHeartFilled className="inline w-4 h-4 text-primary" /> pelo time Clinario.
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
