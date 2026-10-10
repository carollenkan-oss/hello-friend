-- Supabase schema for when the site moves off local data files.
-- Tables mirror src/data/*. The functions in src/lib/api.js are the only
-- place that needs to change to read from these tables instead.

create table countries (
  id text primary key,            -- 'uganda'
  name text not null,
  tone text,                      -- hex colour used in the design
  headline text,
  intro text,
  regions text[] default '{}',
  note text                       -- safety or access note
);

create table paths (
  id text primary key,            -- 'sacred' | 'heritage' | 'culture' | 'immersion' | 'fun'
  name text not null,
  title text,
  headline text,
  tagline text,
  overview text[] default '{}',
  points text[] default '{}'
);

create table peoples (
  slug text primary key,
  name text not null unique,
  countries text[] not null,      -- first entry is the primary country
  region text,
  language text,
  known_for text,
  "where" text,
  names text, food text, worship text, dress text, life text, today text
);

create table packages (
  slug text primary key,
  name text not null,
  country text references countries(id),
  region text,
  days int not null,
  paths text[] not null,          -- references paths.id
  peoples text[] default '{}',    -- references peoples.name
  faiths text[] default '{}',
  best_time text,
  offbeat boolean default false,
  summary text,
  overview text,
  highlights text[] default '{}',
  itinerary jsonb not null,       -- [{ title, morning, afternoon, evening }]
  stay text,
  included text,
  good_to_know text,
  combine text[] default '{}',    -- package slugs
  image text,
  price_from numeric,
  published boolean default true
);

create table sites (
  id bigint generated always as identity primary key,
  name text not null,
  country text references countries(id),
  region text,
  type text,                      -- Sacred | Cultural | Lost
  story text,
  package text references packages(slug)
);

create table enquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text, email text, phone text, residence text,
  who text, size int, "when" text, country text, package text,
  observances text, message text
);

create index packages_country_idx on packages(country);
create index packages_paths_idx on packages using gin(paths);
create index packages_peoples_idx on packages using gin(peoples);

-- Public read access for the website, writes only via the dashboard or service role
alter table countries enable row level security;
alter table paths enable row level security;
alter table peoples enable row level security;
alter table packages enable row level security;
alter table sites enable row level security;
alter table enquiries enable row level security;

create policy "public read" on countries for select using (true);
create policy "public read" on paths for select using (true);
create policy "public read" on peoples for select using (true);
create policy "public read published" on packages for select using (published);
create policy "public read" on sites for select using (true);
create policy "anyone can enquire" on enquiries for insert with check (true);
