-- İş Takip Yönetim Paneli - Schema
-- Run this in Supabase SQL Editor

-- Extensions
create extension if not exists "pgcrypto";

-- Companies
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Designers
create table if not exists public.designers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Jobs
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete restrict,
  product_description text not null,
  quantity text not null,
  designer_id uuid not null references public.designers(id) on delete restrict,
  design_status text not null default 'baslanmadi'
    check (design_status in ('baslanmadi', 'devam_ediyor', 'bitti')),
  print_status text not null default 'baslanmadi'
    check (print_status in ('baslanmadi', 'uretimde', 'baskida', 'bitti')),
  price numeric(12, 2),
  invoice_status text not null default 'kesilmedi'
    check (invoice_status in ('kesildi', 'kesilmedi')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Profiles (optional, linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_jobs_company_id on public.jobs(company_id);
create index if not exists idx_jobs_designer_id on public.jobs(designer_id);
create index if not exists idx_jobs_design_status on public.jobs(design_status);
create index if not exists idx_jobs_print_status on public.jobs(print_status);
create index if not exists idx_jobs_invoice_status on public.jobs(invoice_status);
create index if not exists idx_jobs_product_description on public.jobs using gin (to_tsvector('simple', product_description));
create index if not exists idx_companies_name on public.companies(name);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_companies_updated_at on public.companies;
create trigger trg_companies_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists trg_designers_updated_at on public.designers;
create trigger trg_designers_updated_at
before update on public.designers
for each row execute function public.set_updated_at();

drop trigger if exists trg_jobs_updated_at on public.jobs;
create trigger trg_jobs_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RLS
alter table public.companies enable row level security;
alter table public.designers enable row level security;
alter table public.jobs enable row level security;
alter table public.profiles enable row level security;

-- Authenticated users can full CRUD (single-user / trusted users app)
drop policy if exists "Authenticated read companies" on public.companies;
create policy "Authenticated read companies"
  on public.companies for select
  to authenticated
  using (true);

drop policy if exists "Authenticated insert companies" on public.companies;
create policy "Authenticated insert companies"
  on public.companies for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update companies" on public.companies;
create policy "Authenticated update companies"
  on public.companies for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete companies" on public.companies;
create policy "Authenticated delete companies"
  on public.companies for delete
  to authenticated
  using (true);

drop policy if exists "Authenticated read designers" on public.designers;
create policy "Authenticated read designers"
  on public.designers for select
  to authenticated
  using (true);

drop policy if exists "Authenticated insert designers" on public.designers;
create policy "Authenticated insert designers"
  on public.designers for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update designers" on public.designers;
create policy "Authenticated update designers"
  on public.designers for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete designers" on public.designers;
create policy "Authenticated delete designers"
  on public.designers for delete
  to authenticated
  using (true);

drop policy if exists "Authenticated read jobs" on public.jobs;
create policy "Authenticated read jobs"
  on public.jobs for select
  to authenticated
  using (true);

drop policy if exists "Authenticated insert jobs" on public.jobs;
create policy "Authenticated insert jobs"
  on public.jobs for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update jobs" on public.jobs;
create policy "Authenticated update jobs"
  on public.jobs for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete jobs" on public.jobs;
create policy "Authenticated delete jobs"
  on public.jobs for delete
  to authenticated
  using (true);

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
