# İş Takip Yönetim Paneli

Firmalardan gelen matbaa / üretim işlerini takip etmek için geliştirilmiş yönetim paneli.

**Stack:** React · Vite · TypeScript · Tailwind CSS · Lucide · Supabase · Vercel/Netlify

Tüm servisler ücretsiz planlarla kullanılabilir.

## Özellikler

- Giriş / çıkış (Supabase Auth)
- İş CRUD (ekle, düzenle, sil)
- Firma CRUD
- Firma bazlı gruplama (expand / collapse)
- Filtreleme (firma, ürün, tasarımcı, tasarım, baskı, fatura)
- Canlı istatistik kartları
- Türkçe fiyat formatı (`tr-TR`)
- Serbest metin adet alanı (`500 + 500`, `3000 X2`)
- Responsive sidebar + drawer

## 1. Projeyi klonlama

```bash
git clone <repo-url>
cd matbaaTakip
```

## 2. Bağımlılıkları kurma

```bash
npm install
```

## 3. Supabase oluşturma

1. [https://supabase.com](https://supabase.com) üzerinde ücretsiz proje oluşturun
2. **Authentication → Providers → Email** açık olsun
3. **Authentication → Users** üzerinden kendinize bir kullanıcı ekleyin

## 4. Schema çalıştırma

Supabase **SQL Editor** içinde sırasıyla çalıştırın:

1. `supabase/schema.sql`
2. `supabase/seed.sql` (opsiyonel örnek veri)

## 5. Environment

```bash
cp .env.example .env
```

`.env` içeriği:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_USE_MOCK=false
```

> **Service Role Key** asla frontend’e eklenmez.

### Demo / Mock mod

Supabase hazır değilse:

```env
VITE_USE_MOCK=true
```

Bu modda herhangi bir e-posta/şifre ile giriş yapılabilir; veriler tarayıcı belleğinde tutulur.

## 6. Geliştirme sunucusu

```bash
npm run dev
```

## 7. Production build

```bash
npm run build
npm run preview
```

## 8. Lint

```bash
npm run lint
```

## 9. Deployment (ücretsiz)

### Vercel

1. Repo’yu GitHub’a push edin
2. [vercel.com](https://vercel.com) → Import Project
3. Environment variables ekleyin (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_USE_MOCK=false`)
4. Deploy

### Netlify

1. Repo’yu GitHub’a push edin
2. [netlify.com](https://netlify.com) → Add new site
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Aynı env değişkenlerini ekleyin

SPA yönlendirme için Netlify’da `public/_redirects` dosyası mevcuttur; Vercel için `vercel.json` eklenmiştir.

## Proje yapısı

```text
src/
  components/     # UI + domain bileşenleri
  contexts/       # Auth & Toast
  hooks/
  layouts/
  lib/            # supabase client, mock data
  pages/
  services/       # API / CRUD
  types/
  utils/
supabase/
  schema.sql
  seed.sql
```

## Durum değerleri

| Alan | Değerler |
|------|----------|
| Tasarım | `baslanmadi`, `devam_ediyor`, `bitti` |
| Baskı | `baslanmadi`, `uretimde`, `baskida`, `bitti` |
| Fatura | `kesildi`, `kesilmedi` |

## Lisans

Kişisel kullanım için serbest.
