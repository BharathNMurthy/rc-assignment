const mongoose = require('mongoose');

const rolesSchema = require('../schema/roles');

const Model = () => {
	const schema = new mongoose.Schema(rolesSchema);
	const collectionName = 'roles';
	return mongoose.model(collectionName, schema);
};
module.exports = Model();
