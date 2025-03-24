"use client";

import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Classe que representa um Post.
 */
class Post {
  constructor(
    public id: number,
    public title: string,
    public slug: string,
    public content: string,
    public is_published: boolean,
    public created_at: string,
    public updated_at: string
  ) { }
}

/**
 * Serviço para operações relacionadas aos posts.
 */
class PostService {
  /**
   * Busca todos os posts via API.
   */
  async getPosts(): Promise<Post[]> {
    const res = await fetch("/api/posts");
    const data = await res.json();
    return data.posts.map(
      (p: any) =>
        new Post(
          p.id,
          p.title,
          p.slug,
          p.content,
          p.is_published,
          p.created_at,
          p.updated_at
        )
    );
  }

  /**
   * Exclui um post pelo ID.
   */
  async deletePost(id: number): Promise<void> {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
  }
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const postService = new PostService();

  useEffect(() => {
    (async () => {
      try {
        const postsData = await postService.getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir esse post?")) {
      await postService.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Posts</h1>
        <Link href="/admin/posts/new">
          <Button>Criar Post</Button>
        </Link>
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-24"><Spinner /></div>
      ) : posts.length === 0 ? (
        <div>Nenhum post encontrado.</div>
      ) : (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border dark:border-white/[0.2] px-4 py-2">ID</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Título</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Slug</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="border dark:border-white/[0.2] px-4 py-2">{post.id}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">{post.title}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">{post.slug}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">
                  <div className="flex items-center justify-center gap-x-2">
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Button variant="secondary">Editar</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
