import * as nodemailer from 'nodemailer';
import {EmailTemplate} from 'email-templates';

export default class EailService {
	private _transporter: nodemailer.Transporter;
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
			text: content
		}

		try {
			return await this._transporter.sendMail(options);
		} catch (error) {
			return error;
		}
	}

}



