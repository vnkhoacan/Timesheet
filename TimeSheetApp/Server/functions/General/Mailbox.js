const query = require("../../sql-query/SQLQuery");

async function loadMail(member_id, type) {
  try {
    var records = [];
    if (type == "trash") {
      records = await query(
        "select mail_id,title,content,created_on,is_deleted from mailbox where is_deleted=1 and sender = " +
          member_id
      );
    } else if (type == "sent") {
      records = await query(
        "select mail_id,title,content,created_on,is_deleted from mailbox where is_deleted = 0 and sender = " +
          member_id
      );
    } else if (type == "inbox") {
      records = await query(
        "select mb.mail_id,title,content,mb.created_on,is_deleted,is_read,concat(first_name,' ',last_name)member_name,avatar from mailbox mb inner join members m on m.member_id = mb.sender inner join mailbox_member mbm on mbm.mail_id = mb.mail_id where receiver = " +
          member_id
      );
    } else if (type == "spam") {
      records = await query(
        "select mb.mail_id,mb.title,mb.content,mb.created_on,m.member_id,CONCAT(first_name,' ',last_name) member_name,avatar from mailbox mb inner join members m on m.member_id = mb.sender inner join mailbox_member mbm on mbm.mail_id = mb.mail_id,(select sender,content,title from mailbox group by sender,content,title having COUNT(*)>=3) m1 where mb.title=m1.title and mb.content=m1.content and is_deleted=0 and receiver=" +
          member_id
      );
    } else if (type == "all") {
      records = await query(
        "select mb.mail_id,title,content,mb.created_on,is_deleted,is_read,concat(first_name,' ',last_name)member_name,avatar from mailbox mb inner join members m on m.member_id = mb.sender inner join mailbox_member mbm on mbm.mail_id = mb.mail_id where receiver = " +
          member_id
      );

      // var recordsBySent = await query(
      //   "select mail_id,title,content,created_on,is_deleted from mailbox where sender = " +
      //     member_id
      // );

      //records = [...records, ...recordsBySent];
    }
    for (var i in records)
      records[i].members = await loadMembersInMail(records[i].mail_id);

    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadUnreadMails(member_id) {
  try {
    var records = await query(
      "select mb.mail_id,title,content,sender member_id,concat(first_name,' ',last_name) member_name,avatar from mailbox mb inner join members m on m.member_id = mb.sender inner join mailbox_member mbm on mbm.mail_id = mb.mail_id where mbm.receiver = " + member_id
    );

    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function loadMembersInMail(mail_id) {
  try {
    var records = await query(
      "select m.member_id,concat(first_name,' ',last_name) member_name,avatar,mail_type from mailbox mb inner join mailbox_member mbm on mbm.mail_id = mb.mail_id inner join members m on m.member_id = mbm.receiver where mb.mail_id = " +
        mail_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function saveMail(title, content, sender) {
  try {
    var mail = await query(
      "insert into mailbox(title,content,sender,created_on,is_deleted) values('" +
        title +
        "','" +
        content +
        "'," +
        sender +
        ",GETDATE(),0); select @@IDENTITY AS 'identity'"
    );
    // if (type == "member") {
    //   await query(
    //     "insert into mailbox(title,content,sender,receiver,created_on,is_deleted) values('" +
    //       title +
    //       "','" +
    //       content +
    //       "'," +
    //       sender +
    //       "," +
    //       receiver +
    //       ",GETDATE(),0)"
    //   );
    // } else if (type == "project") {
    //   await query(
    //     "insert into mailbox(title,content,sender,receiver,created_on,is_deleted) select '" +
    //       title +
    //       "','" +
    //       content +
    //       "'," +
    //       sender +
    //       ",member_id,GETDATE(),0 from team_member tm inner join teams t on tm.team_id=t.team_id where project_id=" +
    //       receiver +
    //       ""
    //   );
    // } else if (type == "team") {
    //   await query(
    //     "insert into mailbox(title,content,sender,receiver,created_on,is_deleted) select '" +
    //       title +
    //       "','" +
    //       content +
    //       "'," +
    //       sender +
    //       ",member_id,GETDATE(),0 from team_member where team_id=" +
    //       receiver +
    //       ""
    //   );
    // }
    return mail[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function saveMailToReceiver(mail_id, member_id, mail_type) {
  try {
    await query(
      "insert into mailbox_member(mail_id,receiver,mail_type,is_read) values(" +
        mail_id +
        "," +
        member_id +
        ",'" +
        mail_type +
        "',0)"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function readMail(mail_id, member_id) {
  try {
    await query(
      "update mailbox_member set is_read = 1 where mail_id = " +
        mail_id +
        "  and receiver = " +
        member_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteMail(mail_id) {
  try {
    await query("update mailbox set is_deleted = 1 where mail_id = " + mail_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  loadMail,
  saveMail,
  saveMailToReceiver,
  readMail,
  deleteMail,
  loadUnreadMails
};
