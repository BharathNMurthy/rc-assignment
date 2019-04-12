const rolesDetails = require("./model/roles");


const findByAttr = query =>
  new Promise((resolve, reject) => {
    rolesDetails.find(query, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

module.exports = { findByAttr };
