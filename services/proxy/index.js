const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const morgan = require("morgan");
const env = require("dotenv");
const cookieParser = require("cookie-parser");

env.config({ path: `${__dirname}/../../pkg/env/file.env` });

const api = express();
api.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
api.use(cookieParser());
api.use(morgan("dev"));

const authProxy = proxy(`http://localhost:${process.env.AUTH}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});
const passProxy = proxy(`http://localhost:${process.env.PASSWORD}`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/password${req.url}`;
  },
});
api.use("/api/v1/auth", authProxy);
api.use("/api/v1/password", passProxy);

api.listen(process.env.PROXY, (err) => {
  if (err) return console.log(err);
  console.log("Service Started");
});
