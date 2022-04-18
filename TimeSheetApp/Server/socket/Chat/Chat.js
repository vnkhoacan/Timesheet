const query = require("../../sql-query/SQLQuery");
const User = require("../../models/User");
//--------------------------------------------------------------
//--------------------------------------------------------------
function sendMessage(client, clients, io) {
  client.on("SendMessage", async function (message) {
    var index = clients.findIndex((value) => value.email == message.receiver);
    //console.log(index);
    if (index >= 0) {
      var socketID = clients[index].socketID;
      await query(
        "insert into user_messages values('" +
          message.sender +
          "','" +
          message.receiver +
          "','" +
          message.content +
          "',getdate(),0)"
      );
      io.to(socketID).emit("ReceiveMessage", message);
    }
  });
}
//--------------------------------------------------------------
//--------------------------------------------------------------
function loadFriend(client, clients, io) {
  client.on("LoadFriend", function (user) {
    var organizationEmail = User.getOrganizationEmail(user.email);
    var onlineFriends = [];
    for (var i in clients) {
      var isOnline = clients.some((v) => User.getOrganizationEmail(v.email) == organizationEmail && user.email != v.email);
      if(isOnline) onlineFriends.push(clients[i].member_id);
    }
    io.to(client.id).emit("LoadFriend", onlineFriends);
  });
}

module.exports = { sendMessage, loadFriend };
