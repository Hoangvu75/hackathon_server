import { Schema, model } from 'mongoose';


const Campaign = new Schema({
    title: { type: String, required: true, minLength: 8 },
    description: { type: String, required: true, minLength: 8 },
    start_time: { type: Number, required: true },
    image: { type: String },
    location: { type: String, required: true },
    followers: { type: Array }
})

export default model("campaign", Campaign);