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
    if (req.body.username.length < 8 || req.body.password.length < 8) {
        res.status(406).send({ 
            status: 406,
            message: "Register failed, username and password must be at least 8 characters."
        });
    } else {
        var username = req.body.username;

        Account.findOne({ username: username }, async function (err, account) {
            if (err) {
                return res.status(500).send({
                    message: `${err}`,
                });
            }
    
            if (account) {
                return res.status(406).send({
                    status: 406,
                    message: "Register failed, this  account is already created.",
                });
            }
    
            if (!account) {
                try {
                    const new_account = new Account(req.body);
                    await new_account.save();
                    return res.status(200).send({
                        status: 200,
                        message: "Register successfully",
                        new_account,
                    });
                } catch (err) {
                    return res.status(500).send({ message: `${err}` });
                }
            }
        });
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

app.post("/change_password", async (req, res) => {
    var username = req.body.username;
    var currentPassword = req.body.password;
    var newPassword = req.body.newPassword;
    var retypeNewPassword = req.body.retypeNewPassword;


    Account.findOne({ username: username, password: currentPassword }, function (err, account) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err,
            });
        }

        if (!account) {
            return res.status(404).send({
                status: 404,
                message: "Wrong current password",
            });
        } 
        
        if (account) {
            if (newPassword.length < 8) {
                res.status(406).send({ 
                    status: 406,
                    message: "Request failed, password must be at least 8 characters."
                });
            } else if (newPassword !== retypeNewPassword) {
                res.status(406).send({ 
                    status: 406,
                    message: "Request failed, please type correct password."
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: "Change password successfully",
                    new_account,
                });
            }
        }
    });
})