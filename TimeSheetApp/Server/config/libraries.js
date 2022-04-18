// import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//--------------------------------------------------------------
//--------------------------------------------------------------

initLib = (dirname) => {
  const app = express();
  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
  // app.use(express.static(dirname + '/views'));
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  return app;
};

//--------------------------------------------------------------
//--------------------------------------------------------------

module.exports = initLib;
