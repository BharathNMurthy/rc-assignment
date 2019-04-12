const { Router } = require("express");
const router = new Router();
const Permissions = require("../persistence/model/permissions");

const getPermission = async (req, res) => {
  console.log("getPermissions called..");
  res.send({ express: "Hello From Express" });
};

const savePermission = async (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  console.log("savePermission called..", payload);

  const permissions = new Permissions({
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
router.get("/", getPermission);
router.post("/", savePermission);

module.exports = router;
