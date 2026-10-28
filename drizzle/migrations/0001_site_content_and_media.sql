CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "content public read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "content admin write" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "media public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');
CREATE POLICY "media admin insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "media admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "media admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));