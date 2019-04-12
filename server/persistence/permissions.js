const permissionsDetails = require("./model/permissions");

const findByAttr = query =>
  new Promise((resolve, reject) => {
    permissionsDetails.find(query, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

module.exports = { findByAttr };
