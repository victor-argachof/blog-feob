import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/posts/[id]
 * Retorna os dados do post com o id especificado.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [
      params.id,
    ]);
    if (!(rows as any[]).length) {
      return NextResponse.json(
        { error: "Post não encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json((rows as any[])[0]);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json(
      { error: "Erro ao buscar post." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/posts/[id]
 * Atualiza os dados de um post existente.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, slug, content, category_id, cover_image } =
      await request.json();

    // Validação básica
    if (!title || !slug || !content || !category_id) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const query = `
      UPDATE posts
      SET title = ?, slug = ?, content = ?, cover_image = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.query(query, [title, slug, content, cover_image, category_id, params.id]);

    return NextResponse.json({ message: "Post atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar post." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posts/[id]
 * Exclui um post com o id especificado.
 */
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Post excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return NextResponse.json(
      { error: "Erro ao excluir post." },
      { status: 500 }
    );
  }
}
