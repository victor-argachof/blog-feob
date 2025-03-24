export const siteConfig = {
  name: "Clinario | Blog",
  url: "https://blog.clinario.com",
  description: "Últimos posts e novidades do Clinario.",
  baseLinks: {
    home: "/",
    login: "/login",
    admin: "/admin",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export type siteConfig = typeof siteConfig
