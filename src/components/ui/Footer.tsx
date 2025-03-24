import { RiArrowRightUpLine } from "@remixicon/react";
import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import { ClinarioLogo } from "../../../public/ClinarioLogo";
import ThemeSwitch from "../ThemeSwitch";

const navigation = {
  platform: [
    { name: "Recursos", href: "https://clinario.com/#recursos", external: false },
    { name: "Preço", href: "https://clinario.com/#preco", external: false },
    { name: "FAQ", href: "https://clinario.com/#faq", external: false },
    { name: "Suporte", href: "https://suporte.clinario.com", external: true },
  ],
  institutional: [
    { name: "Sobre nós", href: "https://clinario.com/institucional/sobre-nos", external: false },
    { name: "Missão, Visão e Valores", href: "https://clinario.com/institucional/missao-visao-valores", external: false },
    { name: "Segurança", href: "https://clinario.com/institucional/seguranca", external: false },
    { name: "Carreiras", href: "https://clinario.com/institucional/carreiras", external: false },
    { name: "Contato", href: "https://clinario.com/institucional/contato", external: false },
  ],
  socialMedia: [
    { name: "Instagram", href: "https://www.instagram.com/clinario.app", external: true },
    { name: "LinkedIn", href: "https://linkedin.com/company/clinario", external: true },
    { name: "YouTube", href: "https://www.youtube.com/@Clinario", external: true },
    { name: "Blog", href: "/", external: false },
  ],
  legal: [
    { name: "Privacidade", href: "https://clinario.com/legal/privacidade", external: false },
    { name: "Termos de Uso", href: "https://clinario.com/legal/termos", external: false },
    { name: "Reembolso", href: "https://clinario.com/legal/reembolso", external: false },
  ],
};

export default function Footer() {
  return (
    <footer id="footer">
      <div className="mx-auto max-w-6xl px-3 pb-8 pt-16 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-20">
          <div className="space-y-8">
            <ClinarioLogo className="w-32 sm:w-40" />
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              Redefinindo como Psicólogos integram tecnologia e prática clínica para melhorar a experiência do paciente.
            </p>

            <div className="flex space-x-6">
              <ThemeSwitch />
            </div>
            <div></div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-14 sm:gap-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
            {/* Plataforma */}
            <div className="grid grid-cols-2 gap-8">
              <section aria-labelledby="footer-platform">
                <h2
                  id="footer-platform"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                >
                  Plataforma
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Quick links platform"
                >
                  {navigation.platform.map((item) => (
                    <li key={item.name} className="w-fit">
                      <Link
                        className="flex rounded-md text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{item.name}</span>
                        {item.external && (
                          <RiArrowRightUpLine
                            aria-hidden="true"
                            className="ml-1 aspect-square size-3 rounded-full bg-gray-100 p-px text-gray-900 dark:bg-gray-500/20 dark:text-gray-300 shrink-0"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Institucional */}
              <section aria-labelledby="footer-institutional">
                <h2
                  id="footer-institutional"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                >
                  Institucional
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Quick links institutional"
                >
                  {navigation.institutional.map((item) => (
                    <li key={item.name} className="w-fit">
                      <Link
                        className="flex rounded-md text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{item.name}</span>
                        {item.external && (
                          <RiArrowRightUpLine
                            aria-hidden="true"
                            className="ml-1 aspect-square size-3 rounded-full bg-gray-100 p-px text-gray-900 dark:bg-gray-500/20 dark:text-gray-300 shrink-0"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Redes sociais */}
            <div className="grid grid-cols-2 gap-8">
              <section aria-labelledby="footer-social-media">
                <h2
                  id="footer-social-media"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                >
                  Redes sociais
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Quick links socialMedia"
                >
                  {navigation.socialMedia.map((item) => (
                    <li key={item.name} className="w-fit">
                      <Link
                        className="flex rounded-md text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{item.name}</span>
                        {item.external && (
                          <RiArrowRightUpLine
                            aria-hidden="true"
                            className="ml-0.5 aspect-square size-3 rounded-full bg-gray-100 p-px text-gray-900 dark:bg-gray-500/20 dark:text-gray-300 shrink-0"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Legal */}
              <section aria-labelledby="footer-legal">
                <h2
                  id="footer-legal"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50"
                >
                  Legal
                </h2>
                <ul
                  role="list"
                  className="mt-6 space-y-4"
                  aria-label="Quick links Legal"
                >
                  {navigation.legal.map((item) => (
                    <li key={item.name} className="w-fit">
                      <Link
                        className="flex rounded-md text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                      >
                        <span>{item.name}</span>
                        {item.external && (
                          <RiArrowRightUpLine
                            aria-hidden="true"
                            className="ml-1 aspect-square size-3 rounded-full bg-gray-100 p-px text-gray-900 dark:bg-gray-500/20 dark:text-gray-300 shrink-0"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:mt-20 sm:flex-row lg:mt-24 dark:border-gray-800">
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Clinario. Todos os direitos reservados.
          </p>
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            Feito com{" "}
            <IconHeartFilled className="inline w-3 h-3 text-primary" /> pelo
            time Clinario.
          </p>
        </div>
      </div>
    </footer>
  );
}
