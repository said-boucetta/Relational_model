const crypto = require("crypto");

const privateKey = crypto.randomBytes(256).toString("hex");

console.log(privateKey);
