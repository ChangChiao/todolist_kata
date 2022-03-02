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
          errorHandle(res, 40001);
        }
      } catch (error) {
        errorHandle(res, 40002);
      }
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    req.on("end", () => {
      try {
        const { title } = JSON.parse(body);
        const id = req.url.split("/").pop();
        const index = todos.findIndex((item) => item.id === id);
        if (title !== undefined && index !== -1) {
          todos[index].title = title;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res, title === undefined ? 40001 : 40003);
        }
      } catch (error) {
        errorHandle(res, 40002);
      }
    });
  } else if (req.url === "/todos" && req.method === "DELETE") {
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
        delete: "ok",
      })
    );
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    const index = todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      console.log("index", index);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "success",
          data: todos,
        })
      );
      res.end();
    } else {
      errorHandle(res, 40003);
    }
  } else {
    errorHandle(res, 404);
  }
};

const server = http.createServer(requesListenser);
server.listen(process.env.PORT || 3005);
