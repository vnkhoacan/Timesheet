const Note = require("../../functions/General/Note");

const loadNote = async (req, res) => {
  try {
    var result = await Note.loadNote(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const addNote = async (req, res) => {
  try {
    var result = await Note.addNote(req.body.title,req.body.note_content,req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const editNote = async (req, res) => {
  try {
    var result = await Note.editNote(req.body.note_id,req.body.title,req.body.note_content);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const deleteNote = async (req, res) => {
  try {
    var result = await Note.deleteNote(req.body.note_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadNote , addNote , editNote , deleteNote };