"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const emailService_1 = require("../../lib/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
        const id = req.params.id;
        User_1.default.findOne({ id })
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
        const password = bcrypt.hashSync(req.body.password, 8);
        const mobile = req.body.mobile;
        const aadhar = req.body.aadhar;
        const pan = req.body.pan;
        const isConsented = req.body.isConsented;
        const isVerified = false;
        const gender = req.body.gender;
        const user = new User_1.default({
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
        });
    }
    UpdateUser(req, res) {
        const id = req.params.id;
        User_1.default.findOneAndUpdate({ id }, req.body).then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    DeleteUser(req, res) {
        const id = req.params.id;
        User_1.default.findOneAndRemove({ id }).then(data => {
            const status = res.statusCode;
            res.json({ status, data });
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    LoginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        User_1.default.findOne({ email })
            .then(data => {
            let hash = data['password'];
            if (bcrypt.compareSync(password, hash)) {
                // create a token
                const token = jwt.sign({ id: data._id }, "mylittlesecret", {
                    expiresIn: 86400 // expires in 24 hours
                });
                const status = res.statusCode;
                res.json({ status, auth: true, token: token });
            }
            else {
                const status = 0;
                const err = 'Incorrect password';
                res.json({ status, err });
            }
        }).catch(err => {
            const status = res.statusCode;
            res.json({ status, err });
        });
    }
    sendMail(req, res) {
        console.log("QWIUEQWIUEYQIUWE >>>>>>>>>> IUWQGIUQGWIUEGQIUWE");
        let es = new emailService_1.default();
        es.sendMail('test@gmail.com', 'Hello', 'Hello from gmailService').then(msg => {
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
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
