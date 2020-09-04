const http = require("http");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {

    let urlPath = req.url.split("/");
    
    // HTML file
    if (urlPath[1] == "html") {
      const filePathHTML = path.join(__dirname, "/public/html/index.html");
      console.log("strating rading file ");
      fs.readFile(filePathHTML, (err, content) => {
        if (err) {
          console.error(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
      });
    }
    
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serving on port ${PORT}`));
