-- Roles ---------------------------------------------------------------
create type public.app_role as enum ('admin', 'staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "users read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- Packages ------------------------------------------------------------
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_bn text not null,
  name_en text not null,
  tagline text not null default '',
  price numeric(12,0) not null default 0,
  duration text not null default '',
  hotel text not null default '',
  food text not null default '',
  transport text not null default '',
  training text not null default '',
  other_facilities text not null default '',
  details text not null default '',
  is_popular boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

grant select on public.packages to anon;
grant select, insert, update, delete on public.packages to authenticated;
grant all on public.packages to service_role;
alter table public.packages enable row level security;

create policy "packages public read" on public.packages for select to anon using (is_active);
create policy "packages auth read" on public.packages for select to authenticated using (true);
create policy "packages admin write" on public.packages for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Registrations -------------------------------------------------------
create sequence public.registration_seq start 1;

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default ('GBHK-' || lpad(nextval('public.registration_seq')::text, 3, '0')),
  full_name text not null,
  guardian_name text not null default '',
  date_of_birth date,
  nid_number text not null default '',
  passport_number text not null default '',
  mobile text not null,
  address text not null default '',
  package_slug text not null,
  note text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

grant insert on public.registrations to anon;
grant select, insert, update, delete on public.registrations to authenticated;
grant all on public.registrations to service_role;
grant usage on sequence public.registration_seq to anon, authenticated, service_role;
alter table public.registrations enable row level security;

create policy "anyone can apply" on public.registrations for insert to anon with check (true);
create policy "auth can apply" on public.registrations for insert to authenticated with check (true);
create policy "admin reads registrations" on public.registrations for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "admin updates registrations" on public.registrations for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "admin deletes registrations" on public.registrations for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Guides --------------------------------------------------------------
create table public.guides (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text not null default '',
  bio text not null default '',
  experience text not null default '',
  sort_order int not null default 0
);

grant select on public.guides to anon;
grant select, insert, update, delete on public.guides to authenticated;
grant all on public.guides to service_role;
alter table public.guides enable row level security;
create policy "guides public read" on public.guides for select to anon using (true);
create policy "guides auth read" on public.guides for select to authenticated using (true);
create policy "guides admin write" on public.guides for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Training topics -----------------------------------------------------
create table public.training_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  sort_order int not null default 0
);

grant select on public.training_topics to anon;
grant select, insert, update, delete on public.training_topics to authenticated;
grant all on public.training_topics to service_role;
alter table public.training_topics enable row level security;
create policy "topics public read" on public.training_topics for select to anon using (true);
create policy "topics auth read" on public.training_topics for select to authenticated using (true);
create policy "topics admin write" on public.training_topics for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Training schedule ---------------------------------------------------
create table public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  session_date date,
  session_time text not null default '',
  location text not null default '',
  topic text not null default '',
  instructor text not null default '',
  sort_order int not null default 0
);

grant select on public.training_sessions to anon;
grant select, insert, update, delete on public.training_sessions to authenticated;
grant all on public.training_sessions to service_role;
alter table public.training_sessions enable row level security;
create policy "sessions public read" on public.training_sessions for select to anon using (true);
create policy "sessions auth read" on public.training_sessions for select to authenticated using (true);
create policy "sessions admin write" on public.training_sessions for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Gallery -------------------------------------------------------------
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null default '',
  category text not null default 'our-hajj-journey',
  sort_order int not null default 0
);

grant select on public.gallery_images to anon;
grant select, insert, update, delete on public.gallery_images to authenticated;
grant all on public.gallery_images to service_role;
alter table public.gallery_images enable row level security;
create policy "gallery public read" on public.gallery_images for select to anon using (true);
create policy "gallery auth read" on public.gallery_images for select to authenticated using (true);
create policy "gallery admin write" on public.gallery_images for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Testimonials --------------------------------------------------------
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  pilgrim_name text not null,
  photo_url text not null default '',
  quote text not null,
  hajj_year text not null default '',
  sort_order int not null default 0
);

grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "testimonials public read" on public.testimonials for select to anon using (true);
create policy "testimonials auth read" on public.testimonials for select to authenticated using (true);
create policy "testimonials admin write" on public.testimonials for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Seed ----------------------------------------------------------------
insert into public.packages (slug, name_bn, name_en, tagline, price, duration, hotel, food, transport, training, other_facilities, details, is_popular, sort_order) values
('economy', 'ইকোনমি প্যাকেজ', 'Economy', 'আজিজিয়া আবাসন, সাশ্রয়ী ব্যবস্থাপনা', 480000, '৩৮ দিন', '৩ স্টার হোটেল, আজিজিয়া (হারাম থেকে ৮০০–১০০০ মিটার)', '৩ বেলা মানসম্মত দেশি খাবার', 'এসি বাস ও ট্রেন সার্ভিস', 'ঢাকায় ২টি পূর্ণ প্রশিক্ষণ ক্লাস', 'গ্রুপ গাইড সহায়তা, লাগেজ ব্যবস্থাপনা', 'সাশ্রয়ী বাজেটে পূর্ণ হজ ব্যবস্থাপনা। মক্কা ও মদিনায় নির্ধারিত আবাসন, অভিজ্ঞ গাইডসহ গ্রুপ পরিচালনা।', false, 1),
('standard', 'স্ট্যান্ডার্ড প্যাকেজ', 'Standard', 'হারাম শরীফের নিকটবর্তী আবাসন', 550000, '৩৫ দিন', '৪ স্টার হোটেল (হারাম থেকে ৪০০–৫০০ মিটার)', 'বুফে খাবার ব্যবস্থা', 'সৌদি এয়ারলাইন্স ও এসি ট্রান্সপোর্ট', 'ঢাকায় ৩টি পূর্ণ প্রশিক্ষণ ক্লাস', 'অভিজ্ঞ আলেম দ্বারা গাইড, ২৪ ঘণ্টা সহায়তা', 'হারাম শরীফের নিকটবর্তী আবাসনসহ সুসংগঠিত ব্যবস্থাপনা। অভিজ্ঞ আলেম গাইড ও বুফে খাবার।', true, 2),
('premium', 'প্রিমিয়াম প্যাকেজ', 'Premium', 'হারাম-সংলগ্ন ৫ স্টার আবাসন', 780000, '৩০ দিন', '৫ স্টার হোটেল, হারাম-সংলগ্ন (১০০–২০০ মিটার)', 'প্রিমিয়াম বুফে ও বাংলা খাবার', 'সরাসরি ফ্লাইট ও ভিআইপি ট্রান্সপোর্ট', 'ব্যক্তিগত ও গ্রুপ প্রশিক্ষণ', 'ভিআইপি সেবা, ২-৩ জনের কক্ষ, ব্যক্তিগত গাইড', 'সর্বোচ্চ সুবিধাসম্পন্ন প্যাকেজ। হারাম-সংলগ্ন আবাসন, ভিআইপি ট্রান্সপোর্ট ও ব্যক্তিগত গাইড সেবা।', false, 3);

insert into public.training_topics (title, content, sort_order) values
('হজের ফরজ', 'ইহরাম বাঁধা, আরাফাতে অবস্থান, তাওয়াফে জিয়ারত — হজের তিনটি ফরজ বিস্তারিতভাবে শেখানো হয়।', 1),
('ওয়াজিব ও সুন্নাহ', 'মুযদালিফায় অবস্থান, কুরবানি, মাথা মুণ্ডন, বিদায়ী তাওয়াফ এবং সুন্নাহভিত্তিক আমলসমূহ।', 2),
('তাওয়াফ', 'তাওয়াফের নিয়ম, সাত চক্করের ধারাবাহিকতা, হাতিমের সীমা ও দোয়া।', 3),
('সাঈ', 'সাফা ও মারওয়ার মাঝে সাঈ আদায়ের সঠিক পদ্ধতি ও দোয়া।', 4),
('আরাফাত', 'আরাফাতের দিনের গুরুত্ব, খুতবা, দোয়া ও করণীয়।', 5),
('মুযদালিফা', 'মুযদালিফায় রাত্রিযাপন, কঙ্কর সংগ্রহ ও ফজরের নামাজ।', 6),
('মিনা', 'কঙ্কর নিক্ষেপ, কুরবানি ও মিনায় অবস্থানের নিয়ম।', 7),
('গুরুত্বপূর্ণ দোয়া', 'তালবিয়া, তাওয়াফ ও সাঈর দোয়া এবং আরাফাতের দোয়াসমূহ মুখস্থ করানো হয়।', 8),
('হজের সাধারণ ভুল', 'নতুন হাজিদের সবচেয়ে সাধারণ ভুলগুলো ও তা এড়ানোর উপায়।', 9),
('সৌদি আরবের গাইডলাইন', 'সৌদি আরবের আইন, স্বাস্থ্যবিধি, নুসুক অ্যাপ ও প্রয়োজনীয় নির্দেশনা।', 10);

insert into public.training_sessions (title, session_date, session_time, location, topic, instructor, sort_order) values
('প্রশিক্ষণ ০১', '2026-03-14', 'সকাল ৯টা – দুপুর ১টা', 'কাফেলা কার্যালয়, মিডল আলিপুর, ফরিদপুর', 'হজের ফরজ, ওয়াজিব ও ইহরাম', 'মাওলানা আব্দুল হাকিম', 1),
('প্রশিক্ষণ ০২', '2026-04-11', 'সকাল ৯টা – দুপুর ১টা', 'কাফেলা কার্যালয়, মিডল আলিপুর, ফরিদপুর', 'তাওয়াফ, সাঈ ও ব্যবহারিক অনুশীলন', 'মুফতি সাইফুল ইসলাম', 2),
('প্রশিক্ষণ ০৩', '2026-05-09', 'সকাল ৯টা – বিকাল ৪টা', 'কাফেলা কার্যালয়, মিডল আলিপুর, ফরিদপুর', 'আরাফাত, মুযদালিফা, মিনা ও সৌদি গাইডলাইন', 'মাওলানা আব্দুল হাকিম', 3);

insert into public.guides (name, bio, experience, sort_order) values
('মাওলানা আব্দুল হাকিম', 'প্রধান হজ গাইড ও প্রশিক্ষক, গ্রীন বাংলা হজ কাফেলা।', '১৮ বছর ধরে হজ প্রশিক্ষণ পরিচালনা, ১৪ বার হজ পালন ও কাফেলা পরিচালনা।', 1),
('মুফতি সাইফুল ইসলাম', 'ফিকহ ও মাসআলা বিভাগের দায়িত্বপ্রাপ্ত আলেম।', '১২ বছর ধরে হজ ও উমরাহ প্রশিক্ষণ, ফিকহি মাসআলা সমাধানে অভিজ্ঞ।', 2),
('হাফেজ মনিরুজ্জামান', 'মদিনা টিম সমন্বয়ক ও গ্রুপ গাইড।', '৯ বছর ধরে মদিনায় হাজিদের সেবা ও জিয়ারত পরিচালনা।', 3);

insert into public.testimonials (pilgrim_name, quote, hajj_year, sort_order) values
('আব্দুর রহমান', 'প্রথমবার হজে গিয়েও মনে হয়নি আমি একা। প্রতিটি ধাপেই গাইড পাশে ছিলেন, সব কাগজপত্র আগেই সাজানো ছিল।', '২০২৫', 1),
('রাহিমা বেগম', 'বয়স্ক মানুষ হিসেবে চিন্তায় ছিলাম, কিন্তু হুইলচেয়ার থেকে খাবার পর্যন্ত সব ব্যবস্থা আগেই করা ছিল।', '২০২৫', 2),
('মোঃ হাসান আলী', 'ঢাকার প্রশিক্ষণ ক্লাসগুলো এত ভালো ছিল যে মক্কায় গিয়ে কোনো কিছু নতুন মনে হয়নি।', '২০২৪', 3);