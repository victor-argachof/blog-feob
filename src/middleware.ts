import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se a rota acessada começa com /admin
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;

    // Se não houver token, redireciona para /login
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      // Utilizando o jose para verificar o token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
    } catch (err) {
      // Se a verificação falhar, redireciona para /login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Permite a continuação se tudo estiver correto
  return NextResponse.next();
}

// Configura o middleware para atuar nas rotas que começam com /admin
export const config = {
  matcher: ["/admin/:path*"],
};
