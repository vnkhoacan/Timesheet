const Mailbox = require("../../functions/General/Mailbox");

function sendMail(clients, io, mail) {
  var members = mail.members;
  for (var i in members) {
    var member = members[i];
    for (var j in clients) {
      var client = clients[j];
      if (client.member_id == member.member_id)
        io.to(client.socketID).emit("ReceiveMail", mail);
    }
  }
}

async function saveMail(mail) {
  var members = mail.members;

  var mail_id = await Mailbox.saveMail(
    mail.title,
    mail.content,
    mail.member_id
  );

  for (var i in members) {
    var member = members[i];
    await Mailbox.saveMailToReceiver(
      mail_id,
      member.member_id,
      member.mail_type
    );
  }
}

module.exports = { sendMail, saveMail };
