var fs = require("fs");
const FileManager = require("../../functions/General/FileManager");
const streamImg = async (req, res) => {
  var filePath = "Files/" + req.params.folderName + "/" + req.params.fileName;
  var isExisted = await fs.existsSync(filePath);
  if (isExisted) {
    res.setHeader("Content-Type", "image/jpg");
    fs.createReadStream(filePath).pipe(res);
  } else res.json(null);
};

const streamFile = async (req, res) => {
  var filePath = "Files/FileManager/" + req.params.pathName;
  filePath = filePath.replace(/-/g, "/");

  var isExisted = await fs.existsSync(filePath);
  if (isExisted) {
    res.download(filePath);
  } else res.json(null);
};

const createFolder = async (req, res) => {
  try {
    var result = await FileManager.createFolder(req.body.folderName);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const deleteFolder = async (req, res) => {
  try {
    console.log(req.body);
    var result = await FileManager.deleteFolder(req.body.folderName);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const uploadFile = async (req, res) => {
  await FileManager.uploadFile(req, res);
};

const renameFile = async (req, res) => {
  try {
    //console.log(req.body);
    var result = await FileManager.renameFile(
      req.body.oldPath,
      req.body.newPath,
      req.body.member_id
    );
    
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};


const deleteFile = async (req, res) => {
  try {
    console.log(req.body);
    var result = await FileManager.deleteFile(
      req.body.fileName,
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const loadFileByMember = async (req, res) => {
  try {
    var result = await FileManager.loadFileByMember(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = {
  streamImg,
  loadFileByMember,
  streamFile,
  createFolder,
  deleteFolder,
  uploadFile,
  renameFile,
  deleteFile
};
