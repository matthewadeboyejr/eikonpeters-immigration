-- Drop old profile view policy to prevent recursion/restrictions
drop policy if exists "Allow admins to view their own profile" on public.admins;

-- Create new policy to allow all authenticated admin users to list admin profiles
create policy "Allow authenticated users to view admin profiles" on public.admins
  for select to authenticated using (true);

-- Allow admins to delete other admins (except themselves if desired, but we can do it in the app)
create policy "Allow admins to delete admin profiles" on public.admins
  for delete to authenticated using (true);
