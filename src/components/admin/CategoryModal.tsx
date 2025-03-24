"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useEffect, useState } from "react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; slug: string }) => void;
  initialData?: { name: string; slug: string };
}

/**
 * CategoryModal exibe um formulário dentro de um modal para criar ou editar uma categoria.
 * Se initialData for fornecido, o modal atua como editor; caso contrário, como criador.
 */
export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CategoryModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  // Atualiza os campos se o modal for aberto com dados existentes
  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setSlug(initialData?.slug || "");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Categoria" : "Criar Categoria"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, slug });
          }}
        >
          <div className="mb-4">
            <Label>Nome</Label>
            <Input
              type="text"
              placeholder="Nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label>Slug</Label>
            <Input
              type="text"
              placeholder="slug-da-categoria"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
