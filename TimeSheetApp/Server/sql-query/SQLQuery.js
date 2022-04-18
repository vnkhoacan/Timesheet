// import libraries
const mssql = require("mssql");
//--------------------------------------------------------------
//--------------------------------------------------------------

const mssqlLocalConfig = {
  user: "db",
  password: "123",
  database: "TimesheetDB",
  server: "DESKTOP-MPP7046",
  port:1433,
  dialect: "mssql",
  dialectOptions: {
    instanceName: "SQLEXPRESS",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 15000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const mssqlReleaseConfig = {
  user: "ngthanhdat521_",
  password: "ng123",
  database: "ngthanhdat521_",
  server: "sql.bsite.net\\MSSQL2016",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 15000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};


//--------------------------------------------------------------
//--------------------------------------------------------------

async function querySQL(query) {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await mssql.connect(mssqlLocalConfig);
    var records = await mssql.query(query);
    return records.recordset;
  } catch (error) {
    // error checks
    console.log(error);
    return null;
  }
}

//--------------------------------------------------------------
//--------------------------------------------------------------
module.exports = querySQL;
