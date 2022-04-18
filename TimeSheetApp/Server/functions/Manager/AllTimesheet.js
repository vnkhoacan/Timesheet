const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadTimesheetByManager(manager_id) {
  try {
    var records = await query(
      "select timesheet_id,t.employee_id,project_name,t.project_id,(FORMAT (time_in, 'HH:mm:ss dd/MM/yyyy')) as time_in,(FORMAT (time_out, 'HH:mm:ss dd/MM/yyyy')) as time_out,(DATEDIFF(second, '2021-01-22 14:12:29.750', '2021-01-22 17:12:29.750')/3600) AS hours,CONCAT(first_name,' ',last_name) as member_name,department_name,position_name from timesheet t inner join members m on t.employee_id=m.member_id inner join department d on d.department_id=m.department_id inner join position p on p.position_id=m.position_id inner join projects pj on t.project_id=pj.project_id where manager_id=" +
        manager_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function approveTimesheet(timesheet_id) {
  try {
    await query(
      "update timesheet set status=1 where timesheet_id=" + timesheet_id + ""
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { loadTimesheetByManager, approveTimesheet };
