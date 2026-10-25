-- Re-grant EXECUTE on is_admin() to anon and authenticated.
-- The previous migration revoked it, but RLS policies call public.is_admin()
-- during every request, and the calling role needs EXECUTE permission to
-- invoke the function — even a SECURITY DEFINER one. Without it, every
-- query on projects/reviews/quotes/storage fails with
-- "permission denied for function is_admin".

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;