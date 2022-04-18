const AllExpense = require("../../functions/Manager/AllExpense");

const loadExpenseByManager = async (req, res) => {
  try {
    var result = await AllExpense.loadExpenseByManager(
      req.body.project_id,
      req.body.manager_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const submitExpense = async (req, res) => {
  try {
    var expense = req.body.expense;
    var result = await AllExpense.submitExpense(
      expense.expense_id,
      expense.expense_status
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadExpenseByManager, submitExpense };
