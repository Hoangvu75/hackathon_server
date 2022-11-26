"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    username: String,
    name: String,
    age: Number,
    location: String,
    image_url: String,
});
exports.default = (0, mongoose_1.model)("user", User);
