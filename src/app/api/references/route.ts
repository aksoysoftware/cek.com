import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const prisma = (await import('@/lib/prisma')).default;
    const data = await prisma.reference.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[References GET Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const prisma = (await import('@/lib/prisma')).default;

    const reference = await prisma.reference.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        status: body.status,
        imageUrl: body.imageUrl || null,
        description: body.description || null,
      },
    });

    return NextResponse.json(reference, { status: 201 });
  } catch (error) {
    console.error('[References POST Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
