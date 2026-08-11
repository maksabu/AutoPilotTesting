-- Run this in Supabase: Project -> SQL Editor -> New query -> paste -> Run

create table if not exists users (
  id bigint generated always as identity primary key,
  firstname text not null,
  lastname text not null,
  age int not null,
  role text not null
);

create table if not exists sessions (
  token text primary key,
  created_at timestamptz not null default now()
);

-- Seed sample data (matches the local test app you already used)
insert into users (firstname, lastname, age, role) values
  ('John', 'Smith', 34, 'Manager'),
  ('Priya', 'Nair', 29, 'Analyst'),
  ('Carlos', 'Diaz', 41, 'Admin');
