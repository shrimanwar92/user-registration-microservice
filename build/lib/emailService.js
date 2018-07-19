"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
var mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "mwnn6rsujnpbixas@ethereal.email",
        pass: "rpAjknZy1jPYcywWzs"
    }
};
var transporter = nodemailer.createTransport(mailConfig);
exports.default = transporter;
