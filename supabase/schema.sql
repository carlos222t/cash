-- ============================================================
-- Supabase (Postgres) schema — Capital Projects
-- Run in the Supabase SQL editor, or via `supabase db push`.
-- ============================================================

create table if not exists public.project_master (
    project_id      bigint generated always as identity primary key,
    project_name    text not null,
    business_unit   text not null,
    project_manager text not null,
    status          text not null default 'ACTIVE'
);

create table if not exists public.budget_lines (
    id             bigint generated always as identity primary key,
    project_id     bigint not null references public.project_master (project_id),
    fiscal_year    int not null,
    fiscal_quarter int not null check (fiscal_quarter between 1 and 4),
    budget_amount  numeric(14, 2) not null
);

create table if not exists public.actual_spend (
    id             bigint generated always as identity primary key,
    project_id     bigint not null references public.project_master (project_id),
    fiscal_year    int not null,
    fiscal_quarter int not null check (fiscal_quarter between 1 and 4),
    gl_date        date not null,
    actual_amount  numeric(14, 2) not null
);

-- Row Level Security: enable and allow read-only access for authenticated users.
alter table public.project_master enable row level security;
alter table public.budget_lines enable row level security;
alter table public.actual_spend enable row level security;

create policy "Authenticated read" on public.project_master
    for select using (auth.role() = 'authenticated');
create policy "Authenticated read" on public.budget_lines
    for select using (auth.role() = 'authenticated');
create policy "Authenticated read" on public.actual_spend
    for select using (auth.role() = 'authenticated');
