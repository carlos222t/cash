-- ============================================================
-- Day 1, Task 1 — Q2 Capex Actual vs. Budget Variance
-- Supabase (Postgres) view, queried by html/day01_task1_capex_variance.html
-- ============================================================

create or replace view public.capex_variance_q2_2026 as
select
    pm.project_id,
    pm.project_name,
    pm.business_unit,
    pm.project_manager,
    b.budget_amount,
    coalesce(a.actual_amount, 0)                                        as actual_amount,
    coalesce(a.actual_amount, 0) - b.budget_amount                      as variance_amount,
    round(
        (coalesce(a.actual_amount, 0) - b.budget_amount)
        / nullif(b.budget_amount, 0) * 100, 1
    )                                                                    as variance_pct
from public.project_master pm
join public.budget_lines b
    on b.project_id = pm.project_id
   and b.fiscal_year = 2026
   and b.fiscal_quarter = 2
left join (
    select project_id, fiscal_year, fiscal_quarter, sum(actual_amount) as actual_amount
    from public.actual_spend
    where fiscal_year = 2026
      and fiscal_quarter = 2
    group by project_id, fiscal_year, fiscal_quarter
) a
    on a.project_id = pm.project_id
   and a.fiscal_year = b.fiscal_year
   and a.fiscal_quarter = b.fiscal_quarter
where pm.status = 'ACTIVE'
order by variance_pct desc nulls last;

-- Expose the view to the anon/authenticated roles used by the html dashboard.
grant select on public.capex_variance_q2_2026 to anon, authenticated;
