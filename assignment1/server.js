const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { pipeline } = require("stream");

const PORT = 3000;

const FILE1 = path.join(__dirname, "myfile1.txt");
const FILE2 = path.join(__dirname, "myfile2.txt");

function sendHtml(res, html, statusCode = 200) {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

const server = http.createServer((req, res) => {
  const url = req.url;

  // HOME
  if (url === "/") {
    return sendHtml(
      res,
      `
      <h1>File System Menu</h1>
      <ul>
        <li><a href="/read">Read myfile1</a></li>
        <li><a href="/write">Write to myfile1</a></li>
        <li><a href="/append">Append to myfile1</a></li>
        <li><a href="/copy">Copy myfile1 → myfile2</a></li>
        <li><a href="/pipe">Pipe myfile1 → myfile2</a></li>
      </ul>
      `,
    );
  }

  // READ
  if (url === "/read") {
    fs.readFile(FILE1, "utf8", (err, data) => {
      if (err)
        return sendHtml(
          res,
          `<h2>Error: ${err.message}</h2><a href="/">Back</a>`,
        );

      return sendHtml(
        res,
        `<h2>Content of myfile1:</h2>
         <pre>${data}</pre>
         <a href="/">Back</a>`,
      );
    });
    return;
  }

  //  WRITE
  if (url === "/write" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsed = querystring.parse(body);
      const content = parsed.content || "";

      fs.writeFile(FILE1, content, (err) => {
        if (err)
          return sendHtml(
            res,
            `<h2>Error: ${err.message}</h2><a href="/">Back</a>`,
          );

        return sendHtml(
          res,
          `<h2>Data written successfully!</h2>
           <a href="/">Back</a>`,
        );
      });
    });

    return;
  }

  // WRITE FORM
  if (url === "/write" && req.method === "GET") {
    return sendHtml(
      res,
      `
      <h2>Write to myfile1</h2>
      <form method="POST" action="/write">
        <textarea name="content" rows="5" cols="50" required></textarea><br><br>
        <button type="submit">Write</button>
      </form>
      <a href="/">Back</a>
      `,
    );
  }

  // APPEND
  if (url === "/append" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsed = querystring.parse(body);
      const content = "\n" + (parsed.content || "");

      fs.appendFile(FILE1, content, (err) => {
        if (err)
          return sendHtml(
            res,
            `<h2>Error: ${err.message}</h2><a href="/">Back</a>`,
          );

        return sendHtml(
          res,
          `<h2>Data appended successfully!</h2>
           <a href="/">Back</a>`,
        );
      });
    });

    return;
  }

  //  APPEND FORM
  if (url === "/append" && req.method === "GET") {
    return sendHtml(
      res,
      `
      <h2>Append to myfile1</h2>
      <form method="POST" action="/append">
        <textarea name="content" rows="5" cols="50" required></textarea><br><br>
        <button type="submit">Append</button>
      </form>
      <a href="/">Back</a>
      `,
    );
  }

  // COPY
  if (url === "/copy") {
    fs.copyFile(FILE1, FILE2, (err) => {
      if (err)
        return sendHtml(
          res,
          `<h2>Error: ${err.message}</h2><a href="/">Back</a>`,
        );

      return sendHtml(
        res,
        `<h2>Copied myfile1 → myfile2 successfully!</h2>
         <a href="/">Back</a>`,
      );
    });
    return;
  }

  //PIPE
  if (url === "/pipe") {
    const readStream = fs.createReadStream(FILE1);
    const writeStream = fs.createWriteStream(FILE2);

    pipeline(readStream, writeStream, (err) => {
      if (err)
        return sendHtml(
          res,
          `<h2>Pipe Error: ${err.message}</h2><a href="/">Back</a>`,
        );

      return sendHtml(
        res,
        `<h2>Streamed myfile1 → myfile2 using pipe!</h2>
         <a href="/">Back</a>`,
      );
    });
    return;
  }

  sendHtml(res, `<h2>404 Not Found</h2><a href="/">Back</a>`, 404);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
