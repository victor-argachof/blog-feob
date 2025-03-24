import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/posts
 * Retorna a lista de posts.
 */
export async function GET() {
  try {
    const [posts] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json({ error: "Erro ao buscar posts." }, { status: 500 });
  }
}

/**
 * POST /api/posts
 * Cria um novo post.
 * Espera receber um JSON com os campos:
 * - title: string
 * - slug: string
 * - content: string
 * - category_id: number ou string (o id da categoria)
 * - cover_image: string (URL da imagem de capa)
 *
 * Campos como is_published, created_at e updated_at são gerenciados pelo banco via defaults.
 * O campo author_id está fixo para 1.
 */
export async function POST(request: Request) {
  try {
    const { title, slug, content, category_id, cover_image } = await request.json();

    // Validação básica dos campos
    if (!title || !slug || !content || !category_id) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const author_id = 1;
    const is_published = false;

    const query = `
      INSERT INTO posts (title, slug, content, cover_image, is_published, author_id, category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [title, slug, content, cover_image, is_published, author_id, category_id];

    const [result]: any = await db.query(query, values);

    return NextResponse.json({
      message: "Post criado com sucesso.",
      postId: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { error: "Erro ao criar post." },
      { status: 500 }
    );
  }
}
