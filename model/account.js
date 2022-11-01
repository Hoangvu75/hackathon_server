const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    username: String,
    password: String,
})

module.exports = mongoose.model("account", Account);