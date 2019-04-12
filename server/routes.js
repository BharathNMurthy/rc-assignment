const { Router } = require("express");

const router = Router();
const  permissionRouter =require('./api/permissions');
const  roleRouter =require('./api/role');

router.use('/permissions', permissionRouter);
router.use('/role', roleRouter);


module.exports = router;
