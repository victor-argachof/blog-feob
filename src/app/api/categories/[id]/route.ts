import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/categories/[id]
 * Retorna os dados de uma categoria.
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [params.id]);
    if (!(rows as any[]).length) {
      return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 });
    }
    return NextResponse.json({ category: (rows as any[])[0] });
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return NextResponse.json({ error: "Erro ao buscar categoria." }, { status: 500 });
  }
}

/**
 * PUT /api/categories/[id]
 * Atualiza uma categoria.
 * Espera um JSON com { name, slug }.
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }
    const query = "UPDATE categories SET name = ?, slug = ? WHERE id = ?";
    await db.query(query, [name, slug, params.id]);
    return NextResponse.json({ message: "Categoria atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json({ error: "Erro ao atualizar categoria." }, { status: 500 });
  }
}

/**
 * DELETE /api/categories/[id]
 * Tenta excluir uma categoria, mas se houver posts vinculados, retorna um erro.
 */
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    // Verifica se há posts vinculados à categoria
    const [rows]: any = await db.query("SELECT COUNT(*) as count FROM posts WHERE category_id = ?", [params.id]);
    const count = rows[0].count;
    if (count > 0) {
      return NextResponse.json(
        {
          error: "Não é possível excluir essa categoria, pois ela possui posts vinculados. Exclua ou altere a categoria dos posts antes de removê-la.",
        },
        { status: 400 }
      );
    }

    // Se não houver posts vinculados, exclui a categoria
    await db.query("DELETE FROM categories WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Categoria excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return NextResponse.json({ error: "Erro ao excluir categoria." }, { status: 500 });
  }
}
