//--------------------------------------------------------------
//--------------------------------------------------------------
const getOrganizationEmail = (email) => {
  if (email) {
    var start = "";
    var organizationEmail = "";
    for (var i in email) if (email[i] === "@") start = i;
    organizationEmail = email.substring(start, email.length);
    return organizationEmail;
  }
  return "";
};
//--------------------------------------------------------------
//--------------------------------------------------------------
module.exports = {getOrganizationEmail};
