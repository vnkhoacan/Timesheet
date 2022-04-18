const BudgetProject = require("../../functions/ProductOwner/BudgetProject");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadSummary = async (req, res) => {
  try {
    var costByMonth = await BudgetProject.sumCostByMonth(req.body.project_id);
    var costByDay = await BudgetProject.sumCostByDay(req.body.project_id);
    var countEx = await BudgetProject.countExpense(req.body.project_id);
    res.json({ costByMonth, costByDay, countEx });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadSummary };
