/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'output: export' configura o Next.js para gerar uma versão estática do site (SSG).
  // output: 'export',

  // Configuração de imagens: desabilita a otimização de imagens nativa do Next.js.
  images: {
    unoptimized: true
  },

  // Define quais extensões serão consideradas páginas.
  pageExtensions: ["js", "jsx", "md", "ts", "tsx"]
}

export default nextConfig;
