alter table public.activities
  add column if not exists slug text not null default '',
  add column if not exists faq_items jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

alter table public.activities
  drop constraint if exists activities_faq_items_array;
alter table public.activities
  add constraint activities_faq_items_array
  check (jsonb_typeof(faq_items) = 'array');

update public.activities
set slug = case sort_order
  when 1 then 'marketing-vs-branding'
  when 2 then 'why-advertising-does-not-increase-sales'
  when 3 then 'why-customers-dont-remember-good-products'
  when 4 then 'why-businesses-without-brand-compete-on-price'
  when 5 then 'brand-strategy-diagnosis'
  when 6 then 'how-branding-affects-sales'
  when 7 then 'branding-for-small-business'
  when 8 then 'when-to-rebrand'
  when 9 then 'what-is-brand-strategy'
  when 10 then 'brand-philosophy-vs-concept'
  when 11 then 'how-to-define-brand-purpose'
  when 12 then 'what-makes-beloved-brands-different'
  when 13 then 'how-to-create-brand-story'
  when 14 then 'brand-strategy-process'
  when 15 then 'brand-strategy-across-industries'
  when 16 then 'why-leaders-and-employees-learn-brand-strategy'
  when 17 then 'good-brand-name-criteria'
  when 18 then 'brand-naming-process'
  when 19 then 'product-name-vs-company-name'
  when 20 then 'memorable-brand-name'
  when 21 then 'before-brand-naming'
  when 22 then 'evaluate-brand-name-candidates'
  when 23 then 'what-brand-academy-teaches'
  when 24 then 'branding-education-for-leaders-or-practitioners'
  when 25 then 'what-changes-after-15-week-brand-course'
  when 26 then 'brand-course-for-different-industries'
  when 27 then 'why-local-business-owners-study-branding-in-seoul'
  when 28 then 'how-to-choose-brand-education'
  else slug
end
where slug = '' and sort_order between 1 and 28;

create unique index if not exists activities_slug_unique_idx
  on public.activities (slug) where slug <> '';

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists activities_set_updated_at on public.activities;
create trigger activities_set_updated_at
  before update on public.activities
  for each row execute function public.set_updated_at();
