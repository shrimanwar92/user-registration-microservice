"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetUsers(req, res) {
        User_1.default.find({}).then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    GetUser(req, res) {
        const aadhar = req.params.aadhar;
        User_1.default.findOne({ aadhar })
            .then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    CreateUser(req, res) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const aadhar = req.body.aadhar;
        const pan = req.body.pan;
        const user = new User_1.default({
            firstName,
            lastName,
            email,
            mobile,
            aadhar,
            pan
        });
        user.save().then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    UpdateUser(req, res) {
        const aadhar = req.params.aadhar;
        User_1.default.findOneAndUpdate({ aadhar }, req.body).then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    DeleteUser(req, res) {
        const aadhar = req.params.aadhar;
        User_1.default.findOneAndRemove({ aadhar }).then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    routes() {
        this.router.get('/', this.GetUsers);
        this.router.get('/:aadhar', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:aadhar', this.UpdateUser);
        this.router.delete('/:aadhar', this.DeleteUser);
    }
}
// export
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
