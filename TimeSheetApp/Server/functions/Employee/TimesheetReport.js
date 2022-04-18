const query = require("../../sql-query/SQLQuery");

async function loadTimesheetByEmployee(employee_id) {
  try {
    var records = await query(
      "select timesheet_id,(FORMAT (time_in, 'HH:mm:ss dd/MM/yyyy')) as time_in,(FORMAT (time_out, 'HH:mm:ss dd/MM/yyyy')) as time_out,ABS(SUBSTRING(CAST(ROUND((DATEDIFF(second, time_in, time_out)*1.0/3600),3) AS varchar(38)),1,5)) AS hours,CONCAT(first_name,' ',last_name) as member_name from timesheet t inner join members m on t.employee_id=m.member_id where employee_id=" +
        employee_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function submitTimesheet(project_id, employee_id) {
  try {
    var records = await query(
      "select timesheet_id from timesheet where employee_id=" +
        employee_id +
        " and project_id=" +
        project_id +
        " and time_out is null"
    );
    if (records.length) {
      await query(
        "update timesheet set time_out=GETDATE() where employee_id=" +
          employee_id +
          " and project_id=" +
          project_id +
          " and time_out is null"
      );
    } else {
      await query(
        "insert into timesheet (employee_id,manager_id,project_id,time_in) values (" +
          employee_id +
          ",(select manager_id from team_member tm inner join teams t on tm.team_id=t.team_id where member_id=" +
          employee_id +
          " and project_id=" +
          project_id +
          ")," +
          project_id +
          ",GETDATE())"
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteTimesheet(timesheet_id) {
  try {
    await query("delete from timesheet where timesheet_id=" + timesheet_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateTimesheet(
  timesheet_id,
  work_date,
  timesheet_description,
  hours
) {
  try {
    await query(
      "update timesheet set work_date=convert(date,'" +
        work_date +
        "'), timesheet_description='" +
        timesheet_description +
        "',hours=" +
        hours +
        " where timesheet_id=" +
        timesheet_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  loadTimesheetByEmployee,
  submitTimesheet,
  deleteTimesheet,
  updateTimesheet,
};
