# Klima Sitesi — Temel Mimari

## Backend Hakkında (Kısa Cevap)

Evet, bu projede backend vardır. Backend, Next.js 14 App Router üzerinde çalışan API Routes ile sağlanmaktadır. Veri erişimi Prisma aracılığıyla PostgreSQL veritabanına yapılır; kimlik doğrulama için NextAuth kullanılır. Geliştirme/çalıştırma için Docker Compose yapılandırması mevcuttur. Nasıl ayağa kaldırılacağına dair adımlar için kök dizindeki “OKU,” dosyasındaki “Backend Nasıl Ayağa Kalkar?” bölümüne bakınız.

Not: Bu dosyada yer alan Supabase referansları önceki bir taslaktan kalmıştır. Mevcut kurulum Prisma + PostgreSQL + NextAuth + Next.js API Routes üzerinedir.

### Güncel Stack Özeti

- Uygulama: Next.js 14 (App Router, TypeScript)
- Backend: Next.js API Routes (src/app/api)
- ORM: Prisma (./prisma)
- Veritabanı: PostgreSQL (docker-compose ile db servisi)
- Kimlik Doğrulama: NextAuth
- Çalıştırma: Docker/Docker Compose veya lokal Node.js

Örnek API uç noktaları:
- GET/POST: /api/references, GET/PUT/DELETE: /api/references/[id]
- GET/POST: /api/certificates, GET/PUT/DELETE: /api/certificates/[id]
- POST: /api/contact (iletişim formu)
- GET/POST/DELETE: /api/messages (yönetim mesajları)

## Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend + Backend | Next.js 14 (App Router, TypeScript) |
| Veritabanı | PostgreSQL (Prisma ile) |
| Auth | NextAuth |
| Dosya Depolama | Public klasör / (gerektiğinde) harici servis |
| Deploy | Vercel / Docker tabanlı ortam |

---

## Klasör Yapısı

```
/
├── app/
│   ├── (public)/               # Ziyaretçi sayfaları
│   │   ├── page.tsx            # Anasayfa (statik)
│   │   ├── kurumsal/page.tsx   # Kurumsal (statik)
│   │   ├── iletisim/page.tsx   # İletişim (statik)
│   │   ├── referanslar/
│   │   │   ├── page.tsx        # Liste (SSG)
│   │   │   └── [slug]/page.tsx # Detay (SSG)
│   │   └── sertifikalar/
│   │       └── page.tsx        # Liste (ISR)
│   │
│   ├── (admin)/                # Admin sayfaları (auth korumalı)
│   │   └── admin/
│   │       ├── layout.tsx      # Auth kontrolü burada
│   │       ├── page.tsx        # Dashboard
│   │       ├── references/page.tsx
│   │       └── certificates/page.tsx
│   │
│   └── api/                    # API Route'ları
│       ├── references/route.ts
│       └── certificates/route.ts
│
├── lib/
│   └── supabase.ts             # Supabase client
│
├── middleware.ts               # /admin koruması
└── .env.local
```

---

## Veritabanı

```sql
-- Referanslar
CREATE TABLE references (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  category    TEXT CHECK (category IN ('otomasyon', 'satis', 'servis')) NOT NULL,
  status      TEXT CHECK (status IN ('biten', 'devam')) NOT NULL,
  image_url   TEXT,
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Sertifikalar
CREATE TABLE certificates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  issuer      TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  valid_until DATE,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

**RLS:**

```sql
ALTER TABLE references ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_references" ON references
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_certificates" ON certificates
  FOR SELECT USING (is_active = true);

CREATE POLICY "admin_all_references" ON references
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_certificates" ON certificates
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## Supabase Storage

```
references/    → public bucket   (referans görselleri)
certificates/  → private bucket  (sertifika PDF'leri, signed URL ile serve)
```

---

## API Route'ları

| Method | Path | Açıklama | Auth |
|--------|------|----------|------|
| GET | `/api/references` | Liste, `?category=&status=` filtreli | Hayır |
| POST | `/api/references` | Yeni kayıt | Evet |
| PUT | `/api/references/[id]` | Güncelle | Evet |
| DELETE | `/api/references/[id]` | Soft delete | Evet |
| GET | `/api/certificates` | Liste | Hayır |
| POST | `/api/certificates` | Yeni kayıt | Evet |
| PUT | `/api/certificates/[id]` | Güncelle | Evet |
| DELETE | `/api/certificates/[id]` | Soft delete | Evet |

---

## Auth & Middleware

```typescript
// middleware.ts
export const config = { matcher: ['/admin/:path*'] }

export async function middleware(req: NextRequest) {
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
```

Admin girişi: Supabase Dashboard'dan yetkili e-posta eklenir, magic link ile giriş yapılır.

---

## Sayfa Render Stratejisi

| Sayfa | Strateji | Güncelleme |
|-------|----------|------------|
| Anasayfa | Static | Deploy'da |
| Kurumsal | Static | Deploy'da |
| İletişim | Static | Deploy'da |
| Referanslar listesi | SSG | Deploy'da |
| Referans detay | SSG + `generateStaticParams` | Deploy'da |
| Sertifikalar | ISR (revalidate: 3600) | Her saat |
| Admin sayfaları | Dynamic (SSR) | Her istekte |

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx   # sadece server-side API route'larında
```

---

## Geliştirme Sırası

1. Supabase proje kurulumu → tablolar + RLS + storage bucket'ları
2. `lib/supabase.ts` client kurulumu
3. Statik sayfalar (anasayfa, kurumsal, iletişim)
4. Referanslar public liste + detay sayfası
5. Sertifikalar public liste sayfası
6. Admin layout + auth (middleware)
7. Admin referans CRUD sayfası
8. Admin sertifika CRUD + dosya yükleme sayfası
9. Vercel deploy + environment variables
