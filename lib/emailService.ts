import * as nodemailer from 'nodemailer';
import * as fs from "fs";
import * as path from 'path';

export default class EailService {
	private _transporter: nodemailer.Transporter;
	template = fs.readFileSync(path.resolve(__dirname, "./index.html"), {encoding:'utf-8'});

	mailConfig = {
	  host: 'smtp.ethereal.email',
	  port: 587,
	  auth: {
	    user: "mwnn6rsujnpbixas@ethereal.email",
	    pass: "rpAjknZy1jPYcywWzs"
	  }
	}

	constructor() {
		this._transporter = nodemailer.createTransport(this.mailConfig);
	}

	async sendMail(to: string, subject: string, content: string): Promise<void> {
		let options = {
			from: 'from_test@gmail.com',
			to: to,
			subject: subject,
			text: content,
			html: this.template
		}

		try {
			return await this._transporter.sendMail(options);
		} catch (error) {
			return error;
		}
	}

}



