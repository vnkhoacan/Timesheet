const query = require("../../sql-query/SQLQuery");

async function loadNoteByCalendar(member_id) {
  try {
    var monday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=1 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var tuesday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=2 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var wednesday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=3 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var thursday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=4 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var friday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=5 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var saturday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=6 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var sunday = await query(
      "SET DATEFIRST 1 SELECT note_id,title from notes where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,remind_date)=7 AND remind_date >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND remind_date <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    return { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadTaskByCalendar(member_id) {
  try {
    var monday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=1 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var tuesday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=2 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var wednesday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=3 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var thursday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=4 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var friday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=5 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var saturday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=6 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    var sunday = await query(
      "SET DATEFIRST 1 SELECT t.task_id,task_name from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and DATEPART(WEEKDAY,task_due)=7 AND task_due >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND task_due <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))"
    );
    console.log({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });
    return { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadCalendar(member_id) {
  try {
    var records = await query(
      "select t.task_id as id,t.task_name as title,t.task_description,t.task_start,t.task_due as start,task_status,t.task_priority from task t inner join member_task mt on t.task_id = mt.task_id where mt.member_id = " +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { loadNoteByCalendar, loadTaskByCalendar, loadCalendar };
