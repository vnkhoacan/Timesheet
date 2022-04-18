const query = require("../../sql-query/SQLQuery");

async function loadBoardData(board_id, project_id, member_id, permission) {
  var list = await loadList(board_id);
  for (var i in list) {
    var listItem = list[i];
    var tasks = await loadTask(listItem.list_id);
    for (var x in tasks) {
      var members = await loadMemberOfTask(tasks[x].task_id);
      var comments = await loadComment(tasks[x].task_id);
      tasks[x].members = members;
      tasks[x].comments = comments;
    }

    list[i].tasks = tasks;
  }
  var boardMember = await loadBoardMember(
    board_id,
    project_id,
    member_id,
    permission
  );

  return { boardMember, list };
}

async function loadBoardMember(board_id, project_id, member_id, permission) {
  try {
    var records = [];
    if (permission == "Manager") {
      records = await query(
        "select tm.member_id,concat(m.first_name,' ',m.last_name) as member_name,m.avatar,case when tm.member_id in (select member_id from board_member where board_id=" +
          board_id +
          ") then CAST(1 AS BIT) else CAST(0 AS BIT) end as isAdded from team_member tm inner join members m on tm.member_id=m.member_id inner join teams t on t.team_id=tm.team_id where manager_id=" +
          member_id +
          " and project_id=" +
          project_id
      );
    } else if (permission == "ProductOwner") {
      records = await query(
        "select m.member_id,concat(m.first_name,' ',m.last_name) as member_name,m.avatar,case when m.member_id in (select member_id from board_member where board_id=" +
          board_id +
          ") then CAST(1 AS BIT) else CAST(0 AS BIT) end as isAdded from members m where m.email like '%'+ (select RIGHT(m1.email, LEN(m1.email) - CHARINDEX('@', m1.email)) from members m1 where m.member_id != " +
          member_id +
          " and m1.member_id= m.member_id)"
      );
    } else if (permission == "Employee") {
      records = await query(
        "select tm.member_id,concat(m.first_name,' ',m.last_name) as member_name,m.avatar,case when tm.member_id in (select member_id from board_member where board_id=" +
          board_id +
          ") then CAST(1 AS BIT) else CAST(0 AS BIT) end as isAdded from team_member tm inner join members m on tm.member_id=m.member_id inner join teams t on t.team_id=tm.team_id where project_id=" +
          project_id
      );
    }
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadList(board_id) {
  try {
    var records = await query(
      "select list_id,title from list_task lt where board_id=" + board_id + ""
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadTask(list_id) {
  try {
    var records = await query(
      "select task_id,task_name,task_description,task_start,task_due,task_priority from task where list_id=" +
        list_id
    );

    for (var i in records) {
      var record = records[i];
      var r1 = await query(
        "select * from member_task where task_id = " +
          record.task_id
      );

      

      if (r1.length) {
        var taskRecords = await query(
          "select count(*) as task_status from member_task where task_status = 0 and task_id = " +
            record.task_id
        );

        if (taskRecords[0].task_status) record.task_status = false;
        else record.task_status = true;

      } else record.task_status = false;

      break;
    }

    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

loadTask(10013);

async function loadComment(task_id) {
  try {
    var records = await query(
      "select comment_id,comment_content,comment_date,m.member_id,CONCAT(first_name,' ',last_name) member_name,avatar from comment_task ct left join task t on t.task_id=ct.task_id left join members m on ct.member_id=m.member_id where ct.task_id=" +
        task_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadMemberOfTask(task_id) {
  try {
    var records = await query(
      "select mt.member_id,CONCAT(first_name,' ',last_name) member_name,avatar from member_task mt inner join members m on mt.member_id=m.member_id where task_id=" +
        task_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadBoards(member_id, permission) {
  try {
    var records = [];
    if (permission == "ProductOwner") {
      records = await query(
        "select board_id,board_name,member_id from boards where member_id=" +
          member_id
      );
    } else if (permission == "Manager") {
      records = await query(
        "select b.board_id,board_name from boards b inner join board_member bm on b.board_id=bm.board_id and bm.member_id=" +
          member_id
      );

      var newRecords = await query(
        "select board_id,board_name from boards where member_id=" + member_id
      );
      for (var i in newRecords) records.push(newRecords[i]);
    } else if (permission == "Employee") {
      records = await query(
        "select b.board_id,board_name from board_member bm inner join boards b on bm.board_id=b.board_id where bm.member_id=" +
          member_id
      );
    }
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addBoard(board_name, member_id) {
  try {
    var board = await query(
      "insert into boards values('" +
        board_name +
        "'," +
        member_id +
        ");select @@IDENTITY AS 'identity'"
    );
    return board[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addList(title, board_id) {
  try {
    var lists = await query(
      "insert into list_task (title,board_id) values ('" +
        title +
        "'," +
        board_id +
        ") ;select @@IDENTITY AS 'identity'"
    );
    return lists[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addTask(list_id, task_name) {
  try {
    var tasks = await query(
      "insert into task (list_id,task_name,task_description,task_due,task_start,task_priority) values (" +
        list_id +
        ",'" +
        task_name +
        "',NULL,NULL,getdate(),NULL);select @@IDENTITY AS 'identity'"
    );
    return tasks[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function editMemberIntoBoard(board_id, member_id, isAdded) {
  try {
    if (isAdded == "true") {
      var records = await query("select * from board_member");
      var isExisted = records.some(
        (value) => value.member_id == member_id && value.board_id == board_id
      );
      if (!isExisted) {
        await query(
          "insert into board_member (board_id,member_id) values(" +
            board_id +
            "," +
            member_id +
            ")"
        );
      }
    } else {
      await query(
        "delete from board_member where board_id=" +
          board_id +
          "and member_id = " +
          member_id
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function assignMember(member_id, task_id) {
  try {
    var records = await query("select * from member_task");
    var isExist = records.some(
      (value) => value.member_id == member_id && value.task_id == task_id
    );

    if (!isExist)
      await query(
        "insert into member_task values(" + member_id + "," + task_id + ",0)"
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function assignTask(members, task_id) {
  try {
    var memberResult = true;
    for (var i in members) {
      var member = members[i];
      memberResult = await Taskboard.assignMember(member.member_id, task_id);
    }
    return memberResult;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editList(title, list_id) {
  try {
    await query(
      "update list_task set title='" + title + "' where list_id=" + list_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editTask(
  task_name,
  task_description,
  task_due,
  task_start,
  task_priority,
  task_id
) {
  try {
    await query(
      "update task set task_name='" +
        task_name +
        "',task_description=" +
        (task_description ? "'" + task_description + "'" : "NULL") +
        ",task_due=" +
        (task_due ? "convert(datetime,'" + task_due + "')" : "NULL") +
        ",task_priority=" +
        (task_priority ? "'" + task_priority + "'" : "NULL") +
        " where task_id=" +
        task_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editBoard(board_name, board_id) {
  try {
    await query(
      "update boards set board_name='" +
        board_name +
        "' where board_id=" +
        board_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteBoard(board_id) {
  try {
    var records = await query(
      "select list_id from list_task where board_id = " + board_id
    );
    for (var i in records) await deleteList(records[i].list_id);
    await query("delete from boards where board_id=" + board_id + "");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteList(list_id) {
  try {
    var records = await query(
      "select task_id from task where list_id = " + list_id
    );
    for (var i in records) await deleteTask(records[i].task_id);
    await query("delete from list_task where list_id=" + list_id + "");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteTask(task_id) {
  try {
    await query("delete from comment_task where task_id=" + task_id + "");
    await query("delete from task where task_id=" + task_id + "");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function sendComment(task_id, member_id, content) {
  try {
    var comment = await query(
      "insert into comment_task (comment_content,comment_date,task_id,member_id) values('" +
        content +
        "',GETDATE()," +
        task_id +
        "," +
        member_id +
        ");select @@IDENTITY AS 'identity'"
    );
    return comment[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  loadBoards,
  addBoard,
  addList,
  addTask,
  assignTask,
  editList,
  editTask,
  editBoard,
  deleteList,
  deleteTask,
  deleteBoard,
  loadBoardData,
  assignMember,
  editMemberIntoBoard,
  sendComment,
  loadComment,
  loadMemberOfTask,
};
