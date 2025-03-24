import { CategoryService } from "@/services/categoryService";
import { NextResponse } from "next/server";

const categoryService = new CategoryService();

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await categoryService.findById(params.id);
    if (!category) {
      return NextResponse.json({ error: "Categoria não encontrada." }, { status: 404 });
    }
    return NextResponse.json({ category });
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return NextResponse.json({ error: "Erro ao buscar categoria." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const data = { name, slug };
    await categoryService.update(params.id, data);
    return NextResponse.json({ message: "Categoria atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json({ error: "Erro ao atualizar categoria." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await categoryService.delete(params.id);
    return NextResponse.json({ message: "Categoria excluída com sucesso." });
  } catch (error: any) {
    console.error("Erro ao excluir categoria:", error);
    return NextResponse.json({ error: error.message || "Erro ao excluir categoria." }, { status: 500 });
  }
}
