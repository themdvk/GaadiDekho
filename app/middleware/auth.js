import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function auth(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  return token;
}
