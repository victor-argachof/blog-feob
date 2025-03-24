'use client';

import type { PostMeta } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button } from '../Button';

interface PaginatedPostsProps {
  posts: PostMeta[];
}

export default function PaginatedPosts({ posts }: PaginatedPostsProps) {
  // Verificar se posts existe e não está vazio
  if (!posts || posts.length === 0) {
    return (
      <p className="flex items-center justify-center mx-4 py-4 text-gray-500 dark:text-gray-400">
        Nenhuma publicação encontrada.
      </p>
    );
  }

  const POSTS_PER_PAGE = 10;
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Função para verificar se a data é válida
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleShowMore = () => {
    setIsLoading(true);
    // Simula um delay para carregar os posts adicionais
    setTimeout(() => {
      setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
      setIsLoading(false);
    }, 500); // 500ms de delay
  };

  // Memoriza os posts exibidos para evitar recálculos desnecessários
  const displayedPosts = useMemo(() => posts.slice(0, visiblePosts), [posts, visiblePosts]);

  return (
    <div className="space-y-8">
      {displayedPosts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
          <div className="flex flex-col md:flex-row items-center gap-y-4 gap-x-8 p-4 hover:opacity-90 transition-opacity">
            {/* Imagem de capa à esquerda */}
            {post.coverImage && (
              <div className="relative w-full md:w-1/3 h-48 overflow-hidden rounded-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {/* Detalhes do post à direita */}
            <div className="flex flex-col w-full md:w-2/3 space-y-3">
              <div className="flex items-center text-sm uppercase text-gray-500 dark:text-gray-400">
                <span>{post.author}</span>
                {post.date && isValidDate(post.date) && (
                  <>
                    <span className="mx-2">|</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
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
          </div>
        </Link>
      ))}
      {/* Botão "Exibir mais" exibido apenas se houver mais posts */}
      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-4">
          <Button isLoading={isLoading} variant="primary" onClick={handleShowMore} className="px-8 py-4">
            Exibir mais
          </Button>
        </div>
      )}
    </div>
  );
}
