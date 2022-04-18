const query = require("../../sql-query/SQLQuery");
const User = require("../../models/User");

async function loadMessages(myID, friendID) {
  try {
    var records = await query(
      "select * from user_message where sender = " +
        friendID +
        " and receiver = " +
        myID +
        " or receiver= " +
        friendID +
        " and sender = " +
        myID +
        ";"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadFriends(member_id) {
  try {
    var records = await query(
      "select member_id,concat(first_name,' ',last_name) as member_name,avatar,recent_date,email,(select  top 1 content from user_message where sender = member_id and receiver = " +
        member_id +
        " or sender = " +
        member_id +
        " and receiver = member_id ORDER BY content DESC) as recent_message from members where member_id != " +
        member_id + "and email like '%'+(select RIGHT(email, LEN(email) - CHARINDEX('@', email)) from members m where m.member_id = "+member_id+")"
    );
    
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}


async function loadUnreadMessage(member_id) {
  try {
    var records = await query(
      "select member_id,CONCAT(first_name,' ',last_name) member_name,avatar,content from user_message um inner join members m on um.sender=m.member_id  where receiver=" +
        member_id +
        " and message_status=0"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { loadMessages, loadFriends, loadUnreadMessage };
