const query = require("../../sql-query/SQLQuery");
const MyTeam = require("../General/MyTeam");

async function loadExpenseByManager(project_id, manager_id) {
  try {
    var records = await query(
      "select distinct e.expense_id,purpose_or_reason,expense_status,expense_cost,expense_date,e.created_on,project_name,(select team_name from teams t inner join team_member tm on t.team_id=tm.team_id where project_id=e.project_id and manager_id=e.manager_id and tm.member_id=e.employee_id) as team_name,CONCAT(first_name,' ',last_name) member_name,department_name,position_name,expense_type,(select LEFT(Main.expenses,LEN(Main.expenses)-1) from (select distinct e2.expense_id,(select e1.expense_path +',' as [text()] from expense_image e1 where e1.expense_id=e2.expense_id order by e1.expense_id for XML PATH('') )[expenses] from expense_image e2 )[Main] where Main.expense_id=e.expense_id) as epath from expenses e inner join projects pj on pj.project_id=e.project_id inner join members m on m.member_id=e.employee_id inner join department d on d.department_id=m.department_id inner join position p on p.position_id=m.position_id where e.manager_id=" +
        manager_id +
        " and e.project_id=" +
        project_id
    );

    var budget = await MyTeam.sumBudget(project_id, manager_id);

    return { records, budget };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function submitExpense(expense_id, expense_status) {
  try {
    await query(
      "update expenses set expense_status='" +
        expense_status +
        "' where expense_id=" +
        expense_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { submitExpense, loadExpenseByManager };
