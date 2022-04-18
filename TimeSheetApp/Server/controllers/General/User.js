const User = require("../../functions/General/User");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const login = async (req, res) => {
  try {
    var result = await User.login(req.body.email, req.body.password);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const register = async (req, res) => {
  try {
    var user = req.body.user;
    var result = await User.register(
      user.street_code,
      user.street_name,
      user.area,
      user.city,
      user.country,
      user.first_name,
      user.last_name,
      user.email,
      user.password
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const loadMemberByOrganizationEmail = async (req, res) => {
  try {
    var result = await User.loadMemberByOrganizationEmail(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const loadProfile = async (req, res) => {
  try {
    var result = await User.loadProfile(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

function saveAvatar(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "Files/Profile/";
  form.parse(req, async function (err, fields, files) {
    try {
      // length file name
      var extension = path.extname(files.avatar.name).toLowerCase();
      // old path
      var oldpath = files.avatar.path;
      // new path
      var newpath = oldpath + extension;

      await fs.renameSync(oldpath, newpath);
      res.json(newpath);
    } catch (error) {
      console.log(error);
      res.json(null);
    }
  });
}

async function saveProfile(req, res) {
  try {
    console.log(req.body);
    var user = req.body.user;
    var result = await User.saveProfile(
      user.member_id,
      user.street_code,
      user.street_name,
      user.area,
      user.city,
      user.country,
      user.password,
      user.first_name,
      user.last_name,
      user.phone,
      user.gender,
      user.avatar
    );
    if (req.body.oldAvatar) {
      var isExisted = await fs.existsSync(req.body.oldAvatar);
      if (isExisted) await fs.unlinkSync(req.body.oldAvatar);
    }
    //else console.log("empty");

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
}

module.exports = {
  login,
  register,
  loadMemberByOrganizationEmail,
  loadProfile,
  saveProfile,
  saveAvatar,
};
