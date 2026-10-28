-- Public registration via SECURITY DEFINER RPC (anon has no SELECT on registrations,
-- and must not be able to set status directly).
create or replace function public.submit_registration(
  _full_name text, _guardian_name text, _date_of_birth date,
  _nid_number text, _passport_number text, _mobile text,
  _address text, _package_slug text, _note text
) returns text
language plpgsql security definer set search_path = public as $$
declare _code text;
begin
  if coalesce(trim(_full_name), '') = '' or coalesce(trim(_mobile), '') = '' then
    raise exception 'name and mobile are required';
  end if;
  if not exists (select 1 from packages where slug = _package_slug and is_active) then
    raise exception 'invalid package';
  end if;
  insert into registrations (full_name, guardian_name, date_of_birth, nid_number,
    passport_number, mobile, address, package_slug, note)
  values (trim(_full_name), coalesce(_guardian_name, ''), _date_of_birth,
    coalesce(_nid_number, ''), coalesce(_passport_number, ''), trim(_mobile),
    coalesce(_address, ''), _package_slug, coalesce(_note, ''))
  returning code into _code;
  return _code;
end $$;

revoke all on function public.submit_registration(text,text,date,text,text,text,text,text,text) from public;
grant execute on function public.submit_registration(text,text,date,text,text,text,text,text,text) to anon, authenticated;

drop policy if exists "anyone can apply" on public.registrations;
drop policy if exists "auth can apply" on public.registrations;
revoke insert on public.registrations from anon;

-- Public image bucket for admin uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 5242880,
        array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update
set public = true,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media public read"  on storage.objects;
drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;

create policy "media public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site-media');
create policy "media admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "media admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "media admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));

-- has_role is only needed by signed-in users (RLS policies)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;
