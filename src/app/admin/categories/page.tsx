"use client";

import CategoryModal from "@/components/admin/CategoryModal";
import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesListPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ id?: number; name: string; slug: string } | null>(null);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setError("Erro ao buscar categorias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleNewCategory() {
    setModalData(null);
    setIsModalOpen(true);
  }

  function handleEditCategory(category: { id: number; name: string; slug: string }) {
    setModalData({ id: category.id, name: category.name, slug: category.slug });
    setIsModalOpen(true);
  }

  async function handleModalSubmit(data: { name: string; slug: string }) {
    try {
      let res;
      if (modalData && modalData.id) {
        res = await fetch(`/api/categories/${modalData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Erro ao salvar categoria.");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Erro no modal:", error);
      alert("Erro inesperado.");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Deseja realmente excluir essa categoria?")) {
      try {
        const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Erro ao excluir categoria.");
        } else {
          setCategories(prev => prev.filter(cat => cat.id !== parseInt(id)));
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho fixo */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>
        <Button onClick={handleNewCategory}>Criar Categoria</Button>
      </div>

      {/* Conteúdo condicional */}
      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border dark:border-white/[0.2] px-4 py-2">ID</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Nome</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Slug</th>
              <th className="border dark:border-white/[0.2] px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="border dark:border-white/[0.2] px-4 py-2">{cat.id}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">{cat.name}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">{cat.slug}</td>
                <td className="border dark:border-white/[0.2] px-4 py-2">
                  <div className="flex items-center justify-center gap-x-2">
                    <Button asChild variant="secondary">
                      <Link href="#" onClick={() => handleEditCategory(cat)}>
                        Editar
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="destructive"
                      onClick={() => handleDelete(String(cat.id))}
                    >
                      <Link href="#">Excluir</Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={modalData || undefined}
      />
    </div>
  );
}
