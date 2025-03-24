import PaginatedPosts from '@/components/blog/PaginatedPosts';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinario | Blog | Posts',
  description: 'Visualize todos os posts do blog do Clinario.',
};

export default async function BlogArchivePage() {
  try {
    // Busca todos os posts (aguarda o resultado)
    const posts = await getAllPosts();

    return (
      <>
        <h1 className="text-3xl font-bold mb-8">Nossos posts</h1>
        <div className="space-y-14">
          <PaginatedPosts posts={posts} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Erro ao carregar página de arquivo:', error);
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-8">Nossos posts</h1>
        <p className="flex items-center justify-center mx-4 py-4 text-gray-500 dark:text-gray-400">
          Não foi possível carregar os posts. Tente novamente mais tarde.
        </p>
      </div>
    );
  }
}
