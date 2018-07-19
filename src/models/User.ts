import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema({
	createdAt: Date,
	updatedAt: Date,
	firstName: {
		type: String,
		default: '',
		required: true
	},
	lastName: {
		type: String,
		default: '',
		required: true
	},
	email: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	mobile: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	aadhar: {
		type: String,
		default: '',
		required: true,
		unique: true
	},
	pan: {
		type: String,
		default: '',
		required: true,
		unique: true
	}
});

export default model('User', UserSchema);