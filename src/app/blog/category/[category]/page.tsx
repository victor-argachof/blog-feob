import BlogCategories from '@/components/blog/Categories';
import PaginatedPosts from '@/components/blog/PaginatedPosts';
import { getAllCategories, getPostsByCategory } from '@/lib/blog';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  try {
    const { category } = params;
    const categories = await getAllCategories();
    const current = categories.find((cat) => cat.slug === category);
    const displayName = current ? current.name : category;
    return {
      title: `Clinario | Blog | ${displayName}`,
      description: `Visualize os posts da categoria ${displayName} no blog do Clinario.`,
    };
  } catch (error) {
    return {
      title: 'Clinario | Blog | Categoria',
      description: 'Visualize os posts por categoria no blog do Clinario.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      return [{ category: 'sem-categoria' }];
    }
    return categories.map((category) => ({
      category: encodeURIComponent(category.slug),
    }));
  } catch (error) {
    console.error("Erro ao gerar parâmetros de categoria:", error);
    return [{ category: 'sem-categoria' }];
  }
}

export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  try {
    const { category } = params;
    const posts = await getPostsByCategory(category);
    const categories = await getAllCategories();
    const current = categories.find((cat) => cat.slug === category);
    const displayName = current ? current.name : category;

    return (
      <>
        <h1 className="text-3xl font-bold mb-8">Categoria: {displayName}</h1>
        <div className="space-y-14">
          {posts && posts.length > 0 ? (
            <PaginatedPosts posts={posts} />
          ) : (
            <p className="flex items-center justify-center mx-4 py-4 text-gray-500 dark:text-gray-400">
              Nenhuma publicação encontrada nesta categoria.
            </p>
          )}
        </div>
        <div className="my-12">
          <hr className="border-gray-200 dark:border-gray-700" />
        </div>
        <BlogCategories categories={categories} />
      </>
    );
  } catch (error) {
    console.error("Erro ao carregar página da categoria:", error);
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
        <p className="mb-6">A categoria solicitada não está disponível.</p>
        <a href="/blog" className="text-primary hover:underline">
          Voltar para o blog
        </a>
      </div>
    );
  }
}
