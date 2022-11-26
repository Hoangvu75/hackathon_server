"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Account = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, minLength: 8 },
    password: { type: String, required: true, minLength: 8 },
});
exports.default = (0, mongoose_1.model)("account", Account);
