const ExpenseReport = require("../../functions/Employee/ExpenseReport");
const fs = require("fs");
const path = require("path");
var formidable = require("formidable");
const { baseDir } = require("../../env");

const addExpense = async (req, res) => {
  var expense = req.body.expense;
  try {
    var result = await ExpenseReport.addExpense(
      expense.purpose_or_reason,
      expense.project_id,
      expense.expense_type,
      expense.employee_id,
      expense.expense_date,
      expense.expense_cost
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const addExpenseImage = async (req, res) => {
  var expense = req.body.expense;
  try {
    var result = await ExpenseReport.addExpenseImage(
      expense.expense_id,
      expense.expense_path
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

function uploadFile(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "Files/Expense/";
  form.parse(req, async function (err, fields, files) {
    try {
      console.log("upload");
      // length file name
      var extension = path.extname(files.expense_image.name).toLowerCase();
      // old path
      var oldpath = files.expense_image.path;
      // new path
      var newpath = oldpath + extension;
      await fs.renameSync(oldpath, newpath);
      res.json(newpath);
    } catch (error) {
      console.log(error);
      res.json(null);
    }
  });
}

const loadExpense = async (req, res) => {
  try {
    var result = await ExpenseReport.loadExpense(
      req.body.project_id,
      req.body.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const deleteExpense = async (req, res) => {
  try {
    var rows = req.body.rows;
    var result = true;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].epath) {
        result = await ExpenseReport.deleteExpenseImage(rows[i].expense_id);
        var filePath = rows[i].epath;
        filePath.map((value) => {
          fs.readdirSync("Files/Expense").map((name) => {
            if (value == "Files\\Expense\\" + name) fs.unlinkSync(value);
          });
        });
      }
      result = await ExpenseReport.deleteExpense(rows[i].expense_id);
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const editExpense = async (req, res) => {
  try {
    var expense = req.body.expense;
    var result = await ExpenseReport.editExpense(
      expense.expense_id,
      expense.purpose_or_reason,
      expense.expense_type,
      expense.expense_date,
      expense.expense_cost
    );
    var filePath =
      expense.epath == undefined || expense.epath == null ? [] : expense.epath;
    if (expense.isNew) {
      for (var file of filePath) {
        await fs.unlinkSync(baseDir + "/" + file);
      }
    }
    if (filePath.length)
      result = await ExpenseReport.deleteExpenseImage(expense.expense_id);
    res.json(true);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

module.exports = {
  addExpense,
  uploadFile,
  addExpenseImage,
  loadExpense,
  deleteExpense,
  editExpense,
};
