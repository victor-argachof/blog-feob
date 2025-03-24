export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/categories
 * Retorna a lista de categorias.
 */
export async function GET() {
  try {
    const [categories] = await db.query("SELECT * FROM categories ORDER BY name ASC");
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json({ error: "Erro ao buscar categorias." }, { status: 500 });
  }
}

/**
 * POST /api/categories
 * Cria uma nova categoria.
 * Espera um JSON com { name, slug }.
 */
export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }
    const query = "INSERT INTO categories (name, slug) VALUES (?, ?)";
    const [result]: any = await db.query(query, [name, slug]);
    return NextResponse.json({ message: "Categoria criada com sucesso.", categoryId: result.insertId });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json({ error: "Erro ao criar categoria." }, { status: 500 });
  }
}
