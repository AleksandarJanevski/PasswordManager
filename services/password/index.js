const handler = require("./handler/password");
const auth = require("../auth/handler/auth");
const express = require("express");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
env.config({ path: `${__dirname}/../../pkg/env/file.env` });

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cookieParser());

api.use(auth.protect);
api.get("/api/v1/password/vault", handler.getAll);
api.post("/api/v1/password/add", handler.addToVault);
api.patch("/api/v1/password/update", handler.updateVault);

api.listen(process.env.PASSWORD, (err) => {
  if (err) return console.log(err);
  console.log("ON");
});
