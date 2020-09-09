const http = require("http");
const response = require("./response");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    response.httpRequest(req,res);
  }else{
    res.end(`Invalid method '${req.method}'`)
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serving on port ${PORT}`));
