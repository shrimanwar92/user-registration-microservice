import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import transporter from '../../lib/emailService'

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
		const aadhar: string = req.params.aadhar;

		User.findOne({ aadhar })
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
		const mobile: string = req.body.mobile;
		const aadhar: string = req.body.aadhar;
		const pan: string = req.body.pan;
		const isConsented: boolean = req.body.isConsented;

		const user = new User({
			firstName,
			lastName,
			email,
			mobile,
			aadhar,
			pan,
			isConsented
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
		const aadhar: string = req.params.aadhar;

		User.findOneAndUpdate({ aadhar }, req.body).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	DeleteUser(req: Request, res: Response): void {
		const aadhar: string = req.params.aadhar;

		User.findOneAndRemove({ aadhar }).then(data => {
			const status = res.statusCode;
			res.json({ status, data });
		}).catch(err => {
			const status = res.statusCode;
			res.json({ status, err });
		})
	}

	sendMail(req: Request, res: Response) {
		let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'bar@example.com, baz@example.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
		transporter.sendMail(mailOptions, function(error, info) {
		    if (error) {
		        res.json({error});
		    } else {
		        res.json({info});
		    }
		});
	}

	routes() {
		this.router.get('/', this.GetUsers);
		this.router.get('/:aadhar', this.GetUser);
		this.router.post('/', this.CreateUser);
		this.router.put('/:aadhar', this.UpdateUser);
		this.router.delete('/:aadhar', this.DeleteUser);
		this.router.get('/sendMail', this.sendMail);
	}
}

// export
const userRoutes: UserRouter = new UserRouter();
userRoutes.routes();

export default userRoutes.router;