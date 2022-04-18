// import libraries
const express = require("express");
// general
const Chat = require("../controllers/General/Chat");
const ProjectList = require("../controllers/General/ProjectList");
const User = require("../controllers/General/User");
const FileManager = require("../controllers/General/FileManager");
const MyTeam = require("../controllers/General/MyTeam");
const Taskboard = require("../controllers/General/Taskboard");
const All = require("../controllers/General/All");
const Calendar = require("../controllers/General/Calendar");
const TaskList = require("../controllers/General/TaskList");
const Mailbox = require("../controllers/General/Mailbox");
const Note = require("../controllers/General/Note");

// product owner
const ProjectManagement = require("../controllers/ProductOwner/ProjectManagement");
const MemberManagement = require("../controllers/ProductOwner/MemberManagement");
const DepartmentManagement = require("../controllers/ProductOwner/DepartmentManagement");
const PositionManagement = require("../controllers/ProductOwner/PositionManagement");
const TeamManagement = require("../controllers/ProductOwner/TeamManagement");
const ProgressProject = require("../controllers/ProductOwner/ProgressProject");
const BudgetProject = require("../controllers/ProductOwner/BudgetProject");
// manager
const TimesheetStatistic = require("../controllers/Manager/TimesheetStatistic");
const ExpenseStatistic = require("../controllers/Manager/ExpenseStatistic");
const AllTimesheet = require("../controllers/Manager/AllTimesheet");
const AllExpense = require("../controllers/Manager/AllExpense");
const TeamAssignment = require("../controllers/Manager/TeamAssignment");
// employee
const TimesheetSummary = require("../controllers/Employee/TimesheetSummary");
const ExpenseSummary = require("../controllers/Employee/ExpenseSummary");
const ExpenseReport = require("../controllers/Employee/ExpenseReport");
const TimesheetReport = require("../controllers/Employee/TimesheetReport");

// use router
const router = express.Router();

//--------------------------------------------------------------
//--------------------------------------------------------------
// use router for app
function initRouter(app) {
  //general controller
  router.post("/User/Login", User.login);
  router.post("/User/Register", User.register);
  router.post("/User/LoadProfile", User.loadProfile);
  router.post("/User/SaveProfile", User.saveProfile);
  router.post("/User/SaveAvatar", User.saveAvatar);

  router.post("/User/LoadMemberByOrganizationEmail", User.loadMemberByOrganizationEmail);
  router.get("/Files/:folderName/:fileName", FileManager.streamImg);
  router.get("/FileManager/:pathName", FileManager.streamFile);
  router.post("/FileManager/CreateFolder", FileManager.createFolder);
  router.post("/FileManager/DeleteFolder", FileManager.deleteFolder);
  router.post("/FileManager/UploadFile", FileManager.uploadFile);
  router.post("/FileManager/RenameFile", FileManager.renameFile);
  router.post("/FileManager/DeleteFile", FileManager.deleteFile);

  router.post("/FileManager/LoadFileByMember", FileManager.loadFileByMember);

  router.post("/MyTeam/LoadTeamByMember", MyTeam.loadTeamByMember);
  router.post("/Chat/LoadMessages", Chat.loadMessages);
  router.post("/Chat/LoadFriends", Chat.loadFriends);
  router.post("/ProjectList/loadProjectByMember", ProjectList.loadProjectByMember);
  router.post("/Taskboard/LoadBoards", Taskboard.loadBoards);
  router.post("/All/LoadAll", All.loadAll);
  router.post("/Calendar/LoadCalendar", Calendar.loadCalendar);
  router.post("/Taskboard/LoadBoardData", Taskboard.loadBoardData);
  router.post("/Taskboard/AddBoard", Taskboard.addBoard);
  router.post("/Taskboard/AddList", Taskboard.addList);
  router.post("/Taskboard/AddTask", Taskboard.addTask);
  router.post("/Taskboard/EditTask", Taskboard.editTask);
  router.post("/Taskboard/EditList", Taskboard.editList);
  router.post("/Taskboard/EditBoard", Taskboard.editBoard);
  router.post("/Taskboard/DeleteBoard", Taskboard.deleteBoard);
  router.post("/Taskboard/DeleteList", Taskboard.deleteList);
  router.post("/Taskboard/DeleteTask", Taskboard.deleteTask);
  router.post("/Taskboard/SendComment", Taskboard.sendComment);
  router.post("/Taskboard/EditMemberIntoBoard", Taskboard.editMemberIntoBoard);
  router.post("/TaskList/LoadTaskList", TaskList.loadTaskList);
  router.post("/TaskList/EditTaskStatus", TaskList.editTaskStatus);
  router.post("/Mailbox/LoadMail", Mailbox.loadMail);
  router.post("/Mailbox/ReadMail", Mailbox.readMail);
  router.post("/Mailbox/DeleteMail", Mailbox.deleteMail);
  router.post("/Note/LoadNote", Note.loadNote);
  router.post("/Note/AddNote", Note.addNote);
  router.post("/Note/EditNote", Note.editNote);
  router.post("/Note/DeleteNote", Note.deleteNote);


  //product owner controller
  router.post("/ProjectManagement/AddProject", ProjectManagement.addProject);
  router.post("/ProjectManagement/DeleteProject", ProjectManagement.deleteProject);
  router.post("/ProjectManagement/UpdateProject", ProjectManagement.updateProject);
  router.post("/ProjectManagement/LoadProject", ProjectManagement.loadAllProject);
  router.post("/DepartmentManagement/LoadDepartment", DepartmentManagement.loadDepartment);
  router.post("/DepartmentManagement/AddDepartment", DepartmentManagement.addDepartment);
  router.post("/DepartmentManagement/EditDepartment", DepartmentManagement.editDepartment);
  router.post("/DepartmentManagement/DeleteDepartment", DepartmentManagement.deleteDepartment);
  router.post("/PositionManagement/LoadPosition", PositionManagement.loadPosition);
  router.post("/PositionManagement/AddPosition", PositionManagement.addPosition);
  router.post("/PositionManagement/EditPosition", PositionManagement.editPosition);
  router.post("/PositionManagement/DeletePosition", PositionManagement.deletePosition);
  router.post("/MemberManagement/LoadMemberByEmail", MemberManagement.loadMemberByEmail);
  router.post("/MemberManagement/AddMember", MemberManagement.addMember);
  router.post("/MemberManagement/EditMember", MemberManagement.editMember);
  router.post("/MemberManagement/DeleteMember", MemberManagement.deleteMember);
  router.post("/TeamManagement/LoadTeam", TeamManagement.loadTeam);
  router.post("/TeamManagement/LoadFormData", TeamManagement.loadFormData);
  router.post("/TeamManagement/AddTeam", TeamManagement.addTeam);
  router.post("/TeamManagement/EditTeam", TeamManagement.editTeam);
  router.post("/TeamManagement/DeleteTeam", TeamManagement.deleteTeam);
  router.post("/ProgressProject/LoadSummary", ProgressProject.loadSummary);
  router.post("/BudgetProject/LoadSummary", BudgetProject.loadSummary);

  //manager controller
  router.post("/AllTimesheet/LoadTimesheetByManager", AllTimesheet.loadTimesheetByManager);
  router.post("/AllExpense/LoadExpenseByManager", AllExpense.loadExpenseByManager);
  router.post("/AllTimesheet/ApproveTimesheet", AllTimesheet.approveTimesheet);
  router.post("/AllExpense/SubmitExpense", AllExpense.submitExpense);
  router.post("/TimesheetStatistic/LoadSummary", TimesheetStatistic.loadSummary);
  router.post("/ExpenseStatistic/LoadSummary", ExpenseStatistic.loadSummary);
  router.post("/TeamAssignment/LoadMemberByEmail", TeamAssignment.loadMemberByEmail);
  router.post("/TeamAssignment/LoadMemberInProject", TeamAssignment.loadMemberInProject);
  router.post("/TeamAssignment/DeleteMemberFromTeam", TeamAssignment.deleteMemberFromTeam);
  router.post("/TeamAssignment/AddMemberIntoTeam", TeamAssignment.addMemberIntoTeam);
  router.post("/TeamAssignment/EditMemberFromTeam", TeamAssignment.editMemberFromTeam);

  //employee controller
  router.post("/TimesheetReport/LoadTimesheetByEmployee", TimesheetReport.loadTimesheetByEmployee);
  router.post("/TimesheetReport/SubmitTimesheet", TimesheetReport.submitTimesheet);
  router.post("/TimesheetReport/DeleteTimesheet", TimesheetReport.deleteTimesheet);
  router.post("/TimesheetReport/UpdateTimesheet", TimesheetReport.updateTimesheet);
  router.post("/ExpenseReport/UploadFile", ExpenseReport.uploadFile);
  router.post("/ExpenseReport/AddExpense", ExpenseReport.addExpense);
  router.post("/ExpenseReport/AddExpenseImage", ExpenseReport.addExpenseImage);
  router.post("/ExpenseReport/LoadExpense", ExpenseReport.loadExpense);
  router.post("/ExpenseReport/DeleteExpense", ExpenseReport.deleteExpense);
  router.post("/ExpenseReport/EditExpense", ExpenseReport.editExpense);
  router.post("/TimesheetSummary/LoadSummary", TimesheetSummary.loadSummary);
  router.post("/ExpenseSummary/LoadSummary", ExpenseSummary.loadSummary);

  app.use(router);
}

//--------------------------------------------------------------
//--------------------------------------------------------------

module.exports = initRouter;
