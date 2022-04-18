const query = require("../../sql-query/SQLQuery");

async function sumHoursByDay(project_id, manager_id) {
  try {
    var members = await query(
      "select m.member_id,concat(first_name,' ',last_name) member_name from teams t inner join team_member tm on tm.team_id = t.team_id inner join members m on m.member_id = tm.member_id where t.manager_id = " +
        manager_id
    );

    for (var i in members) {
      var member = members[i];

      member.ts = await query(
        "select concat(first_name,' ',last_name) member_name,CONVERT(date, time_in) work_date , sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours  from timesheet ts inner join members m on m.member_id = ts.employee_id where project_id= " +
          project_id +
          " and manager_id= " +
          manager_id +
          " and employee_id = " +
          member.member_id +
          " group by first_name,last_name, ts.time_in,ts.time_out order by CONVERT(date, time_in) asc;"
      );
    }
    return members;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumHoursByMembers(project_id, manager_id) {
  try {
    var records = await query(
      "select employee_id,concat(m.first_name,' ',m.last_name) as member_name,sum((DATEDIFF(second, ts.time_in, ts.time_out)/3600)) as sum_hours from timesheet ts inner join teams t on t.manager_id = ts.manager_id inner join team_member tm on tm.team_id = t.team_id inner join members m on ts.employee_id = m.member_id where ts.manager_id = " +
        manager_id +
        " and ts.project_id = " +
        project_id +
        " group by first_name,last_name,employee_id;"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function countTimesheet(project_id, manager_id) {
  try {
    var morning = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 6 and 13 and manager_id=" +
        manager_id +
        ""
    );
    var afternoon = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 13 and 17 and manager_id=" +
        manager_id +
        ""
    );
    var night = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 17 and 21 and manager_id=" +
        manager_id +
        ""
    );
    return {
      morning: morning[0].count_ts,
      afternoon: afternoon[0].count_ts,
      night: night[0].count_ts,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumHours(project_id, manager_id) {
  try {
    var morning = await query(
      "select sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 6 and 13 and manager_id=" +
        manager_id +
        ""
    );
    var afternoon = await query(
      "select sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 13 and 17 and manager_id=" +
        manager_id +
        ""
    );
    var night = await query(
      "select sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 17 and 21 and manager_id=" +
        manager_id +
        ""
    );
    return {
      morning: morning[0].sum_hours,
      afternoon: afternoon[0].sum_hours,
      night: night[0].sum_hours,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = { sumHoursByMembers, countTimesheet, sumHoursByDay, sumHours };
