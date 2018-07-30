"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
class EailService {
    constructor() {
        // template = fs.readFileSync(path.resolve(__dirname, "./email.ejs"), {encoding:'utf-8'});
        this.mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: "mwnn6rsujnpbixas@ethereal.email",
                pass: "rpAjknZy1jPYcywWzs"
            }
        };
        this._transporter = nodemailer.createTransport(this.mailConfig);
    }
    sendMail(to, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = yield ejs.renderFile(path.resolve(__dirname, "./email.ejs"), { name: 'Stranger' });
            let options = {
                from: 'from_test@gmail.com',
                to: to,
                subject: subject,
                text: content,
                html: template
            };
            try {
                return yield this._transporter.sendMail(options);
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = EailService;
