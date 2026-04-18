import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const prisma = (await import('@/lib/prisma')).default;

    const reference = await prisma.reference.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        status: body.status,
        imageUrl: body.imageUrl,
        description: body.description,
      },
    });

    return NextResponse.json(reference);
  } catch (error) {
    console.error('[References PUT Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const prisma = (await import('@/lib/prisma')).default;

    // Soft delete
    await prisma.reference.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[References DELETE Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
