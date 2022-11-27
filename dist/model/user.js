"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    image_url: { type: String, default: null },
    participated_campaign: { type: Array, default: null, unique: true },
});
exports.default = (0, mongoose_1.model)("user", User);
