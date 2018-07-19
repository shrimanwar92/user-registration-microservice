"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const emailService_1 = require("../../lib/emailService");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetUsers(req, res) {
        console.log("QWIUEQWIUEYQIUWE >>>>>>>>>> IUWQGIUQGWIUEGQIUWE");
        User_1.default.find({}).then(data => {
            let es = new emailService_1.default();
            es.sendMail('shrimanwar92@gmail.com', 'Hello', 'Hello from gmailService').then(msg => {
                res.json({ msg });
            });
            //const status = res.statusCode;
            //res.json({ status, data });
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
        const isConsented = req.body.isConsented;
        const user = new User_1.default({
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
    sendMail(req, res) {
        console.log("QWIUEQWIUEYQIUWE >>>>>>>>>> IUWQGIUQGWIUEGQIUWE");
        let es = new emailService_1.default();
        es.sendMail('<test_user>@gmail.com', 'Hello', 'Hello from gmailService').then(msg => {
            const status = res.statusCode;
            res.json({ status, msg });
        });
    }
    routes() {
        this.router.get('/', this.GetUsers);
        this.router.get('/:aadhar', this.GetUser);
        this.router.get('/mail', this.sendMail);
        this.router.post('/', this.CreateUser);
        this.router.put('/:aadhar', this.UpdateUser);
        this.router.delete('/:aadhar', this.DeleteUser);
    }
}
// export
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
