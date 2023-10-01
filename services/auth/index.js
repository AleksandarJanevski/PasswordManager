const handler = require("./handler/auth");
const express = require("express");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
env.config({ path: `${__dirname}/../../pkg/env/file.env` });

const api = express();
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cookieParser());

api.post("/api/v1/auth", handler.create);
api.post("/api/v1/auth/login", handler.login);
api.get("/api/v1/auth/logout", handler.logout);
api.patch("/api/v1/auth/reset", handler.resetPassword);

api.listen(process.env.AUTH, (err) => {
  if (err) return console.log(err);
  console.log("ON");
});
