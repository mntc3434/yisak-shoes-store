-- Products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  category text not null,   -- e.g. 'Running', 'Casual', 'Sports', 'Formal', 'Street', 'Limited'
  sizes jsonb not null,     -- e.g. [{"size": 40, "stock": 5}, {"size": 41, "stock": 3}]
  price numeric not null,
  description text,
  image_url text,
  is_visible boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table products enable row level security;

-- Public can only read visible products
create policy "Public read visible products" on products
  for select using (is_visible = true);

-- Only authenticated admins can do everything
create policy "Admin full access" on products
  for all using (auth.role() = 'authenticated');
