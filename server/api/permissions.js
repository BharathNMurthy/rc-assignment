const { Router } = require("express");
const router = new Router();
const shortid = require("shortid");
const Permissions = require("../persistence/permissions");
const PermissionsModel = require("../persistence/model/permissions");

const getPermissions = async (req, res) => {

  const permissionsRes = await Permissions.findByAttr({})
    .then(result => {
      const parsedResult = JSON.parse(JSON.stringify(result));
      let permissionsList = [];
      if (parsedResult.length > 0) {
        return parsedResult;
      }
      return permissionsList;
    })
    .catch(err => {
      console.log("err>>", err);
    });
  console.log("permissionsRes>", permissionsRes);
  res.send(permissionsRes);
};

const savePermission = async (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));

  const permissions = new PermissionsModel({
    docId: shortid.generate(),
    resource: payload.resource,
    module: payload.module,
    permission: payload.permission
  });

  permissions.save(err => {
    if (err) {
      console.log(`Error occured while saving to Db with error: ${err}`);
    }
  });

  res.send(
    `I received your POST request. This is what you sent me: ${JSON.stringify(
      payload
    )}`
  );
};
router.get("/", getPermissions);
router.post("/", savePermission);

module.exports = router;
