const query = require("../../sql-query/SQLQuery");

async function loadTeamByMember(member_id, permission, project_id) {
  try {
    if (permission == "Manager") {
      var records = await query(
        "select team_name,project_name,avatar,CONCAT(first_name,' ',last_name) member_name,department_name,position_name,project_description from teams t inner join projects p on t.project_id=p.project_id  inner join team_member tm on tm.team_id=t.team_id inner join members m on m.member_id=tm.member_id inner join department d on d.department_id=m.department_id inner join position po on po.position_id=m.position_id where manager_id=" +
          member_id +
          "and t.project_id = " +
          project_id
      );

      var budget = await sumBudget(project_id, member_id);
      return { teamMember: records, budget: budget };
    } else if (permission == "Employee") {
      // var managerRecords = await query(
      //   "select team_name,project_name,CONCAT(first_name,' ',last_name) member_name,avatar,department_name,position_name,project_description from team_member tm inner join teams t on tm.team_id=t.team_id inner join projects p on p.project_id=t.project_id  inner join members m on t.manager_id=m.member_id inner join department d on d.department_id=m.member_id inner join position po on po.position_id=m.position_id where tm.member_id=" +
      //     member_id
      // );
      var managerRecords = await query("select t.manager_id,concat(first_name,' ',last_name) member_name,avatar,department_name,position_name from team_member tm inner join teams t on tm.team_id=t.team_id inner join members m on t.manager_id=m.member_id inner join department d on d.department_id=m.department_id inner join position po on po.position_id=m.position_id where tm.member_id="+member_id);
      var tmRecords = await query(
        "select team_name,project_name,CONCAT(first_name,' ',last_name) member_name,avatar,department_name,position_name,project_description from teams t inner join projects p on t.project_id=p.project_id   inner join team_member tm on tm.team_id=t.team_id  inner join members m on m.member_id=tm.member_id  inner join department d on d.department_id=m.department_id  inner join position po on po.position_id=m.position_id  where t.team_id like (select team_id from team_member where member_id=" +
          member_id +
          ")" +
          "and t.project_id = " +
          project_id
      );
      return { managerInfo: managerRecords[0], teamMember: tmRecords };
    }
    return [];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumBudget(project_id, manager_id) {
  try {
    var records = await query(
      "select budget-(select sum(expense_cost) sum_cost from expenses e where expense_status ='Approved' and project_id=" +
        project_id +
        " and manager_id=" +
        manager_id +
        ") sum_budget from teams where project_id=" +
        project_id +
        " and manager_id=" +
        manager_id
    );
    if (records[0].sum_budget) return records[0].sum_budget;
    else {
      var teams = await query(
        "select budget from teams where project_id = " +
          project_id +
          " and manager_id = " +
          manager_id
      );
      return teams[0].budget;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { loadTeamByMember, sumBudget };
