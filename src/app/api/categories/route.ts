export const dynamic = "force-dynamic";

import { CategoryService } from "@/services/categoryService";
import { NextResponse } from "next/server";

const categoryService = new CategoryService();

export async function GET() {
  try {
    const categories = await categoryService.findAll("name ASC");
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json({ error: "Erro ao buscar categorias." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const data = { name, slug };
    const result = await categoryService.create(data);
    return NextResponse.json({ message: "Categoria criada com sucesso.", categoryId: result.insertId });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json({ error: "Erro ao criar categoria." }, { status: 500 });
  }
}
