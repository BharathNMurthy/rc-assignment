const mongoose = require('mongoose');

const permissionsSchema = require('../schema/permissions');

const Model = () => {
	const schema = new mongoose.Schema(permissionsSchema);
	const collectionName = 'permissions';
	return mongoose.model(collectionName, schema);
};
module.exports = Model();
