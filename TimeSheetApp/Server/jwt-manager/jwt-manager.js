// import libraries
var jwt = require("jsonwebtoken");

//--------------------------------------------------------------
//--------------------------------------------------------------

const SECRET_KEY = "secret";

//--------------------------------------------------------------
//--------------------------------------------------------------

function generateJWT() {
  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: "foobar",
    },
    SECRET_KEY
  );
  return token;
}

//--------------------------------------------------------------
//--------------------------------------------------------------

function validateJWT(token) {
  var decoded = jwt.verify(token, SECRET_KEY);
  return decoded.exp <= Date.now();
}

//--------------------------------------------------------------
//--------------------------------------------------------------

module.exports = {
  validateJWT,
  generateJWT,
};
