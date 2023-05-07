const mysql = require("mysql2");

// var connectionPool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'BiryaniBois@1008',
//     database:'uber_eats',
//     connectionLimit: 10,
//     multipleStatements: true

// });
// var connectionPool=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'BiryaniBois@1008',
//     database:'uber_eats',
// })
var connectionPool = mysql.createPool({
  host: "playpal.mysql.database.azure.com",
  user: "playpal",
  password: "BiryaniBois@1008",
  database: "uber_eats",
  connectionLimit: 10,
  multipleStatements: true,
});

module.exports = connectionPool.promise();
