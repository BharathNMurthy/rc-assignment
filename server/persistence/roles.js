const rolesDetails = require("./model/roles");

const findById = id =>
  new Promise((resolve, reject) => {
    rolesDetails.findById(id, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

const update = (query, newDoc) =>
  new Promise((resolve, reject) => {
    rolesDetails.update(query, newDoc, {}, (err, raw) => {
      if (err) return reject(err);
      return resolve(raw.ok === 1 && raw.nModified === 1);
    });
  });

const findByAttr = query =>
  new Promise((resolve, reject) => {
    rolesDetails.find(query, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });

module.exports = { update, findById, findByAttr };
