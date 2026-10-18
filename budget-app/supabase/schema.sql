-- ============================================================
-- Supabase (Postgres) schema — My Budget app
-- Run in the Supabase SQL editor, or via `supabase db push`.
--
-- Mirrors the data this app currently keeps in the browser's
-- localStorage (income setup, budget categories, account balance,
-- shifts, expenses), keyed by the signed-in user (auth.uid()).
-- ============================================================

-- One row per user: how they get paid.
create table if not exists public.income_config (
    user_id          uuid primary key references auth.users (id) on delete cascade,
    type             text not null check (type in ('salary', 'hourly')),
    frequency        text not null check (frequency in ('weekly', 'biweekly', 'semimonthly', 'monthly')),
    weekly_day       smallint check (weekly_day between 0 and 6),   -- weekly: 0=Sun..6=Sat
    biweekly_anchor  date,                                           -- biweekly: a known payday
    semimonthly_day  smallint check (semimonthly_day between 1 and 27), -- semimonthly: 1st payday's day of month
    monthly_day      text,                                           -- monthly: '1'..'31' or 'last'
    salary_amount    numeric(12, 2),                                 -- salary: amount per paycheck
    hourly_wage      numeric(12, 2),                                 -- hourly: $/hour
    updated_at       timestamptz not null default now()
);

-- Budget categories (the 50/30/20-style breakdown), each a percent of
-- income or a fixed dollar amount.
create table if not exists public.budget_categories (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users (id) on delete cascade,
    name        text not null,
    mode        text not null check (mode in ('percent', 'fixed')),
    value       numeric(12, 2) not null default 0,
    sort_order  int not null default 0,
    created_at  timestamptz not null default now()
);

-- Running account balance, one row per user.
create table if not exists public.account_balance (
    user_id     uuid primary key references auth.users (id) on delete cascade,
    balance     numeric(12, 2) not null default 0,
    updated_at  timestamptz not null default now()
);

-- Shifts worked (hourly earners).
create table if not exists public.shifts (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users (id) on delete cascade,
    work_date   date not null,
    time_in     time not null,
    time_out    time not null,
    hours       numeric(6, 2) not null,
    created_at  timestamptz not null default now()
);

-- Logged expenses, each tagged to a budget category.
create table if not exists public.expenses (
    id            uuid primary key default gen_random_uuid(),
    user_id       uuid not null references auth.users (id) on delete cascade,
    category_id   uuid references public.budget_categories (id) on delete set null,
    expense_date  date not null,
    amount        numeric(12, 2) not null,
    note          text,
    created_at    timestamptz not null default now()
);

-- Helpful indexes for the date-range lookups the app does constantly
-- (current pay period, calendar month, week-click stats).
create index if not exists idx_shifts_user_date on public.shifts (user_id, work_date);
create index if not exists idx_expenses_user_date on public.expenses (user_id, expense_date);
create index if not exists idx_budget_categories_user on public.budget_categories (user_id);

-- Keep updated_at current on edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger trg_income_config_updated_at
    before update on public.income_config
    for each row execute function public.set_updated_at();

create trigger trg_account_balance_updated_at
    before update on public.account_balance
    for each row execute function public.set_updated_at();

-- Row Level Security: each user can only read/write their own rows.
alter table public.income_config enable row level security;
alter table public.budget_categories enable row level security;
alter table public.account_balance enable row level security;
alter table public.shifts enable row level security;
alter table public.expenses enable row level security;

create policy "Owner full access" on public.income_config
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Owner full access" on public.budget_categories
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Owner full access" on public.account_balance
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Owner full access" on public.shifts
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Owner full access" on public.expenses
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
