-- Create a SECURITY DEFINER function that allows anonymous users to check
-- if their email is pre-approved, without exposing the approved_admin_emails table.
create or replace function public.is_email_approved(input_email text)
returns boolean as $$
begin
  return exists (
    select 1 from public.approved_admin_emails
    where email = lower(trim(input_email))
  );
end;
$$ language plpgsql security definer;

-- Grant execute permission to unauthenticated (anon) visitors for pre-signup validation
grant execute on function public.is_email_approved(text) to anon;
grant execute on function public.is_email_approved(text) to authenticated;
