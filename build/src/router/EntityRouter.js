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
const axios_1 = require("axios");
class EntityRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("https://jsonplaceholder.typicode.com/posts/1");
                const data = response.data;
                res.json({ data });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    routes() {
        this.router.get('/', this.GetEntity);
    }
}
// export
const entityRoutes = new EntityRouter();
entityRoutes.routes();
exports.default = entityRoutes.router;
