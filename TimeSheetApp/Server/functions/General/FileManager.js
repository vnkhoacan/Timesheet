var fs = require("fs");
var formidable = require("formidable");
var path = require("path");
const { baseDir } = require("../../env");

async function createFolder(dir) {
  //var dir = "./tmp/but/then/nested";
  try {
    if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function uploadFile(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "Files/FileManager/";
  form.maxFileSize = 1000 * 1024 * 1024;
  form.parse(req, async function (err, fields, files) {
    try {
      // old path
      var oldpath = files.uploadedFile.path;

      res.json(oldpath);
    } catch (error) {
      console.log(error);
      res.json(null);
    }
  });
}

async function renameFile(oldpath, newPath, member_id) {
  try {
    var baseOldPath = baseDir + "/" + oldpath;
    var baseNewPath = baseDir + "/Files/FileManager/" + newPath;
    var oldPathIsExisted = await fs.existsSync(baseOldPath);

    if (oldPathIsExisted) {
      await createFolder("Member" + member_id);
      await fs.renameSync(baseOldPath, baseNewPath);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteFile(fileName) {
  try {
    var isExisted = await fs.existsSync(
      baseDir + "/Files/FileManager/" + fileName
    );
    console.log(baseDir + "/Files/FileManager/" + fileName);
    if (isExisted)
      await fs.unlinkSync(baseDir + "/Files/FileManager/" + fileName);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createFolder(folderName) {
  try {
    var pathName = baseDir + "/Files/FileManager/" + folderName;
    var isExisted = await fs.existsSync(pathName);
    if (!isExisted) await fs.mkdirSync(pathName);
    return !isExisted;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteFolder(folderPath) {
  try {
    var pathName = baseDir + "/Files/FileManager/" + folderPath;
    var isExisted = await fs.existsSync(pathName);
    var amount = await fs.readdirSync(pathName);

    if (isExisted && !amount.length) await fs.rmdirSync(pathName);
    return isExisted;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function loadFileByMember(member_id) {
  var arr = {
    rootFolderId: "0",
    fileMap: {
      0: {
        id: "0",
        name: "Root",
        isDir: true,
        childrenIds: [],
        childrenCount: 0,
      },
    },
  };

  await getAllFiles(
    baseDir + "/Files/FileManager/Member" + member_id,
    0,
    1,
    arr.fileMap,
    ""
  );

  return arr;
}

async function getAllFiles(pathname, parrentID, childID, arr, parentPath) {
  var fs = require("fs");
  var isExisted = await fs.existsSync(pathname);
  if (isExisted) {
    var files = await fs.readdirSync(pathname);
    for (var i in files) {
      var file = files[i];

      var isDir = file.indexOf(".") < 0;
      arr[childID.toString()] = {
        id: childID.toString(),
        name: file,
        isDir: isDir,
        childrenIds: [],
        parentId: parrentID.toString(),
        childrenCount: 0,
        parentPath: parentPath,
      };

      arr[parrentID.toString()].childrenIds.push(childID.toString());
      arr[parrentID.toString()].childrenCount++;

      if (isDir) {
        await getAllFiles(
          pathname + "/" + file,
          childID,
          childID + 1,
          arr,
          parentPath + "/" + file
        );
        var newFiles = await fs.readdirSync(pathname + "/" + file);
        childID = newFiles.length ? childID + newFiles.length + 1 : childID + 1;
      } else {
        childID++;
      }
    }
  }
}

module.exports = {
  createFolder,
  loadFileByMember,
  deleteFolder,
  uploadFile,
  renameFile,
  deleteFile,
};
