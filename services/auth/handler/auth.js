const jwt = require("jsonwebtoken");
const { read, write } = require("../../../pkg/storage");
const bcrypt = require("bcryptjs");
const env = require("dotenv");
env.config({ path: `${__dirname}/../../../pkg/env/file.env` });

exports.create = async (req, res) => {
  try {
    const { name, password, strict, code } = req.body;
    if (code % 1000 > 1000) {
      return res.status(400).send("Bad Request");
    }
    let data = await read();
    data = JSON.parse(data);
    let existing = data.find((element) => element.name === name);
    if (existing) {
      return res.status(401).send("Unauthorized");
    }
    let duration;
    switch (strict) {
      case 1:
        duration = Date.now() + 1000 * 60 * 60 * 24 * 90;
        break;
      case 2:
        duration = Date.now() + 1000 * 60 * 60 * 24 * 7;
        break;
      case 3:
        duration = Date.now() + 1000 * 60 * 5;
        break;
      default:
        duration = Date.now() + 1000 * 60 * 60 * 24;
        break;
    }
    const safe = await bcrypt.hash(password, 12);
    const pin = await bcrypt.hash(`${code}`, 12);
    const obj = { name, safe, pin, vault: [] };
    data.push(obj);
    await write(JSON.stringify(data));
    const cookie = jwt.sign({ name: name }, process.env.SECRET, {
      expiresIn: duration,
    });
    res.cookie("jwt", cookie);
    res.status(201).json({ status: "success" });
  } catch (err) {
    return console.log(err);
  }
};
exports.login = async (req, res) => {
  try {
    const { name, password, strict } = req.body;
    let data = await read();
    data = JSON.parse(data);
    let existing = data.find((element) => element.name === name);
    if (!existing.name) {
      return res.status(401).send("Unauthorized");
    }
    let validPassword = bcrypt.compareSync(password, existing.safe);
    if (!validPassword) {
      return res.status(401).send("Unauthorized");
    }
    let duration;
    switch (strict) {
      case 1:
        duration = Date.now() + 1000 * 60 * 60 * 24 * 90;
        break;
      case 2:
        duration = Date.now() + 1000 * 60 * 60 * 24 * 7;
        break;
      case 3:
        duration = Date.now() + 1000 * 60 * 5;
        break;
      default:
        duration = Date.now() + 1000 * 60 * 60 * 24;
        break;
    }
    const cookie = jwt.sign({ name: name }, process.env.SECRET, {
      expiresIn: duration,
    });
    res.cookie("jwt", cookie, {
      expires: new Date(duration),
      secure: false,
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    return console.log(err);
  }
};
exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      secure: false,
    });
    res.status(204).json({ status: "logged out" });
  } catch (err) {
    return console.log(err);
  }
};
exports.protect = (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }
    req.decoded = decoded;
    next();
  } catch (err) {
    return console.log(err);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { code, newPassword, confirmPassword, name } = req.body;
    if (!code || code % 1000 > 1000) {
      return res.status(400).send("Unauthorized");
    }
    let data = await read();
    data = JSON.parse(data);
    let existing = data.findIndex((element) => element.name === name);
    let user = data[existing];
    console.log(user);
    if (!user.name) {
      return res.status(401).send("Unauthorized");
    }
    const valid = bcrypt.compareSync(`${code}`, user.pin);
    if (!valid) {
      return res.status(401).send("Unauthorized");
    }
    if (newPassword !== confirmPassword) {
      res.status(400).send("Bad request");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.safe = hashedPassword;
    data[existing] = user;
    await write(JSON.stringify(data));
    res.status(200).json({ status: "ok" });
  } catch (err) {
    return console.log(err);
  }
};
