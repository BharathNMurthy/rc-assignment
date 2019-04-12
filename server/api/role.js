const { Router } = require("express");
const router = new Router();
const shortid = require("shortid");
const logger = require("../logging/logs");

const RolesModel = require("../persistence/model/roles");

const saveRole = async (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));

  if (!payload.role || !payload.permission) {
    res.status(400).json({ success: false, errorMessage: "Invalid data" });
  }

  const roles = new RolesModel({
    docId: shortid.generate(),
    role: payload.role,
    permission: payload.permission
  });

  return roles
    .save()
    .then(data => {
      logger.getLogger().info(`Succssfully saved Roles`);
      res.status(201).json({ success: true });
    })
    .catch(err => {
      logger
        .getLogger()
        .error(`Error occured while saving to Db with error: ${err}`);
      res.status(500).json({ success: false, errorMessage: "DB Error" });
    });
};

router.post("/", saveRole);

module.exports = router;
