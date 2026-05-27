-- Grant table-level access so PostgREST can see the categories table.
-- RLS policies on their own are not enough; Postgres also needs explicit
-- GRANT privileges at the table level for the PostgREST roles.

GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.categories TO authenticated;

-- Admins also need INSERT / UPDATE / DELETE (RLS still enforces who can mutate)
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;

-- Let the sequence (used for id) be used by authenticated
GRANT USAGE, SELECT ON SEQUENCE public.categories_id_seq TO authenticated;
