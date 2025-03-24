import { PostService } from "@/services/postService";
import { NextResponse } from "next/server";

const postService = new PostService();

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await postService.findById(params.id);
    if (!post) {
      return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json({ error: "Erro ao buscar post." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, slug, content, category_id, cover_image } = await request.json();

    if (!title || !slug || !content || !category_id) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const data = {
      title,
      slug,
      content,
      cover_image,
      category_id,
      updated_at: new Date(), // atualiza a data manualmente (ou use a função do BD)
    };

    await postService.update(params.id, data);
    return NextResponse.json({ message: "Post atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json({ error: "Erro ao atualizar post." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await postService.delete(params.id);
    return NextResponse.json({ message: "Post excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return NextResponse.json({ error: "Erro ao excluir post." }, { status: 500 });
  }
}
