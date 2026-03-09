var http = require("http");

http
  .createServer(function (request, response) {
    if (request.url === "/" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<H1>Hello World</H1>");
    } else if (request.url === "/about" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<H1>About Us</H1>");
    } else {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>Page not found</h1>");
    }
  })
  .listen(8080);

console.log("Server running at http://localhost:8080/");
