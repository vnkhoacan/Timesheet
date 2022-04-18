const Chat = require("../../functions/General/Chat");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadMessages = async (req, res) => {
  try {
    var result = await Chat.loadMessages(
      req.body.myID,
      req.body.friendID
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadFriends = async (req, res) => {
  try {
    var result = await Chat.loadFriends(
      req.body.member_id,
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
module.exports = { loadMessages,loadFriends };
