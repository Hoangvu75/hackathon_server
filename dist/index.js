"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ACCESS_LINK = __importStar(require("./utils/access_link"));
const API_LINK = __importStar(require("./utils/api_link"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
function initate_server() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening to server: ${PORT}, connecting to the database...`);
    });
}
function setup_database_connection() {
    mongoose_1.default.connect(ACCESS_LINK.DB_CONNECTION_STRINGS, function (err) {
        console.log("Initialization completed.");
        if (err) {
            console.log("Connection error");
            throw err;
        }
    });
}
function setup_get_request() {
    app.get(API_LINK.LINK, function (_req, res) {
        res.sendFile("./index.html", { root: __dirname });
    });
    app.get(API_LINK.LINK_USER, (_req, res) => __awaiter(this, void 0, void 0, function* () {
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
            res.status(200).send({
                success: true,
                message: "Get userlist successfully",
                data: results,
            });
        }
        catch (err) {
            res.status(500).send({
                success: false,
                message: err,
            });
        }
    }));
}
function setup_post_request() {
    app.post(API_LINK.LINK_CREATE_USER, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const my_user = new user_1.default(req.body);
            yield my_user.save();
            return res.status(200).send({
                success: true,
                message: "Create user successfully",
                data: my_user,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: err,
            });
        }
    }));
    app.post(API_LINK.LINK_AUTHEN_REGISTER, (req, res) => __awaiter(this, void 0, void 0, function* () {
        // if (req.body.username.length < 8 || req.body.password.length < 8) {
        //     res.status(406).send({
        //         status: 406,
        //         message: "Register failed, username and password must be at least 8 characters."
        //     });
        // } else {
        //     var username = req.body.username;
        //     Account.findOne({ username: username }, async function (err: any, account: any) {
        //         if (err) {
        //             return res.status(500).send({
        //                 message: `${err}`,
        //             });
        //         }
        //         if (account) {
        //             return res.status(406).send({
        //                 status: 406,
        //                 message: "Register failed, this  account is already created.",
        //             });
        //         }
        //         if (!account) {
        //             try {
        //                 const new_account = new Account(req.body);
        //                 await new_account.save();
        //                 return res.status(200).send({
        //                     status: 200,
        //                     message: "Register successfully",
        //                     new_account,
        //                 });
        //             } catch (err) {
        //                 return res.status(500).send({ message: `${err}` });
        //             }
        //         }
        //     });
        // }
        try {
            const new_account = new account_1.default(req.body);
            yield new_account.save();
            return res.status(200).send({
                success: true,
                message: "Register successfully",
                data: new_account,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: err,
            });
        }
    }));
    app.post(API_LINK.LINK_AUTHEN_LOGIN, (req, res) => __awaiter(this, void 0, void 0, function* () {
        var username = req.body.username;
        var password = req.body.password;
        account_1.default.findOne({ username: username, password: password }, function (err, account) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: err,
                });
            }
            if (!account) {
                return res.status(404).send({
                    success: false,
                    message: "Wrong username or password",
                });
            }
            return res.status(200).send({
                success: true,
                message: "Login successfully",
                data: account,
            });
        });
    }));
    app.post(API_LINK.LINK_AUTHEN_CHANGE_PASSWORD, (req, res) => __awaiter(this, void 0, void 0, function* () {
        var username = req.body.username;
        var password = req.body.password;
        var newPassword = req.body.newPassword;
        var retypeNewPassword = req.body.retypeNewPassword;
        account_1.default.findOne({ username: username, password: password }, function (err, account) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: err,
                });
            }
            if (!account) {
                return res.status(404).send({
                    success: false,
                    message: "Wrong current password",
                });
            }
            if (account) {
                if (newPassword.length < 8) {
                    return res.status(406).send({
                        success: false,
                        message: "Request failed, password must be at least 8 characters.",
                    });
                }
                else if (newPassword !== retypeNewPassword) {
                    return res.status(406).send({
                        success: false,
                        message: "Request failed, please type correct password.",
                    });
                }
                else {
                    account_1.default.updateOne({ username: username, password: password }, { username: username, password: newPassword }, function (err) {
                        if (err) {
                            return res.status(500).send({
                                success: false,
                                message: err,
                            });
                        }
                        else {
                            return res.status(200).send({
                                success: true,
                                message: "Change password successfully.",
                            });
                        }
                    });
                }
            }
        });
    }));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        initate_server();
        setup_database_connection();
        setup_get_request();
        setup_post_request();
    });
}
main();
