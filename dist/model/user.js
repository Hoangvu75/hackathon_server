const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: String,
    age: Number,
    university: String,
    class: String,
});
module.exports = mongoose.model("user", User);
