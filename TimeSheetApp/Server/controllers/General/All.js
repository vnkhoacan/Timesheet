const Chat = require("../../functions/General/Chat");
const Mailbox = require("../../functions/General/Mailbox");

const loadAll = async (req, res) => {
  try {
    var unreadMessages = await Chat.loadUnreadMessage(req.body.member_id);
    var unreadMails = await Mailbox.loadUnreadMails(req.body.member_id);
    res.json({ unreadMessages,unreadMails });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadAll };
