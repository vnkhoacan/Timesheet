const query = require("../../sql-query/SQLQuery");

async function loadNote(member_id) {
  try {
    var records = await query(
      "select note_id,title,note_content from notes where member_id = " +
        member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addNote(title, note_content, member_id) {
  try {
    var notes = await query(
      "insert into notes(title,note_content,created_on,member_id) values('" +
        title +
        "','" +
        note_content +
        "',GETDATE()," +
        member_id +
        "); select @@IDENTITY AS 'identity'"
    );

    return notes[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function editNote(note_id, title, note_content) {
  try {
    await query(
      "update notes set title='" +
        title +
        "',note_content='" +
        note_content +
        "' where note_id=" +
        note_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteNote(note_id) {
  try {
    await query("delete from notes where note_id=" + note_id + "");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { loadNote, addNote, editNote, deleteNote };
