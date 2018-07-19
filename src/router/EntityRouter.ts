import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';

class EntityRouter {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	async GetEntity(req: Request, res: Response) {
		try {
		    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
		    const data = response.data;
		    res.json({ data });
		} catch (error) {
			console.log(error);
		}
	}

	routes() {
		this.router.get('/', this.GetEntity);
	}
}

// export
const entityRoutes: EntityRouter = new EntityRouter();
entityRoutes.routes();

export default entityRoutes.router;