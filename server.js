const http = require("http");

const requesListenser = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, headers);
    res.write("index");
    res.end();
  } else if (req.url === "/" && req.method === "DELETE") {
    res.writeHead(200, headers);
    res.write("success delete");
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write("page not found");
    res.end();
  }
};

const server = http.createServer(requesListenser);
server.listen(8080);
