import { Schema, model } from 'mongoose';
import User from './user';


const Idea = new Schema({
    username: { type: String, required: true },
    user_image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
})

export default model("idea", Idea);