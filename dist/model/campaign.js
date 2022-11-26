"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Campaign = new mongoose_1.Schema({
    title: { type: String, required: true, minLength: 8 },
    description: { type: String, required: true, minLength: 8 },
    start_time: { type: Number, required: true },
    image: { type: String },
    location: { type: String, required: true },
    followers: { type: Array }
});
exports.default = (0, mongoose_1.model)("campaign", Campaign);
