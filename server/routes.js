const { Router } = require("express");

const router = Router();
const  permissionRouter =require('./api/permissions');

router.use('/permissions', permissionRouter);

module.exports = router;
