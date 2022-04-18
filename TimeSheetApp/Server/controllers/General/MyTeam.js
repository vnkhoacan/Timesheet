const MyTeam = require("../../functions/General/MyTeam");

const loadTeamByMember = async (req, res) => {
  try {
    var result = await MyTeam.loadTeamByMember(req.body.member_id, req.body.permission,req.body.project_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadTeamByMember };
