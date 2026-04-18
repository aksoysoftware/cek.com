import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const prisma = (await import('@/lib/prisma')).default;
    const data = await prisma.certificate.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Certificates GET Error]', error);
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

    const certificate = await prisma.certificate.create({
      data: {
        name: body.name,
        issuer: body.issuer,
        fileUrl: body.fileUrl,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('[Certificates POST Error]', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
