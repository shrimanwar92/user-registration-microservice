import { Schema, model } from 'mongoose';

let EntitySchema: Schema = new Schema({
	createdAt: Date,
	updatedAt: Date,
	entityType: {
		type: String,
		default: '',
		required: true
	},
	entityName: {
		type: String,
		default: '',
		required: true
	},
	uniqueIdentifier: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	address: {
		type: String,
		default: ''
	},
	userId: {
		type: String,
		default: ''
	},
	enrollmentSecret: {
		type: String,
		default: ''
	}

});

export default model('Entity', EntitySchema);