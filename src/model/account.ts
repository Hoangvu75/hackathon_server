import { Schema, model } from 'mongoose';


const Account = new Schema({
    username: { type: String, required: true, unique: true, maxLength: 30, minLength: 8 },
    password: { type: String, required: true },
})

export default model("account", Account);