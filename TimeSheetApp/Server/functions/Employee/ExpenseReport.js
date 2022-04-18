const query = require("../../sql-query/SQLQuery");

async function addExpense(
  purpose_or_reason,
  project_id,
  expense_type,
  employee_id,
  expense_date,
  expense_cost
) {
  try {
    var identity = await query(
      "insert into expenses values('" +
        purpose_or_reason +
        "','Unapproved',getdate()," +
        project_id +
        ",'" +
        expense_type +
        "',(select top 1 manager_id from team_member tm inner join teams t on tm.team_id=t.team_id where member_id=" +
        employee_id +
        " and project_id=" +
        project_id +
        " )," +
        employee_id +
        ",convert(date,'" +
        expense_date +
        "')" +
        "," +
        expense_cost +
        ");select @@IDENTITY AS 'identity';"
    );
    return identity[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addExpenseImage(expense_id, expense_path) {
  try {
    await query(
      "insert into expense_image values(" +
        expense_id +
        ",'" +
        expense_path +
        "')"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteExpenseImage(expense_id) {
  try {
    await query("delete expense_image where expense_id=" + expense_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteExpense(expense_id) {
  try {
    await query("delete expenses where expense_id=" + expense_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadExpense(project_id, member_id) {
  try {
    var records = await query(
      "select distinct e.expense_id,purpose_or_reason,expense_status,expense_cost,(FORMAT (expense_date, 'yyyy/MM/dd')) as expense_date,e.created_on,project_name,(select team_name from teams t inner join team_member tm on t.team_id=tm.team_id where project_id=e.project_id and manager_id=e.manager_id and tm.member_id=e.employee_id) as team_name,CONCAT(first_name,' ',last_name) admin_name,expense_type,(select LEFT(Main.expenses,LEN(Main.expenses)-1) from (select distinct e2.expense_id,(select e1.expense_path +',' as [text()] from expense_image e1 where e1.expense_id=e2.expense_id order by e1.expense_id for XML PATH('') )[expenses] from expense_image e2 )[Main] where Main.expense_id=e.expense_id) as epath from expenses e inner join projects pj on pj.project_id=e.project_id inner join members m on m.member_id=e.manager_id where e.employee_id=" +
        member_id +
        " and e.project_id=" +
        project_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function editExpense(
  expense_id,
  purpose_or_reason,
  expense_type,
  expense_date,
  expense_cost
) {
  try {
    await query(
      "update expenses set purpose_or_reason='" +
        purpose_or_reason +
        "',expense_type='" +
        expense_type +
        "',expense_date='" +
        expense_date +
        "',expense_cost=" +
        expense_cost +
        " where expense_id=" +
        expense_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  addExpense,
  addExpenseImage,
  loadExpense,
  deleteExpenseImage,
  deleteExpense,
  editExpense,
};
