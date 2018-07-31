import { Router, Request, Response, NextFunction } from 'express';
import Entity from '../models/Entity';
import axios from 'axios';

class EntityRouter {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	async GetEntity(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;

		try {
			const entity = await Entity.findOne({ _id: id });
			const status = res.statusCode;
			res.json({ status, entity });
		} catch (err) {
			const status = res.statusCode;
			res.json({ status, err });
		}
	}

	async CreateEntity(req: Request, res: Response): Promise<void> {
		const entityType: string = req.body.entityType;
		const entityName: string = req.body.entityName;
		const uniqueIdentifier: string = req.body.uniqueIdentifier;
		const address: boolean = req.body.address;

		const entity = new Entity({
			entityType,
			entityName,
			uniqueIdentifier,
			address
		});

		try {
			const ent = await entity.save();
			const status = res.statusCode;
			res.json({ status, ent });
		} catch (err) {
			const status = res.statusCode;
			res.json({ status, err });
		}
	}

	routes() {
		this.router.get('/:id', this.GetEntity);
		this.router.post('/', this.CreateEntity);
	}
}

// export
const entityRoutes: EntityRouter = new EntityRouter();
entityRoutes.routes();

export default entityRoutes.router;