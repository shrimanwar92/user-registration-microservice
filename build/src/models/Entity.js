"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let EntitySchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Entity', EntitySchema);
