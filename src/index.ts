import express from "express";
import mongoose from "mongoose";

import User from "./model/user";
import Account from "./model/account";

import * as ACCESS_LINK from "./utils/access_link";
import * as API_LINK from "./utils/api_link";

const app = express();
app.use(express.json());

function initate_server() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening to server: ${PORT}, connecting to the database...`);
  });
}

function setup_database_connection() {
  mongoose.connect(ACCESS_LINK.DB_CONNECTION_STRINGS, function (err) {
    console.log("Initialization completed.");
    if (err) {
      console.log("Connection error");
      throw err;
    }
  });
}

function setup_get_request() {
  app.get(API_LINK.LINK, function (_req: any, res: any) {
    res.sendFile("./index.html", { root: __dirname });
  });

  app.get(API_LINK.LINK_USER, async (_req: any, res: any) => {
    try {
      async function getResults() {
        var arrayRes: any[] = [];
        for await (const doc of User.find()) {
          arrayRes.push(doc);
        }
        return arrayRes;
      }
      const results = await getResults();
      res.status(200).send({
        success: true,
        message: "Get userlist successfully",
        data: results,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
    }
  });
}

function setup_post_request() {
  app.post(API_LINK.LINK_CREATE_USER, async (req: any, res: any) => {
    try {
      const my_user = new User(req.body);
      await my_user.save();
      return res.status(200).send({
        success: true,
        message: "Create user successfully",
        data: my_user,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err,
      });
    }
  });

  app.post(API_LINK.LINK_AUTHEN_REGISTER, async (req: any, res: any) => {
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
    // try {
    //   const new_account = new Account(req.body);
    //   await new_account.save();
    //   return res.status(200).send({
    //     success: true,
    //     message: "Register successfully",
    //     data: new_account,
    //   });
    // } catch (err) {
    //   return res.status(500).send({
    //     success: false,
    //     message: err,
    //   });
    // }
  });

  app.post(API_LINK.LINK_AUTHEN_LOGIN, async (req: any, res: any) => {
    var username = req.body.username;
    var password = req.body.password;

    Account.findOne(
      { username: username, password: password },
      function (err: any, account: any) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: err,
          });
        }

        if (!account) {
          return res.status(404).send({
            success: false,
            message: "Wrong username or password",
          });
        }

        return res.status(200).send({
          success: true,
          message: "Login successfully",
          data: account,
        });
      }
    );
  });

  app.post(API_LINK.LINK_AUTHEN_CHANGE_PASSWORD, async (req: any, res: any) => {
    var username = req.body.username;
    var password = req.body.password;
    var newPassword = req.body.newPassword;
    var retypeNewPassword = req.body.retypeNewPassword;

    Account.findOne(
      { username: username, password: password },
      function (err: any, account: any) {
        if (err) {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: err,
          });
        }

        if (!account) {
          return res.status(404).send({
            success: false,
            message: "Wrong current password",
          });
        }

        if (account) {
          if (newPassword.length < 8) {
            return res.status(406).send({
              success: false,
              message: "Request failed, password must be at least 8 characters.",
            });
          } else if (newPassword !== retypeNewPassword) {
            return res.status(406).send({
              success: false,
              message: "Request failed, please type correct password.",
            });
          } else {
            Account.updateOne(
              { username: username, password: password },
              { username: username, password: newPassword },
              function (err: any) {
                if (err) {
                  return res.status(500).send({
                    success: false,
                    message: err,
                  });
                } else {
                  return res.status(200).send({
                    success: true,
                    message: "Change password successfully.",
                  });
                }
              }
            );
          }
        }
      }
    );
  });
}

async function main() {
  initate_server();
  setup_database_connection();
  setup_get_request();
  setup_post_request();
}
main();
