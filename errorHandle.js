const headers = require("./headerConfig");

function errorHandle(res) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "fail",
      message: "格式錯誤",
    })
  );
  res.end();
}

module.exports = errorHandle;
