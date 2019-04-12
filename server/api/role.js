const { Router } = require("express");
const router = new Router();
const RolessModel = require("../persistence/model/roles");

const saveRole = async (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  console.log("saveRole called..", payload);

  const roles = new RolessModel({
    role: payload.role,
    permission: payload.permission
  });

  roles.save(err => {
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
router.post("/", saveRole);

module.exports = router;
