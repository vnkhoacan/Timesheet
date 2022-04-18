const query = require("../../sql-query/SQLQuery");

async function sumCostByDay(project_id, manager_id) {
  try {
    var members = await query(
      "select m.member_id,concat(first_name,' ',last_name) member_name from teams t inner join team_member tm on tm.team_id = t.team_id inner join members m on m.member_id = tm.member_id where t.manager_id = " +
        manager_id
    );

    for (var i in members) {
      var member = members[i];

      member.ex = await query(
        "select concat(first_name,' ',last_name) member_name, expense_date , sum(expense_cost) sum_cost  from expenses e inner join members m on m.member_id = e.employee_id where project_id= " +
          project_id +
          " and manager_id= " +
          manager_id +
          " and employee_id = " +
          member.member_id +
          " group by first_name,last_name,expense_date order by CONVERT(date, expense_date) asc;"
      );
    }
    return members;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumCostByMembers(project_id, manager_id) {
  try {
    var records = await query(
      "select employee_id,concat(m.first_name,' ',m.last_name) as member_name,sum(expense_cost) as sum_cost from expenses e inner join teams t on t.manager_id = e.manager_id inner join team_member tm on tm.team_id = t.team_id inner join members m on e.employee_id = m.member_id where e.manager_id = " +
        manager_id +
        " and e.project_id = " +
        project_id +
        " group by first_name,last_name,employee_id;"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function countExpense(project_id, manager_id) {
  try {
    var approval = await query(
      "select count(*) count_ex from expenses where project_id=" +
        project_id +
        " and expense_status = 'Approved' and manager_id=" +
        manager_id +
        ""
    );
    var waiting = await query(
      "select count(*) count_ex from expenses where project_id=" +
        project_id +
        " and expense_status = 'Accepted' and manager_id=" +
        manager_id +
        ""
    );
    var unapproval = await query(
      "select count(*) count_ex from expenses where project_id=" +
        project_id +
        " and expense_status = 'Unapproved' and manager_id=" +
        manager_id +
        ""
    );
    return {
      approval: approval[0].count_ex,
      waiting: waiting[0].count_ex,
      unapproval: unapproval[0].count_ex,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumCost(project_id, manager_id) {
  try {
    var approval = await query(
      "select sum(expense_cost) sum_cost from expenses where project_id=" +
        project_id +
        " and expense_status = 'Approved' and manager_id=" +
        manager_id +
        ""
    );
    var waiting = await query(
      "select sum(expense_cost) sum_cost from expenses where project_id=" +
        project_id +
        " and expense_status = 'Accepted' and manager_id=" +
        manager_id +
        ""
    );
    var unapproval = await query(
      "select sum(expense_cost) sum_cost from expenses where project_id=" +
        project_id +
        " and expense_status = 'Unapproved' and manager_id=" +
        manager_id +
        ""
    );
    return {
      approval: approval[0].sum_cost,
      waiting: waiting[0].sum_cost,
      unapproval: unapproval[0].sum_cost,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}


module.exports = { sumCostByDay, sumCostByMembers, countExpense , sumCost };
