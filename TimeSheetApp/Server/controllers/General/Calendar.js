const Calendar = require("../../functions/General/Calendar");

const loadCalendar = async (req, res) => {
  try {
    var records = await Calendar.loadCalendar(req.body.member_id);
    res.json({ calendar: records });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadCalendar };
