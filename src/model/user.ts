import { Schema, model } from 'mongoose';

const User = new Schema({
    name: String,
    age: Number,
    university: String,
    class: String,
})

export default model("user", User);