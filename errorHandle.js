const headers = require("./headerConfig");
const errorCode = require("./erroCode");

function errorHandle(res, code) {
  const status = code.toString().substring(0, 3);
  let errorMsg = errorCode["default"];
  if (code) {
    errorMsg = errorCode[code];
  }

  let data = {
    status: "fail",
    message: `error: ${errorMsg}`,
  };

  res.writeHead(status, headers);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = errorHandle;
