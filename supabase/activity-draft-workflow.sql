alter table public.activities add column status text not null default 'published' check (status in ('draft','published')), add column category text not null default '브랜드 인사이트', add column geo_questions text not null default '', add column content_outline text not null default '', add column editorial_notes text not null default '';
alter table public.activities alter column status set default 'draft';
drop policy "activities read" on public.activities;
create policy "activities read" on public.activities for select to anon, authenticated using (status = 'published');
