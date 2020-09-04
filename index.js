const http = require("http");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let uuid = uuidv4();
const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    let urlPath = req.url.split("/");

    // HTML file
    if (urlPath[1] == "html") {
      const filePathHTML = path.join(__dirname, "/public/html/index.html");
      fs.readFile(filePathHTML, (err, content) => {
        if (err) {
          console.error(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
      });
    }
    // JSON file
    else if (urlPath[1] == "json") {
      const filePathJSON = path.join(__dirname, "/public/json/data.json");
      fs.readFile(filePathJSON, (err, content) => {
        if (err) {
          console.error(err);
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(content);
        }
      });
    }
    // UUID
    else if (urlPath[1] == "uuid") {
      content = uuid;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ uuid: content }));
    }
    // Status & Status code
    else if (urlPath[1] == "status") {
      switch (urlPath[2]) {
        case "100":
          var status = "Continue";
          break;
        case "200":
          status = "OK";
          break;
        case "300":
          status = "Multiple Choices";
          break;
        case "400":
          status = "Bad Request";
          break;
        case "500":
          status = "Internal Server Error";
          break;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ Status: `${status}`, "Status Code": `${urlPath[2]}` })
      );
    }
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serving on port ${PORT}`));
