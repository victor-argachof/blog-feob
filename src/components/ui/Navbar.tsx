"use client"
import { siteConfig } from "@/app/siteConfig"
import useScroll from "@/lib/use-scroll"
import { cx } from "@/lib/utils"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import Link from "next/link"
import React from "react"
import { ClinarioLogo } from "../../../public/ClinarioLogo"
import { Button } from "../Button"

export function Navigation() {
  const scrolled = useScroll(15)
  const [open, setOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const submenuRef = React.useRef<HTMLDivElement>(null)
  const [fetchedCategories, setFetchedCategories] = React.useState<
    Array<{ id: number; name: string; slug: string }>
  >([])

  React.useEffect(() => {
    // Ajuste para breakpoint lg (1024px)
    const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 1024px)")
    const handleMediaQueryChange = () => {
      setOpen(false)
      setDropdownOpen(false)
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange)
    handleMediaQueryChange()

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  // Fecha o dropdown ao clicar fora (apenas para desktop - lg)
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth >= 1024) {
        if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
          setDropdownOpen(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [submenuRef])

  // Busca as categorias via API ao montar o componente
  React.useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setFetchedCategories(data.categories)
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error)
      })
  }, [])

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
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="sr-only">Clinario</span>
            <ClinarioLogo className="w-28 md:w-32" />
          </Link>
          {/* Menu desktop */}
          <nav className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
            <div className="flex items-center gap-10 font-medium">
              <Link
                className="px-2 py-1 text-gray-900 dark:text-gray-50"
                href="/blog/archive"
              >
                Posts
              </Link>
              {/* Dropdown "Categorias" */}
              <div className="relative" ref={submenuRef}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="py-1 text-gray-900 dark:text-gray-50 inline-flex items-center cursor-pointer select-none"
                >
                  Categorias
                  <svg
                    className={`ml-1 h-4 w-4 fill-current transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
                <div
                  className={`absolute left-0 top-full mt-2 z-50 w-max bg-white/95 dark:bg-black/90 backdrop-blur-nav border border-gray-100 dark:border-white/15 rounded-xl p-2 transition-opacity duration-300 ${dropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                  {fetchedCategories && fetchedCategories.length > 0 ? (
                    fetchedCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/blog/category/${encodeURIComponent(category.slug)}`}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-900 dark:text-gray-50">Nenhuma categoria</p>
                  )}
                </div>
              </div>
            </div>
          </nav>
          {/* Botão "Conheça o Clinario" para desktop */}
          <div className="flex gap-x-2">
            <Button asChild aria-label="Conheça o Clinario" className="hidden h-10 font-semibold lg:flex">
              <a href="https://clinario.com" rel="noopener noreferrer" target="_blank">
                Conheça o Clinario
              </a>
            </Button>
          </div>
          {/* Menu mobile: Apenas o botão de menu */}
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
                href="/blog/archive"
                className="block px-2 py-1 text-gray-900 dark:text-gray-50"
              >
                Posts
              </Link>
            </li>
            <li>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setDropdownOpen((prev) => !prev)
                }}
                className="flex items-center justify-between w-full cursor-pointer px-2 py-1 text-gray-900 dark:text-gray-50"
              >
                <span>Categorias</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {dropdownOpen && (
                <ul className="text-sm space-y-3 mt-2 pl-4">
                  {fetchedCategories && fetchedCategories.length > 0 ? (
                    fetchedCategories.map((category) => (
                      <li key={category.id} onClick={() => setOpen(false)}>
                        <Link href={`/blog/category/${encodeURIComponent(category.slug)}`} className="block text-gray-900 dark:text-gray-50">
                          {category.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-900 dark:text-gray-50">Nenhuma categoria</p>
                  )}
                </ul>
              )}
            </li>
            {/* Botão no final do menu mobile */}
            <li onClick={() => setOpen(false)}>
              <Button asChild className="w-full h-10">
                <a href="https://clinario.com" rel="noopener noreferrer" target="_blank">
                  Conheça o Clinario
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
