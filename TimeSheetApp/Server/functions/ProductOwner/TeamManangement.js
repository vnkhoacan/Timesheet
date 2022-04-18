const query = require("../../sql-query/SQLQuery");

async function addTeam(
  team_name,
  team_description,
  project_id,
  manager_id,
  team_budget,
  team_amount
) {
  try {
    var team = await query(
      "insert into teams(team_name,team_description,project_id,manager_id,budget,team_amount) values('" +
        team_name +
        "','" +
        team_description +
        "'," +
        project_id +
        "," +
        manager_id +
        "," +
        team_budget +
        "," +
        team_amount +
        ");select @@IDENTITY AS 'identity'"
    );
    return team[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadTeam(member_id) {
  try {
    var records = await query(
      "select team_id,team_amount,team_name,team_description,project_name,p.project_id,t.manager_id,(select CONCAT(first_name,' ',last_name) from members where member_id=manager_id) manager_name,t.budget as team_budget from teams t inner join projects p on t.project_id=p.project_id where member_id=" +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function editTeam(
  team_id,
  team_name,
  team_description,
  manager_id,
  project_id,
  team_budget,
  team_amount
) {
  try {
    await query(
      "update teams set team_name='" +
        team_name +
        "',team_description='" +
        team_description +
        "',project_id=" +
        project_id +
        ",manager_id=" +
        manager_id +
        ",budget=" +
        team_budget +
        ",team_amount=" +
        team_amount +
        " where team_id=" +
        team_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteTeam(team_id) {
  try {
    await query(
      "delete tm from team_member tm where team_id=" +
        team_id +
        " delete t from teams t where team_id=" +
        team_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadManager(member_id) {
  try {
    var records = await query(
      "select m.member_id AS manager_id,CONCAT(first_name, ' ', last_name) AS manager_name,(case gender when 0 then 'Male' when 1 then 'Female' end)gender,created_on,email,department_name,position_name from  members m inner join position p on m.position_id=p.position_id inner join department d on m.department_id=d.department_id where permission='Manager' and email  like '%'+ (select RIGHT(email, LEN(email) - CHARINDEX('@', email))  from members m2 where m2.member_id=" +
        member_id +
        ")"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadProjectBudget(member_id) {
  try {
    var records = await query(
      "select p.project_id,project_name,project_description,p.budget- case when (select SUM(budget) from teams where project_id=p.project_id) is null then 0 else (select SUM(budget) from teams where project_id=p.project_id) end current_budget  from projects p where p.member_id=" +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  addTeam,
  loadTeam,
  editTeam,
  deleteTeam,
  loadManager,
  loadProjectBudget,
};
