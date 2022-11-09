"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Account = new mongoose_1.Schema({
    username: String,
    password: String,
});
exports.default = (0, mongoose_1.model)("account", Account);
