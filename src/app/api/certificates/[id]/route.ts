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

    const certificate = await prisma.certificate.update({
      where: { id: params.id },
      data: {
        name: body.name,
        issuer: body.issuer,
        fileUrl: body.fileUrl,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('[Certificates PUT Error]', error);
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

    await prisma.certificate.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Certificates DELETE Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
