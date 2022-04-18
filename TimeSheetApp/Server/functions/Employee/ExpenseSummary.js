const query = require("../../sql-query/SQLQuery");

async function sumCostByMonth(employee_id, project_id) {
  try {
    var approval = await query(
      "SELECT  case when sum_cost is null then 0  else sum_cost end as sum_cost FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct SUM(expense_cost) AS sum_cost FROM expenses WHERE Datediff(mm,expense_date, dateadd(month, T.i, getdate())) = 0 and expense_status='Approved' and YEAR(expense_date)=YEAR(GETDATE()) and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " ) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    var waiting = await query(
      "SELECT  case when sum_cost is null then 0  else sum_cost end as sum_cost FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct SUM(expense_cost) AS sum_cost FROM expenses WHERE Datediff(mm,expense_date, dateadd(month, T.i, getdate())) = 0 and expense_status='Accepted' and YEAR(expense_date)=YEAR(GETDATE()) and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " ) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    var unapproval = await query(
      "SELECT  case when sum_cost is null then 0  else sum_cost end as sum_cost FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct SUM(expense_cost) AS sum_cost FROM expenses WHERE Datediff(mm,expense_date, dateadd(month, T.i, getdate())) = 0 and expense_status='Unapproved' and YEAR(expense_date)=YEAR(GETDATE()) and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " ) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    return { approval, waiting, unapproval };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumCostByDay(employee_id, project_id) {
  try {
    var approval = await query(
      "select expense_date,sum(expense_cost) sum_cost from expenses where expense_status='Approved' and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " group by expense_date order by expense_date asc"
    );
    var waiting = await query(
      "select expense_date,sum(expense_cost) sum_cost from expenses where expense_status='Accepted' and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " group by expense_date order by expense_date asc"
    );
    var unapproval = await query(
      "select expense_date,sum(expense_cost) sum_cost from expenses where expense_status='Unapproved' and employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " group by expense_date order by expense_date asc"
    );
    return { approval, waiting, unapproval };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function countExpense(employee_id, project_id) {
  try {
    var approval = await query(
      "select count(*) count_ex from expenses where employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " and expense_status='Approved'"
    );
    var waiting = await query(
      "select count(*) count_ex from expenses where employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " and expense_status='Accepted'"
    );
    var unapproval = await query(
      "select count(*) count_ex from expenses where employee_id=" +
        employee_id +
        " and project_id = " +
        project_id +
        " and expense_status='Unapproved'"
    );
    return { approval:approval[0].count_ex, unapproval:unapproval[0].count_ex, waiting:waiting[0].count_ex };
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { sumCostByMonth, sumCostByDay, countExpense };
