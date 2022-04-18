const ProjectList = require("../../functions/General/ProjectList");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadProjectByMember = async (req, res) => {
  try {
    var result = await ProjectList.loadProjectByMember(req.body.member_id,req.body.permission);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadProjectByMember };
