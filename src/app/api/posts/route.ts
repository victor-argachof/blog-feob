import { PostService } from "@/services/postService";
import { NextResponse } from "next/server";

const postService = new PostService();

export async function GET() {
  try {
    const posts = await postService.findAll("created_at DESC");
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json({ error: "Erro ao buscar posts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, slug, content, category_id, cover_image } = await request.json();

    if (!title || !slug || !content || !category_id) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const author_id = 1;
    const is_published = false;
    const data = { title, slug, content, cover_image, is_published, author_id, category_id };

    const result = await postService.create(data);
    return NextResponse.json({
      message: "Post criado com sucesso.",
      postId: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json({ error: "Erro ao criar post." }, { status: 500 });
  }
}
