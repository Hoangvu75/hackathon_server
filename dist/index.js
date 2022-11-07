"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const account_1 = __importDefault(require("./model/account"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening to server");
});
mongoose_1.default.connect(process.env.DB_CONNECTION_STRING, () => {
    console.log("Connected to the database");
});
// request
app.get('/', function (_req, res) {
    res.sendFile('./index.html', { root: __dirname });
});
app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        function getResults() {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function* () {
                var arrayRes = [];
                try {
                    for (var _b = __asyncValues(user_1.default.find()), _c; _c = yield _b.next(), !_c.done;) {
                        const doc = _c.value;
                        arrayRes.push(doc);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return arrayRes;
            });
        }
        const results = yield getResults();
        res.status(200).send(results);
    }
    catch (err) {
        res.status(500).send({ message: `${err}` });
    }
}));
app.post("/users/create_user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const my_user = new user_1.default(req.body);
        yield my_user.save();
        res.status(200).send(my_user);
    }
    catch (err) {
        res.status(500).send({ message: `${err}` });
    }
}));
app.post("/authen/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username.length < 8 || req.body.password.length < 8) {
        res.status(406).send({
            status: 406,
            message: "Register failed, username and password must be at least 8 characters."
        });
    }
    else {
        var username = req.body.username;
        account_1.default.findOne({ username: username }, function (err, account) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).send({
                        message: `${err}`,
                    });
                }
                if (account) {
                    return res.status(406).send({
                        status: 406,
                        message: "Register failed, this  account is already created.",
                    });
                }
                if (!account) {
                    try {
                        const new_account = new account_1.default(req.body);
                        yield new_account.save();
                        return res.status(200).send({
                            status: 200,
                            message: "Register successfully",
                            new_account,
                        });
                    }
                    catch (err) {
                        return res.status(500).send({ message: `${err}` });
                    }
                }
            });
        });
    }
}));
app.post("/authen/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var username = req.body.username;
    var password = req.body.password;
    account_1.default.findOne({ username: username, password: password }, function (err, account) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err,
            });
        }
        if (!account) {
            return res.status(404).send({
                status: 404,
                message: "Wrong username or password",
            });
        }
        return res.status(200).send({
            status: 200,
            message: "Login successfully",
            account
        });
    });
}));
app.post("/authen/change_password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var username = req.body.username;
    var password = req.body.password;
    var newPassword = req.body.newPassword;
    var retypeNewPassword = req.body.retypeNewPassword;
    account_1.default.findOne({ username: username, password: password }, function (err, account) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err,
            });
        }
        if (!account) {
            return res.status(404).send({
                status: 404,
                message: "Wrong current password",
            });
        }
        if (account) {
            if (newPassword.length < 8) {
                res.status(406).send({
                    status: 406,
                    message: "Request failed, password must be at least 8 characters."
                });
            }
            else if (newPassword !== retypeNewPassword) {
                res.status(406).send({
                    status: 406,
                    message: "Request failed, please type correct password."
                });
            }
            else {
                account_1.default.updateOne({ username: username, password: password }, { username: username, password: newPassword }, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            message: err,
                        });
                    }
                    else {
                        return res.status(200).send({
                            status: 200,
                            message: "Change password successfully.",
                        });
                    }
                });
            }
        }
    });
}));
