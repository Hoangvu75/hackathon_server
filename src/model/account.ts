import { Schema, model } from 'mongoose';

const Account = new Schema({
    username: String,
    password: String,
})

export default model("account", Account);