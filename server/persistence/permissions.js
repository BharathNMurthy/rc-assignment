const permissionsDetails = require("./model/permissions");

const findById = id =>
  new Promise((resolve, reject) => {
    permissionsDetails.findById(id, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

const update = (query, newDoc) =>
  new Promise((resolve, reject) => {
    permissionsDetails.update(query, newDoc, {}, (err, raw) => {
      if (err) return reject(err);
      return resolve(raw.ok === 1 && raw.nModified === 1);
    });
  });

const findByAttr = query =>
  new Promise((resolve, reject) => {
    permissionsDetails.find(query, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

module.exports = { update, findById, findByAttr };
