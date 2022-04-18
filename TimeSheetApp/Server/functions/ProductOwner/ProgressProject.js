const query = require("../../sql-query/SQLQuery");

async function sumHoursByMonth(project_id) {
  try {
    var morning = await query(
      "SELECT  case when sum_hours is null then 0  else sum_hours end as sum_hours FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) AS sum_hours FROM timesheet WHERE Datediff(mm,time_out, dateadd(month, T.i, getdate())) = 0 and YEAR(time_in)=YEAR(GETDATE()) and project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 6 and 12 ) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    var afternoon = await query(
      "SELECT  case when sum_hours is null then 0  else sum_hours end as sum_hours FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) AS sum_hours FROM timesheet WHERE Datediff(mm,time_out, dateadd(month, T.i, getdate())) = 0 and YEAR(time_in)=YEAR(GETDATE()) and project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 12 and 17) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    var night = await query(
      "SELECT  case when sum_hours is null then 0  else sum_hours end as sum_hours FROM (VALUES (-11),(-10),(-9),(-8),(-7),(-6), (-5), (-4), (-3), (-2), (-1), (0)) AS T(i) OUTER APPLY ( SELECT distinct sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) AS sum_hours FROM timesheet WHERE Datediff(mm,time_out, dateadd(month, T.i, getdate())) = 0 and YEAR(time_in)=YEAR(GETDATE()) and project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 17 and 21 ) uf order by DATEPART(MM,convert(datetime,FORMAT(dateadd(MM, T.i, getdate()),'MMMM') +'01 2021',110))"
    );
    return { morning, afternoon, night };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function sumHoursByDay(project_id) {
  try {
    var morning = await query(
      "select CONVERT(date, time_in) work_date ,sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours  from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 6 and 12 group by CONVERT(date, time_in) order by CONVERT(date, time_in) asc"
    );
    var afternoon = await query(
      "select CONVERT(date, time_in) work_date ,sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours  from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 12 and 17 group by CONVERT(date, time_in) order by CONVERT(date, time_in) asc"
    );
    var night = await query(
      "select CONVERT(date, time_in) work_date ,sum(round(cast(DATEDIFF(minute,time_in,case when time_out is null then time_in else time_out end) as float)/ cast(60 as float),2)) sum_hours  from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 17 and 21 group by CONVERT(date, time_in) order by CONVERT(date, time_in) asc"
    );
    return { morning, afternoon, night };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function countTimesheet(project_id) {
  try {
    var morning = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 6 and 13"
    );
    var afternoon = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 13 and 17"
    );
    var night = await query(
      "select count(*) count_ts from timesheet where project_id=" +
        project_id +
        " and DATEPART(hh,time_in) between 17 and 21"
    );
    return { morning: morning[0].count_ts, afternoon: afternoon[0].count_ts, night: night[0].count_ts };
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { sumHoursByMonth, sumHoursByDay, countTimesheet };
