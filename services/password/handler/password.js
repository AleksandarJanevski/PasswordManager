const { read, write } = require("../../../pkg/storage");
const Cryptr = require("cryptr");
const env = require("dotenv");
env.config({ path: `${__dirname}/../../../pkg/env/file.env` });
const cryptr = new Cryptr(process.env.SECRET);

exports.getAll = async (req, res) => {
  try {
    const { decoded } = req;
    if (!decoded.name) {
      return res.status(401).send("Unauthorized");
    }
    let data = await read();
    data = JSON.parse(data);
    let userInfo = data.find((element) => element.username === decoded.name);
    if (!userInfo) {
      return res.status(401).send("Unauthorized");
    }
    let vault = userInfo.vault;
    vault.forEach((element) => {
      (element.email = cryptr.decrypt(element.email)),
        (element.password = cryptr.decrypt(element.password));
    });
    const userData = {
      name: decoded.name,
      vault: vault,
    };
    res.status(200).json({ status: "ok", data: { userData } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
exports.addToVault = async (req, res) => {
  try {
    const { decoded } = req;
    if (!decoded.name) {
      return res.status(401).send("Unauthorized");
    }
    let data = await read();
    data = JSON.parse(data);
    let index = data.findIndex((element) => element.name === decoded.name);
    if (!data[index]) {
      return res.status(401).send("Unauthorized");
    }
    const { title, email, password, strict } = req.body;
    const protectMail = cryptr.encrypt(email);
    const protectPassword = cryptr.encrypt(password);
    const item = {
      title: title,
      email: protectMail,
      password: protectPassword,
      created: new Date(),
      strict: strict,
    };
    data[index].vault.push(item);
    console.log(data);
    await write(JSON.stringify(data));
    res.status(201).json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
exports.updateVault = async (req, res) => {
  try {
    const { decoded } = req;
    if (!decoded.name) {
      return res.status(401).send("Unauthorized");
    }
    let data = await read();
    data = JSON.parse(data);
    let index = data.findIndex((element) => element.name === decoded.name);
    if (!data[index]) {
      return res.status(401).send("Unauthorized");
    }
    let user = data[index];
    const { title, email, password } = req.body;
    let itemIndex = user.vault.findIndex((element) => element.title === title);
    let vaultItem = user.vault[itemIndex];
    vaultItem.email = cryptr.encrypt(email);
    vaultItem.password = cryptr.encrypt(password);
    user.vault[itemIndex] = vaultItem;
    data[index] = user;
    await write(JSON.stringify(data));
    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
