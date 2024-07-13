import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, nameFull, password } = body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        nameFull,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'User created successfully', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
