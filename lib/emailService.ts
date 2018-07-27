import * as nodemailer from 'nodemailer';
import * as fs from "fs";
import * as path from 'path';
import * as ejs from 'ejs';

export default class EailService {
	private _transporter: nodemailer.Transporter;
	// template = fs.readFileSync(path.resolve(__dirname, "./email.ejs"), {encoding:'utf-8'});

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
		let template = await ejs.renderFile(path.resolve(__dirname, "./email.ejs"), { name: 'Stranger' });
		let options = {
			from: 'from_test@gmail.com',
			to: to,
			subject: subject,
			text: content,
			html: template
		}

		try {
			return await this._transporter.sendMail(options);
		} catch (error) {
			return error;
		}
	}

}



