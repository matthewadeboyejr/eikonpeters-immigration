-- ──────────────────────────────────────────────
-- categories table
-- type = 'blog' | 'guide'
-- ──────────────────────────────────────────────
create table if not exists categories (
  id         bigserial primary key,
  name       text        not null,
  type       text        not null check (type in ('blog', 'guide')),
  created_at timestamptz not null default now()
);

-- Seed blog categories
insert into categories (name, type) values
  ('Global Talent Visa', 'blog'),
  ('Student Visa',       'blog'),
  ('Express Entry',      'blog'),
  ('Work Visa',          'blog'),
  ('Digital Nomad Visa', 'blog'),
  ('Immigration Policy', 'blog'),
  ('Lifestyle',          'blog');

-- Seed guide categories
insert into categories (name, type) values
  ('Visas',      'guide'),
  ('Education',  'guide'),
  ('Policy',     'guide'),
  ('Relocation', 'guide'),
  ('Checklist',  'guide');

-- RLS: public can read; admins can mutate
alter table categories enable row level security;

create policy "categories_public_read"
  on categories for select
  using (true);

create policy "categories_admin_insert"
  on categories for insert
  with check (
    auth.uid() in (select id from admins)
  );

create policy "categories_admin_update"
  on categories for update
  using (
    auth.uid() in (select id from admins)
  );

create policy "categories_admin_delete"
  on categories for delete
  using (
    auth.uid() in (select id from admins)
  );
