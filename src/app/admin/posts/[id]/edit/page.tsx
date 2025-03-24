"use client";

import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Spinner from "@/components/Spinner";
import { Select } from "@/components/ui/Select";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Importa o CSS do EasyMDE para o editor Markdown
import "easymde/dist/easymde.min.css";

/**
 * Página para editar um post existente.
 */
export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id; // Obtém o id do post a partir da URL
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Busca as categorias do endpoint /api/categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        setError("Erro ao buscar categorias.");
      }
    }
    fetchCategories();
  }, []);

  // Busca os dados do post pelo id e popula os campos
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          setError("Erro ao carregar o post.");
          return;
        }
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setCoverImage(data.cover_image || "");
        setSelectedCategory(String(data.category_id) || "");
      } catch (err) {
        console.error(err);
        setError("Erro inesperado ao carregar o post.");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      title,
      slug,
      content,
      category_id: selectedCategory,
      cover_image: coverImage,
    };

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao atualizar o post.");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Erro inesperado.");
      setSubmitting(false);
    }
  }

  function handleCancel() {
    router.push("/admin");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Post</h1>

      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <Spinner />
        </div>
      ) : (
        <>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            {/* Título */}
            <div className="mb-4">
              <Label>Título</Label>
              <Input
                type="text"
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Slug */}
            <div className="mb-4">
              <Label>Slug</Label>
              <Input
                type="text"
                placeholder="slug-do-post"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            {/* Imagem de Capa */}
            <div className="mb-4">
              <Label>Imagem de Capa (URL)</Label>
              <Input
                type="text"
                placeholder="URL da imagem de capa"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <Label>Categoria</Label>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Selecione a categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Conteúdo (Markdown) */}
            <div className="mb-4">
              <Label>Conteúdo (Markdown)</Label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                isDark={theme === "dark"}
                options={{
                  placeholder: "Edite seu post...",
                  spellChecker: false,
                  status: ["lines", "words", "cursor"],
                }}
              />
            </div>

            {/* Botões */}
            <div className="flex space-x-2">
              <Button type="submit" isLoading={submitting}>
                Atualizar
              </Button>
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
