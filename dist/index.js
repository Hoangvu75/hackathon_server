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
const campaign_1 = __importDefault(require("./model/campaign"));
const idea_1 = __importDefault(require("./model/idea"));
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
    app.get(API_LINK.LINK_CAMPAIGN_GET, (_req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            function getResults() {
                var e_2, _a;
                return __awaiter(this, void 0, void 0, function* () {
                    var arrayRes = [];
                    try {
                        for (var _b = __asyncValues(campaign_1.default.find()), _c; _c = yield _b.next(), !_c.done;) {
                            const doc = _c.value;
                            arrayRes.push(doc);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return arrayRes;
                });
            }
            const results = yield getResults();
            res.status(200).send({
                success: true,
                message: "Get campaign list successfully",
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
    app.get(API_LINK.LINK_IDEA_GET, (_req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            function getResults() {
                var e_3, _a;
                return __awaiter(this, void 0, void 0, function* () {
                    var arrayRes = [];
                    try {
                        for (var _b = __asyncValues(idea_1.default.find()), _c; _c = yield _b.next(), !_c.done;) {
                            const doc = _c.value;
                            arrayRes.push(doc);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    return arrayRes;
                });
            }
            const results = yield getResults();
            res.status(200).send({
                success: true,
                message: "Get idea list successfully",
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
            const my_user = new user_1.default({
                username: req.body.username,
                name: req.body.name,
                age: req.body.age,
                location: req.body.location,
                participated_campaign: [
                    {
                        _id: "638259d25ff16a02ee8c61a1",
                        title: "Công trình thanh niên",
                        description: "Công trình thanh niên",
                        start_time: 1669568400000,
                        image: "https://thieuhoa.thanhhoa.gov.vn/portal/Photos/2022-06-16/ca3d41128764e0dhe%201%20b.jpg",
                        location: "TP. Thủ Đức, TP. Hồ Chí Minh",
                        followers: ["follower 1", "follower 2"],
                        __v: 0,
                    },
                ],
            });
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
        var username = req.body.username;
        var password = req.body.password;
        if (username.length < 8 || password.length < 8) {
            res.status(406).send({
                success: false,
                message: "Register failed, username and password must be at least 8 characters.",
            });
        }
        else {
            account_1.default.findOne({ username: username }, function (err, account) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(500).send({
                            message: `${err}`,
                        });
                    }
                    if (account) {
                        return res.status(406).send({
                            success: false,
                            message: "Register failed, this  account is already created.",
                        });
                    }
                    if (!account) {
                        try {
                            const new_account = new account_1.default(req.body);
                            yield new_account.save();
                            return res.status(200).send({
                                success: true,
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
        var newPassword = req.body.newPassword;
        account_1.default.findOne({ username: username }, function (err, account) {
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
                    message: "Invalid account",
                });
            }
            if (account) {
                if (newPassword.length < 8) {
                    return res.status(406).send({
                        success: false,
                        message: "Request failed, password must be at least 8 characters.",
                    });
                }
                else {
                    account_1.default.updateOne({ username: username }, { username: username, password: newPassword }, function (err) {
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
    app.post(API_LINK.LINK_CAMPAIGN_POST, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const new_campaign = new campaign_1.default(req.body);
            yield new_campaign.save();
            return res.status(200).send({
                success: true,
                message: "Create campaign successfully",
                new_campaign,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: `${err}`,
            });
        }
    }));
    app.post(API_LINK.LINK_ADD_CAMPAIGN, (req, res) => __awaiter(this, void 0, void 0, function* () {
        var user_id = req.body.user_id;
        var added_campaign_id = req.body.added_campaign_id;
        campaign_1.default.findOne({ _id: added_campaign_id }, function (err, campaign) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: err,
                });
            }
            if (!campaign) {
                return res.status(404).send({
                    success: false,
                    message: "Invalid campaign",
                });
            }
            if (campaign) {
                // return res.status(200).send({
                //   success: true,
                //   campaign
                // });
                user_1.default.findOne({ _id: user_id }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            success: false,
                            message: err,
                        });
                    }
                    if (!user) {
                        return res.status(404).send({
                            success: false,
                            message: "Invalid user",
                        });
                    }
                    if (user) {
                        user_1.default.updateOne({ _id: user_id }, { $addToSet: { participated_campaign: campaign } }, function (err) {
                            if (err) {
                                return res.status(500).send({
                                    success: false,
                                    message: err,
                                });
                            }
                            else {
                                return res.status(200).send({
                                    success: true,
                                    message: "Add campaign successfully.",
                                });
                            }
                        });
                    }
                });
            }
        });
    }));
    app.post(API_LINK.LINK_IDEA_POST, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const new_idea = new idea_1.default(req.body);
            yield new_idea.save();
            return res.status(200).send({
                success: true,
                message: "Create idea successfully",
                new_idea,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: `${err}`,
            });
        }
    }));
    app.post(API_LINK.LINK_USER_PERSONAL_PROFILE, (req, res) => __awaiter(this, void 0, void 0, function* () {
        var username = req.body.username;
        try {
            user_1.default.findOne({ username: username }, function (err, user) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(500).send({
                            message: `${err}`,
                        });
                    }
                    if (user) {
                        return res.status(200).send({
                            success: true,
                            message: "Get profile data successfully",
                            data: user,
                        });
                    }
                    if (!user) {
                        return res.status(404).send({
                            success: false,
                            message: "Invalid account",
                        });
                    }
                });
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        initate_server();
        setup_database_connection();
        setup_get_request();
        setup_post_request();
    });
}
main();
