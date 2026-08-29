# Capital Budgeting Analyst — Career Simulation

Simulated day-by-day career as a Capital Budgeting Analyst at a large integrated
energy company (Calgary). Each day's task and deliverables live under `sql/`
and `docs/`. Progress (title, salary, bonus, reviews) is tracked in
[`docs/CAREER_LOG.md`](docs/CAREER_LOG.md).

## Structure
- `supabase/` — Postgres schema and per-task SQL (views/queries) run against Supabase
- `html/` — front-end dashboards that read from Supabase for each task
- `docs/` — career log, annual reviews, business case write-ups

## Setup
1. Create tables: run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
2. (Optional, for local testing) Load sample rows: run [`supabase/seed.sql`](supabase/seed.sql).
3. Run each day's task SQL (e.g. [`supabase/day01_task1_capex_variance.sql`](supabase/day01_task1_capex_variance.sql)) to create its view — must run after step 1.
4. Open the matching HTML file (e.g. [`html/day01_task1_capex_variance.html`](html/day01_task1_capex_variance.html)) and fill in your Supabase project URL + anon key.
