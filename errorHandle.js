const headers = require("./headerConfig");
const errorCode = require("./erroCode");

function errorHandle(res, code) {
  const status = code.substring(0, 3);
  let errorMsg = erroCode["default"];
  if (status) errorMsg = errorCode[status];
  if (status && code) {
    errorMsg = errorCode[status][code];
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
