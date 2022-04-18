const ExpenseSummary = require("../../functions/Employee/ExpenseSummary");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadSummary = async (req, res) => {
  try {
    var costByDay = await ExpenseSummary.sumCostByDay(req.body.employee_id,req.body.project_id);
    var costByMonth = await ExpenseSummary.sumCostByMonth(req.body.employee_id,req.body.project_id);
    var countEx = await ExpenseSummary.countExpense(req.body.employee_id,req.body.project_id);
    res.json({ countEx, costByMonth, costByDay });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
module.exports = { loadSummary };
