const Mailbox = require("../../functions/General/Mailbox");

const loadMail = async (req, res) => {
  try {
    var result = await Mailbox.loadMail(req.body.member_id, req.body.type);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const readMail = async (req, res) => {
  try {
    var result = await Mailbox.readMail(req.body.mail_id, req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const deleteMail = async (req, res) => {
  try {
    var result = await Mailbox.deleteMail(req.body.mail_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadMail, readMail, deleteMail };
