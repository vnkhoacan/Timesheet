const TaskList = require("../../functions/General/TaskList");

const editTaskStatus = async (req, res) => {
  try {
    console.log(req.body);
    var result = await TaskList.editTaskStatus(
      req.body.task_id,
      req.body.task_status,
      req.body.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const loadTaskList = async (req, res) => {
  try {
    var result = await TaskList.loadTaskList(
      req.body.member_id,
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};


module.exports = { editTaskStatus, loadTaskList };
