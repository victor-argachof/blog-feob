import BlogCategories from '@/components/blog/Categories';
import { getAllCategories, getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/Button';
import { siteConfig } from './siteConfig';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function BlogHomePage() {
  // Busca todos os posts e categorias (usando await)
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // Verifica se há posts antes de desestruturar
  let featuredPost = null;
  let otherPosts: any[] = [];

  if (posts.length > 0) {
    [featuredPost, ...otherPosts] = posts;
  }

  // Limita a exibição a até 6 posts recentes
  const displayedPosts = otherPosts.slice(0, 6);

  // Função para verificar se a data é válida
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  // Função para formatar a data com verificação de validade
  const formatDate = (dateString: string) => {
    if (!dateString || !isValidDate(dateString)) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-16">
      {/* Seção de post em destaque */}
      {featuredPost && isValidDate(featuredPost.date) && (
        <section>
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-lg hover:opacity-90 transition-opacity">
              {featuredPost.coverImage && (
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-black opacity-40 dark:bg-gray-900 dark:opacity-50"></div>
              <div className="flex flex-col gap-y-2 absolute bottom-10 left-10 text-white">
                <div className="flex gap-x-2 text-sm uppercase">
                  <span>{featuredPost.author}</span>
                  {featuredPost.date && (
                    <>
                      <span>|</span>
                      <span>{formatDate(featuredPost.date)}</span>
                    </>
                  )}
                </div>
                <h2 className="text-3xl font-bold">{featuredPost.title}</h2>
                <p className="mt-2">{featuredPost.description}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Seção de posts recentes (exceto o destaque) */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Posts recentes</h2>
        {displayedPosts && displayedPosts.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-4">
              {displayedPosts.map((post) => (
                <li key={post.slug} className="rounded-lg hover:opacity-90 transition-opacity">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.coverImage && (
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-3 py-6">
                      <div className="flex items-center text-sm uppercase text-gray-500 dark:text-gray-400">
                        <span>{post.author}</span>
                        {post.date && isValidDate(post.date) && (
                          <>
                            <span className="mx-2">|</span>
                            <span>{formatDate(post.date)}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-2xl font-semibold text-primary hover:underline">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-8">
              <Link href="/blog/archive" className="inline-block">
                <Button variant="light" className="px-8 py-4">
                  Todos os posts
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <p className="flex items-center justify-center mx-4 py-4 text-gray-500 dark:text-gray-400">
            Nenhuma publicação encontrada.
          </p>
        )}
      </section>

      {/* Linha divisória */}
      <div className="my-12">
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>

      {/* Seção de categorias */}
      <BlogCategories categories={categories} />
    </div>
  );
}
