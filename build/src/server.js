"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
// import * as cors from 'cors';
// import routes
const UserRouter_1 = require("./router/UserRouter");
const EntityRouter_1 = require("./router/EntityRouter");
// server class
class Server {
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
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.set('view engine', 'ejs');
        // this.app.use(cors());
    }
    routes() {
        let router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter_1.default);
        this.app.use('/api/v1/entity', EntityRouter_1.default);
    }
}
// export
const server = new Server();
exports.default = server.app;
