"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Idea = new mongoose_1.Schema({
    username: { type: String, required: true },
    user_image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)("idea", Idea);
