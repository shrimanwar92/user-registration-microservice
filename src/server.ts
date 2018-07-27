import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
// import * as cors from 'cors';

// import routes
import UserRouter from './router/UserRouter';
import EntityRouter from './router/EntityRouter';

// server class
class Server {

	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	config() {
		// setup mongoose
		const MONGO_URI = 'mongodb://dbuser1:dbuser1@ds159507.mlab.com:59507/db1';
		mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
		
		// config
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
		this.app.use(logger('dev'));
		this.app.use(compression());
		this.app.use(helmet());
		this.app.set('view engine', 'ejs');
		// this.app.use(cors());
	}

	routes(): void {
		let router: express.Router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/users', UserRouter);
		this.app.use('/api/v1/entity', EntityRouter);
	}
}

// export
const server = new Server();
export default server.app;