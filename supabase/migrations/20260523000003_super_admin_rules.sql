-- Drop old policies on approved_admin_emails
drop policy if exists "Allow admins to view approved emails" on public.approved_admin_emails;
drop policy if exists "Allow admins to manage approved emails" on public.approved_admin_emails;
drop policy if exists "Allow all admins to view approved emails" on public.approved_admin_emails;
drop policy if exists "Only allow Super Admins to manage approved emails" on public.approved_admin_emails;

-- Policy to allow all active admins to view pre-approved emails
create policy "Allow active admins to view approved emails" on public.approved_admin_emails
  for select to authenticated using (exists (select 1 from public.admins where admins.id = auth.uid()));

-- Policy to only allow Super Admins to manage (insert, update, delete) pre-approved emails
create policy "Only allow Super Admins to manage approved emails" on public.approved_admin_emails
  for all to authenticated using (
    exists (
      select 1 from public.admins 
      where admins.id = auth.uid() 
      and admins.role = 'Super Admin'
    )
  );

-- Drop old delete policy on admins
drop policy if exists "Allow admins to delete admin profiles" on public.admins;

-- Policy to only allow Super Admins to delete other admin profiles
create policy "Only allow Super Admins to delete admin profiles" on public.admins
  for delete to authenticated using (
    exists (
      select 1 from public.admins 
      where admins.id = auth.uid() 
      and admins.role = 'Super Admin'
    )
  );
