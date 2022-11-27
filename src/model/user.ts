import { Schema, model } from 'mongoose';

const User = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    image_url: { type: String, default: null },
    participated_campaign: { type: Array, default: null, unique: true }, 
})

export default model("user", User);