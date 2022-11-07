import express from 'express';
import mongoose from 'mongoose';

import User from './model/user';
import Account from './model/account';

import DB_CONNECTION_STRING from './utils/access_link';

const app = express();
app.use(express.json());

function initate_server() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening to server: ${PORT}`);
    });
}

function setup_database_connection() {
    mongoose.connect(
        DB_CONNECTION_STRING, 
        () => {
            console.log("Connected to the database");
        }
    );
}

function setup_get_request() {
    app.get('/', function(_req: any, res: any) {
        res.sendFile('./index.html', {root: __dirname })
    });
    
    
    app.get("/users", async (_req: any, res: any) => {
        try {
            async function getResults() {
                var arrayRes:any[] = [];
                for await (const doc of User.find()) {
                    arrayRes.push(doc);
                }
                return arrayRes;
            }
            const results = await getResults();
            res.status(200).send(results);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    });
}

function setup_post_request() {
    app.post("/users/create_user", async (req: any, res: any) => {
        try {
            const my_user = new User(req.body);
            await my_user.save();
            res.status(200).send(my_user);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    });
    
    app.post("/authen/register", async (req: any, res: any) => {
        if (req.body.username.length < 8 || req.body.password.length < 8) {
            res.status(406).send({ 
                status: 406,
                message: "Register failed, username and password must be at least 8 characters."
            });
        } else {
            var username = req.body.username;
    
            Account.findOne({ username: username }, async function (err: any, account: any) {
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
    
    app.post("/authen/login", async (req: any, res: any) => {
        var username = req.body.username;
        var password = req.body.password;
    
        Account.findOne({ username: username, password: password }, function (err: any, account: any) {
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
    
    app.post("/authen/change_password", async (req: any, res: any) => {
        var username = req.body.username;
        var password = req.body.password;
        var newPassword = req.body.newPassword;
        var retypeNewPassword = req.body.retypeNewPassword;
    
        Account.findOne({ username: username, password: password }, function (err: any, account: any) {
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
                    Account.updateOne({ username: username, password: password }, 
                        { username: username, password: newPassword }, 
                        function (err: string) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send({
                                    message: err,
                                });
                            } else {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Change password successfully.",
                                });
                            }
                        }
                    );
                }
            }
        });
    })
}

function main() {
    initate_server();
    setup_database_connection();
    setup_get_request();
    setup_post_request();
}
main();