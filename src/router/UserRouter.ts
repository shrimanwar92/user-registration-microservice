import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import EailService from '../../lib/emailService';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

class UserRouter {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	GetUsers(req: Request, res: Response): void {
		User.find({}).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		});
	}

	GetUser(req: Request, res: Response): void {
		const id: string = req.params.id;

		User.findOne({ id })
		.then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	CreateUser(req: Request, res: Response): void {
		const firstName: string = req.body.firstName;
		const lastName: string = req.body.lastName;
		const email: string = req.body.email;
		const password: string = bcrypt.hashSync(req.body.password, 8);
		const mobile: string = req.body.mobile;
		const aadhar: string = req.body.aadhar;
		const pan: string = req.body.pan;
		const isConsented: boolean = req.body.isConsented;
		const isVerified: boolean = false;
		const gender: string = req.body.gender;

		const user = new User({
			firstName,
			lastName,
			email,
			password,
			mobile,
			aadhar,
			pan,
			isConsented,
			isVerified,
			gender
		});

		user.save().then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	UpdateUser(req: Request, res: Response): void {
		const id: string = req.params.id;

		User.findOneAndUpdate({ id }, req.body).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	DeleteUser(req: Request, res: Response): void {
		const id: string = req.params.id;

		User.findOneAndRemove({ id }).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	LoginUser(req: Request, res: Response): void {
		const email: string = req.body.email;
		const password: string = req.body.password;

		User.findOne({ email })
		.then(data => {
			let hash = data['password'];
			if(bcrypt.compareSync(password, hash)) {
				// create a token
			    const token = jwt.sign({ id: data._id }, "mylittlesecret", {
			      expiresIn: 86400 // expires in 24 hours
			    });
				const status = res.statusCode;
				res.json({ status, auth: true, token: token });
			} else {
				const status = 0;
				const err = 'Incorrect password';
				res.json({ status, err });
			}
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		});
	}

	sendMail(req: Request, res: Response): void {

		console.log("QWIUEQWIUEYQIUWE >>>>>>>>>> IUWQGIUQGWIUEGQIUWE");

		let es = new EailService();
		es.sendMail('test@gmail.com','Hello','Hello from gmailService').then(msg => {
			const status = res.statusCode;
			res.json({ status, msg });
		});
	}

	routes() {
		this.router.get('/', this.GetUsers);
		this.router.get('/:id', this.GetUser);
		// this.router.get('/', this.sendMail);
		this.router.post('/', this.CreateUser);
		this.router.put('/:id', this.UpdateUser);
		this.router.delete('/:id', this.DeleteUser);
		this.router.route('/login').post(this.LoginUser);
	}
}

// export
const userRoutes: UserRouter = new UserRouter();
userRoutes.routes();

export default userRoutes.router;