const express = require('express');
const mongoose = require('mongoose');

const User = require('./model/user');
const Account = require('./model/account');
const { application } = require('express');

require("dotenv").config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening to server")
});


// const customMiddleware = (req, res, next) => {
//     console.log('custom middleware');
//     next();
// };
// app.use(customMiddleware);

mongoose.connect(
    process.env.DB_CONNECTION_STRING, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    (req, res) => {
        console.log("Connected to the database");
    }
);

// protocol

app.get("/", async (req, res) => {
    res.send({
        GET_Users: "https://hackathon-server-project.herokuapp.com/users",
        POST_Register: "https://hackathon-server-project.herokuapp.com/register",
        POST_Login: "https://hackathon-server-project.herokuapp.com/login",
    });
});

app.get("/users", async (req, res) => {
    try {
        async function getResults() {
            var arrayRes = [];
            for await (const doc of User.find()) {
                arrayRes.push(doc);
            }
            return arrayRes;
        }
        const results = await getResults();
        res.send(results);
    } catch (err) {
        res.send({ message: "error" });
    }
});

app.post("/create_user", async (req, res) => {
    try {
        const my_user = new User(req.body);
        res.send(my_user);
        await my_user.save();
    } catch (err) {
        res.send({ message: "error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const new_account = new Account(req.body);
        await new_account.save();
        res.send({
            status: 200,
            message: "Register successfully",
            new_account,
        });
    } catch (err) {
        res.send({ message: "error" });
    }
});

app.post("/login", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne({ username: username, password: password }, function (err, account) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err,
            });
        }

        if (!account) {
            return res.status(404).send({
                status: 404,
                message: "Wrong username or password",
            });
        }

        return res.status(200).send({
            status: 200,
            message: "Login successfully",
            account
        });
    });
});
