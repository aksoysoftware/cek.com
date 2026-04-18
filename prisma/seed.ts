import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cek.com.tr';
  const adminPassword = process.env.ADMIN_PASSWORD || 'CekAdmin2024!';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'CEK Admin',
        role: 'admin',
      },
    });
    console.log(`Admin user created: ${adminEmail} (password: ${adminPassword})`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // Varsayılan dil çevirilerini DB'ye ekleyebilirdik ama şu anda lokal dosyalardan okunuyor.
  // Gelecek dönemde dinamik projeler ve sertifikalar da mock data testine dahil edilebilir.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
