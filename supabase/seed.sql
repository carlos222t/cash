-- ============================================================
-- Sample data for local testing — run after schema.sql
-- ============================================================

insert into public.project_master (project_name, business_unit, project_manager, status) values
    ('Oil Sands Sustaining Capital',      'Upstream',    'J. Whitfield', 'ACTIVE'),
    ('Refinery Turnaround — Unit 3',      'Downstream',  'M. Okafor',    'ACTIVE'),
    ('Pipeline Integrity Program',        'Midstream',   'R. Deschamps', 'ACTIVE'),
    ('Renewable Diesel Expansion',        'Low Carbon',  'A. Singh',     'ACTIVE'),
    ('Retail Site Modernization',         'Downstream',  'K. Bouchard',  'ACTIVE');

insert into public.budget_lines (project_id, fiscal_year, fiscal_quarter, budget_amount) values
    (1, 2026, 2, 12000000),
    (2, 2026, 2, 8500000),
    (3, 2026, 2, 4200000),
    (4, 2026, 2, 15000000),
    (5, 2026, 2, 2100000);

insert into public.actual_spend (project_id, fiscal_year, fiscal_quarter, gl_date, actual_amount) values
    (1, 2026, 2, '2026-05-15', 13450000),  -- over budget
    (2, 2026, 2, '2026-05-20', 8100000),   -- under budget
    (3, 2026, 2, '2026-06-01', 4300000),   -- roughly on budget
    (4, 2026, 2, '2026-06-10', 18200000),  -- significantly over
    (5, 2026, 2, '2026-05-28', 1650000);   -- significantly under
