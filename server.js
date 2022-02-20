const http = require("http");
const { v4: uuidv4 } = require("uuid");
const headers = require("./headerConfig");
const errorHandle = require("./errorHandle");
const todos = [
  {
    title: "吃飯",
    id: uuidv4(),
  },
];

const requesListenser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
    res.end();
  } else if (req.url === "/todos" && req.method === "POST") {
    req.on("end", () => {
      try {
        const { title } = JSON.parse(body);
        if (title !== undefined) {
          const todo = {
            title,
            id: uuidv4(),
          };
          todos.push(todo);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else if (req.url === "/" && req.method === "DELETE") {
    res.writeHead(200, headers);
    res.write(JSON.stringify());
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "fail",
        message: "無此頁面",
      })
    );
    res.end();
  }
};

const server = http.createServer(requesListenser);
server.listen(8080);
