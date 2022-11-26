import { Schema, model } from 'mongoose';


const Account = new Schema({
    username: { type: String, required: true, unique: true, minLength: 8 },
    password: { type: String, required: true, minLength: 8 },
})

export default model("account", Account);