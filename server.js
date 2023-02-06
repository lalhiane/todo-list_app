const StaticServer = require("static-server");

const server = new StaticServer({
  rootPath: "./dist",
  port: 8000,
});

server.start(function () {
  console.log("Server listening to", server.port);
});