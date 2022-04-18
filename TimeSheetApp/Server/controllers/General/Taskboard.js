const Taskboard = require("../../functions/General/Taskboard");

const loadBoardData = async (req, res) => {
  try {
    var result = await Taskboard.loadBoardData(
      req.body.board_id,
      req.body.project_id,
      req.body.member_id,
      req.body.permission
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const loadBoards = async (req, res) => {
  try {
    var result = await Taskboard.loadBoards(
      req.body.member_id,
      req.body.permission
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const addBoard = async (req, res) => {
  try {
    var board = req.body.board;
    var result = await Taskboard.addBoard(board.board_name, board.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const addList = async (req, res) => {
  try {
    var list = req.body.list;
    var result = await Taskboard.addList(list.title, list.board_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const addTask = async (req, res) => {
  try {
    var task = req.body.task;
    var result = await Taskboard.addTask(task.list_id, task.task_name);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const editList = async (req, res) => {
  try {
    var list = req.body.list;
    var result = await Taskboard.editList(list.title, list.list_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const editTask = async (req, res) => {
  try {
    var task = req.body.task;

    var result = await Taskboard.editTask(
      task.task_name,
      task.task_description,
      task.task_due,
      task.task_start,
      task.task_priority,
      task.task_id
    );

    for (var i in task.members) {
      var member = task.members[i];
      await Taskboard.assignMember(member.member_id, task.task_id);
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const editBoard = async (req, res) => {
  try {
    console.log(req.body);
    var board = req.body.board;
    var result = await Taskboard.editBoard(board.board_name, board.board_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const deleteList = async (req, res) => {
  try {
    var list = req.body.list;

    var result = await Taskboard.deleteList(list.list_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const deleteTask = async (req, res) => {
  try {
    var task = req.body.task;
    var result = await Taskboard.deleteTask(task.task_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const deleteBoard = async (req, res) => {
  try {
    var board = req.body.board;

    var result = await Taskboard.deleteBoard(board.board_id);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const sendComment = async (req, res) => {
  try {
    var comment = req.body.comment;
    console.log(req.body);

    var result = await Taskboard.sendComment(comment.task_id,comment.member_id,comment.comment_content);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const editMemberIntoBoard = async (req, res) => {
  try {
    var boardMember = req.body.boardMember;
    var result = await Taskboard.editMemberIntoBoard(boardMember.board_id,boardMember.member_id,boardMember.isAdded);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

module.exports = {
  loadBoards,
  addBoard,
  addList,
  addTask,
  addTask,
  editList,
  editTask,
  editBoard,
  deleteList,
  deleteTask,
  deleteBoard,
  loadBoardData,
  sendComment,
  editMemberIntoBoard,
};
