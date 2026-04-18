import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Dummy contact endpoint — will connect to Google Sheets later
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik.' },
        { status: 400 }
      );
    }

    // Save to DB
    try {
      await prisma.contactMessage.create({
        data: { name, email, phone, subject, message },
      });
    } catch (dbError) {
      console.error('DB error storing message:', dbError);
      return NextResponse.json(
        { error: 'Mesajınız alınamadı, lütfen daha sonra tekrar deneyin.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla alındı.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Sunucu hatası.' },
      { status: 500 }
    );
  }
}
