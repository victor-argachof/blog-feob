import { NextResponse } from "next/server";

/**
 * API Route para logout.
 * Remove o cookie de autenticação (token) definindo seu maxAge como negativo.
 */
export async function POST() {
  // Cria uma resposta JSON informando que o logout foi realizado com sucesso
  const response = NextResponse.json({ message: "Logout realizado com sucesso" });
  // Remove o cookie "token"
  response.cookies.set("token", "", { maxAge: -1 });
  return response;
}
