import { Schema, model } from 'mongoose';

const User = new Schema({
    username: String,
    name: String,
    age: Number,
    location: String,
    image_url: String,
})

export default model("user", User);