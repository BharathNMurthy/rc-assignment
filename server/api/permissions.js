const { Router } = require("express");
const router = new Router();
const shortid = require("shortid");

const Permissions = require("../persistence/permissions");
const PermissionsModel = require("../persistence/model/permissions");
const logger = require("../logging/logs");

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
      logger
        .getLogger()
        .error("Error occurred while fetching permissions", err);
    });
  res.status(200).json(permissionsRes);
};

const savePermission = async (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));

  const permissions = new PermissionsModel({
    docId: shortid.generate(),
    resource: payload.resource,
    module: payload.module,
    permission: payload.permission
  });

  return permissions
    .save()
    .then(data => {
      logger.getLogger().info(`Succssfully saved Permission`);
      res.status(201).json({ success: true });
    })
    .catch(err => {
      logger
        .getLogger()
        .error(`Error occured while saving to Db with error: ${err}`);
      res.status(500).json({ success: false , errorMessage:'DB Error'});
    });
};

router.get("/", getPermissions);
router.post("/", savePermission);

module.exports = router;
