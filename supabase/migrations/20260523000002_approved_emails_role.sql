-- Add role column to approved_admin_emails table
alter table public.approved_admin_emails add column role text default 'Admin' not null;

-- Update existing approved email matthewconsult@gmail.com to be Super Admin
update public.approved_admin_emails set role = 'Super Admin' where email = 'matthewconsult@gmail.com';

-- Update trigger function to copy the role from approved_admin_emails to admins
create or replace function public.handle_new_user()
returns trigger as $$
declare
  approved_role text;
begin
  select role into approved_role from public.approved_admin_emails where email = new.email;
  
  if approved_role is not null then
    insert into public.admins (id, email, name, role)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data->>'name', 'Admin User'),
      approved_role
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;
