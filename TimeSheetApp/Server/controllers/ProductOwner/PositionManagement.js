const PositionManagement = require("../../functions/ProductOwner/PositionManagement");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadPosition = async (req, res) => {
  try {
    var result = await PositionManagement.loadPosition(
      req.body.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const addPosition = async (req, res) => {
  try {
    var position = req.body.position;
    var result = await PositionManagement.addPosition(
      position.position_name,
      position.position_description,
      position.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const editPosition = async (req, res) => {
  try {
    var position = req.body.position;
    var result = await PositionManagement.editPosition(
      position.position_id,
      position.position_name,
      position.position_description
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deletePosition = async (req, res) => {
  try {
    var result = true;
    var rows = req.body.rows;
    for (var i = 0; i < rows.length; i++)
      result = await PositionManagement.deletePosition(
        rows[i].position_id
      );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
module.exports = {
  loadPosition,
  addPosition,
  editPosition,
  deletePosition,
};
