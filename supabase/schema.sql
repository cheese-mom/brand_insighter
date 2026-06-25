-- ============================================================
-- brand_insighter — Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- ============================================================

-- 1) 사이트 콘텐츠 (싱글톤 행: id = 'main')
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2) Activity 게시글
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  date text not null default '',
  title text not null default '',
  excerpt text not null default '',
  body text not null default '',
  thumbnail text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- 공개: 읽기 허용 / 쓰기: 로그인(authenticated) 사용자만
-- ============================================================
alter table public.site_content enable row level security;
alter table public.activities enable row level security;

-- site_content
drop policy if exists "site_content read" on public.site_content;
create policy "site_content read" on public.site_content
  for select using (true);

drop policy if exists "site_content write" on public.site_content;
create policy "site_content write" on public.site_content
  for all to authenticated using (true) with check (true);

-- activities
drop policy if exists "activities read" on public.activities;
create policy "activities read" on public.activities
  for select using (true);

drop policy if exists "activities write" on public.activities;
create policy "activities write" on public.activities
  for all to authenticated using (true) with check (true);

-- 기본 콘텐츠 행 생성 (없을 때만)
insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- ============================================================
-- Storage: 이미지 버킷 'media' (공개 읽기)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media authenticated write" on storage.objects;
create policy "media authenticated write" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media authenticated update" on storage.objects;
create policy "media authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media authenticated delete" on storage.objects;
create policy "media authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- ============================================================
-- Contact 폼 제출 내역
-- 제출(insert)은 공개(anon) 허용 / 조회·수정·삭제는 로그인 관리자만
-- ============================================================
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  company text not null default '',
  email text not null default '',
  help_type text not null default '',
  message text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "contact insert public" on public.contact_submissions;
create policy "contact insert public" on public.contact_submissions
  for insert to anon, authenticated with check (true);

drop policy if exists "contact read admin" on public.contact_submissions;
create policy "contact read admin" on public.contact_submissions
  for select to authenticated using (true);

drop policy if exists "contact update admin" on public.contact_submissions;
create policy "contact update admin" on public.contact_submissions
  for update to authenticated using (true) with check (true);

drop policy if exists "contact delete admin" on public.contact_submissions;
create policy "contact delete admin" on public.contact_submissions
  for delete to authenticated using (true);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- ============================================================
-- 어드민 계정 생성:
-- Supabase 대시보드 > Authentication > Users > "Add user" 에서
-- 이메일/비밀번호로 직접 생성하세요. (공개 회원가입은 사용하지 않음)
-- 대시보드 > Authentication > Providers 에서 Email 활성화 + "Confirm email" 끄기 권장.
-- ============================================================
