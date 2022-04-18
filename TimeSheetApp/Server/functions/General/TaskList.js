const query = require("../../sql-query/SQLQuery");
const Taskboard = require("../General/Taskboard");

async function editTaskStatus(task_id, task_status, member_id) {
  try {
    await query(
      "update member_task set task_status=" +
        task_status +
        " where task_id=" +
        task_id +
        "and member_id = " +
        member_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadAllTask(member_id, list_id) {
  try {
    var records = await query(
      "select t.task_id,task_name,task_due,task_start,task_description,task_priority from task t inner join member_task mt on t.task_id=mt.task_id where member_id=" +
        member_id +
        " and list_id=" +
        list_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadAllList(member_id) {
  try {
    var records = await query(
      "select distinct lt.list_id,title from list_task lt inner join task t on lt.list_id=t.list_id  inner join member_task mt on t.task_id=mt.task_id where mt.member_id=" +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadBoardMember(task_id) {
  try {
    var records = await query(
      "select m.member_id,concat(first_name,' ',last_name) member_name,avatar from members m inner join member_task mt on mt.member_id = m.member_id inner join task t on t.task_id = mt.task_id where t.task_id = " +
        task_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadTaskStatus(task_id) {
  try {
    var records = await query(
      "select task_id,CASE WHEN exists (select * from member_task where task_status=0 and task_id=" +
        task_id +
        ") then 0 else 1 END task_status from task where task_id=" +
        task_id
    );
    return records[0].task_status;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadTaskList(member_id) {
  try {
    var taskList = await loadAllList(member_id);
    for (var i in taskList) {
      var taskListItem = taskList[i];
      var tasks = await loadAllTask(member_id, taskListItem.list_id);
      taskListItem.tasks = tasks;
      for (var j in tasks) {
        var task = tasks[j];
        task.comments = await Taskboard.loadComment(task.task_id);
        task.members = await Taskboard.loadMemberOfTask(task.task_id);
        task.task_status = await loadTaskStatus(task.task_id);
      }
    }

    return taskList;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { loadAllList, loadAllTask, editTaskStatus, loadTaskList };
