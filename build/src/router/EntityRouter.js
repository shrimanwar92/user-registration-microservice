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
const express_1 = require("express");
const Entity_1 = require("../models/Entity");
class EntityRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const entity = yield Entity_1.default.findOne({ _id: id });
                const status = res.statusCode;
                res.json({ status, entity });
            }
            catch (err) {
                const status = res.statusCode;
                res.json({ status, err });
            }
        });
    }
    CreateEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityType = req.body.entityType;
            const entityName = req.body.entityName;
            const uniqueIdentifier = req.body.uniqueIdentifier;
            const address = req.body.address;
            const entity = new Entity_1.default({
                entityType,
                entityName,
                uniqueIdentifier,
                address
            });
            try {
                const ent = yield entity.save();
                const status = res.statusCode;
                res.json({ status, ent });
            }
            catch (err) {
                const status = res.statusCode;
                res.json({ status, err });
            }
        });
    }
    routes() {
        this.router.get('/:id', this.GetEntity);
        this.router.post('/', this.CreateEntity);
    }
}
// export
const entityRoutes = new EntityRouter();
entityRoutes.routes();
exports.default = entityRoutes.router;
