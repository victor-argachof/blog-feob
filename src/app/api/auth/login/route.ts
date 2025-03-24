export const runtime = "nodejs";

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validação simples (opcional)
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // Buscando o usuário no banco pelo email
    const [users] = await db.query<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 });
    }
    const user = users[0];

    // Comparando a senha usando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }

    // Gerando um token JWT (verifique se JWT_SECRET está definido)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Criando a resposta com o token em cookie (httpOnly para segurança)
    const response = NextResponse.json({ message: 'Login realizado com sucesso' });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hora
    });

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ error: 'Erro ao processar login' }, { status: 500 });
  }
}
