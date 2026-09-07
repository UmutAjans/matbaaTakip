-- Seed data for İş Takip Yönetim Paneli
-- Run AFTER schema.sql
-- Create your auth user from Supabase Auth UI before using the app.

insert into public.companies (id, name) values
  ('11111111-1111-1111-1111-111111111111', 'BAFURYA'),
  ('22222222-2222-2222-2222-222222222222', 'TEKNOMAT'),
  ('33333333-3333-3333-3333-333333333333', 'YEŞİL OFİS')
on conflict (name) do nothing;

insert into public.designers (id, name) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ayşe'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Can'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Elif')
on conflict (name) do nothing;

insert into public.jobs (
  company_id, product_description, quantity, designer_id,
  design_status, print_status, price, invoice_status, note
) values
  ('11111111-1111-1111-1111-111111111111', 'KADİFE KALEM', '1.000', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bitti', 'bitti', 12500, 'kesilmedi', 'Logolu üretim'),
  ('11111111-1111-1111-1111-111111111111', 'ROZET', '500 + 500', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bitti', 'bitti', 8500, 'kesilmedi', 'Metal rozet'),
  ('11111111-1111-1111-1111-111111111111', 'DİPLOMAT ZARF', '2.000', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bitti', 'bitti', 4200, 'kesilmedi', 'Kabartmalı'),
  ('11111111-1111-1111-1111-111111111111', 'T BAYRAK', '50', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bitti', 'bitti', 9800, 'kesilmedi', 'Masa bayrağı'),
  ('11111111-1111-1111-1111-111111111111', 'KARTON BARDAK', '3000 X2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bitti', 'baskida', 15600, 'kesilmedi', '2 renk baskı'),
  ('11111111-1111-1111-1111-111111111111', 'PLASTİK BARDAK VE KPK.', '5.000', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bitti', 'bitti', 22000, 'kesilmedi', 'KPK dahil'),
  ('11111111-1111-1111-1111-111111111111', 'A5 DEFTER - ING.', '250', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bitti', 'bitti', 18750, 'kesilmedi', null),
  ('11111111-1111-1111-1111-111111111111', 'ÜRÜN ETİKETİ', '10.000', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bitti', 'bitti', 6400, 'kesilmedi', 'Yapışkanlı'),
  ('11111111-1111-1111-1111-111111111111', 'KARTELA', '100', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bitti', 'bitti', 3200, 'kesilmedi', null),
  ('22222222-2222-2222-2222-222222222222', 'KARTVİZİT', '1.000', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'devam_ediyor', 'baslanmadi', 2500, 'kesilmedi', 'Mat selefon'),
  ('22222222-2222-2222-2222-222222222222', 'BROŞÜR A4', '500', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'devam_ediyor', 'baslanmadi', 7800, 'kesilmedi', 'Çift taraflı'),
  ('22222222-2222-2222-2222-222222222222', 'ROLL UP BANNER', '3', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bitti', 'uretimde', 4500, 'kesildi', null),
  ('33333333-3333-3333-3333-333333333333', 'ANTETLİ KAĞIT', '2.000', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'devam_ediyor', 'baslanmadi', 5600, 'kesilmedi', '80gr'),
  ('33333333-3333-3333-3333-333333333333', 'SERTİFİKA', '100', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bitti', 'bitti', 1800, 'kesildi', 'Kabartma damga'),
  ('33333333-3333-3333-3333-333333333333', 'KUTU ETİKETİ', '5.000', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bitti', 'baskida', 9200, 'kesilmedi', null);
