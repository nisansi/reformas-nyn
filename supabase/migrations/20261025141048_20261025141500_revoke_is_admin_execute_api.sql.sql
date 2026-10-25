-- La función is_admin() se usa internamente por las políticas RLS
-- (que la invocan con privilegios del owner de la tabla, no del caller REST).
-- No es necesario que anon ni authenticated la ejecuten vía /rest/v1/rpc/is_admin,
-- lo que expondría un oráculo sobre quién es administrador.
-- Revocamos EXECUTE de PUBLIC, anon y authenticated para cerrar ese endpoint.
-- Las políticas RLS siguen funcionando porque se evalúan con los privilegios
-- del dueño de la tabla (que es owner de la función), no del rol del caller.

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM authenticated;
