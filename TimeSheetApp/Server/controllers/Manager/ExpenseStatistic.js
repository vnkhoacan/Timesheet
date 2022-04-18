const ExpenseStatistic = require("../../functions/Manager/ExpenseStatistic");

const loadSummary = async (req, res) => {
  try {
    var costByDay = await ExpenseStatistic.sumCostByDay(
      req.body.project_id,
      req.body.manager_id
    );

    var costByMembers = await ExpenseStatistic.sumCostByMembers(
      req.body.project_id,
      req.body.manager_id
    );

    var countEx = await ExpenseStatistic.countExpense(
      req.body.project_id,
      req.body.manager_id
    );

    var sumCost = await ExpenseStatistic.sumCost(
      req.body.project_id,
      req.body.manager_id
    );

    res.json({ costByMembers, countEx, costByDay, sumCost });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadSummary };
