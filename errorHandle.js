const headers = require("./headerConfig");
const errorCode = require("./erroCode");

function errorHandle(res, code) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "fail",
      message: errorCode[code],
    })
  );
  res.end();
}

module.exports = errorHandle;
