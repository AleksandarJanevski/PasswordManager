const fs = require("fs");

exports.read = async () => {
  return new Promise((success, fail) => {
    fs.readFile(`${__dirname}/stored.json`, "utf-8", (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

exports.write = async (data) => {
  return new Promise((success, fail) => {
    fs.writeFile(`${__dirname}/stored.json`, data, (err) => {
      if (err) return fail(err);
      return success("success");
    });
  });
};
