"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('User', UserSchema);
