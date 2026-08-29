/* ============================================================
   Day 1, Task 1 — Q2 Capex Actual vs. Budget Variance Pull
   Requested by: Director, Capital Planning
   Source: Finance Data Warehouse (Oracle) — CAPITAL_PROJECTS schema
   Deliverable: Project-level actual vs. budget capex for Q2,
                with variance $ and %, for tomorrow's review.
   ============================================================ */

-- Reference: assumed warehouse schema
-- CAPITAL_PROJECTS.PROJECT_MASTER   (PROJECT_ID, PROJECT_NAME, BUSINESS_UNIT, PROJECT_MANAGER, STATUS)
-- CAPITAL_PROJECTS.BUDGET_LINES     (PROJECT_ID, FISCAL_YEAR, FISCAL_QUARTER, BUDGET_AMOUNT)
-- CAPITAL_PROJECTS.ACTUAL_SPEND     (PROJECT_ID, FISCAL_YEAR, FISCAL_QUARTER, GL_DATE, ACTUAL_AMOUNT)

SELECT
    pm.PROJECT_ID,
    pm.PROJECT_NAME,
    pm.BUSINESS_UNIT,
    pm.PROJECT_MANAGER,
    b.BUDGET_AMOUNT,
    COALESCE(a.ACTUAL_AMOUNT, 0)                                   AS ACTUAL_AMOUNT,
    COALESCE(a.ACTUAL_AMOUNT, 0) - b.BUDGET_AMOUNT                 AS VARIANCE_AMOUNT,
    ROUND(
        (COALESCE(a.ACTUAL_AMOUNT, 0) - b.BUDGET_AMOUNT)
        / NULLIF(b.BUDGET_AMOUNT, 0) * 100, 1
    )                                                               AS VARIANCE_PCT
FROM CAPITAL_PROJECTS.PROJECT_MASTER pm
JOIN CAPITAL_PROJECTS.BUDGET_LINES b
    ON b.PROJECT_ID = pm.PROJECT_ID
   AND b.FISCAL_YEAR = 2026
   AND b.FISCAL_QUARTER = 2
LEFT JOIN (
    SELECT PROJECT_ID, FISCAL_YEAR, FISCAL_QUARTER, SUM(ACTUAL_AMOUNT) AS ACTUAL_AMOUNT
    FROM CAPITAL_PROJECTS.ACTUAL_SPEND
    WHERE FISCAL_YEAR = 2026
      AND FISCAL_QUARTER = 2
    GROUP BY PROJECT_ID, FISCAL_YEAR, FISCAL_QUARTER
) a
    ON a.PROJECT_ID = pm.PROJECT_ID
   AND a.FISCAL_YEAR = b.FISCAL_YEAR
   AND a.FISCAL_QUARTER = b.FISCAL_QUARTER
WHERE pm.STATUS = 'ACTIVE'
ORDER BY VARIANCE_PCT DESC NULLS LAST;

/* Next steps once results are pulled:
   1. Export to Excel.
   2. Flag any project with |VARIANCE_PCT| > 10% for commentary.
   3. Add a one-line explanation column for each flagged project
      before the variance review meeting. */
