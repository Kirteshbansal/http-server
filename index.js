const http = require("http");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer((req, res) => {
  
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serving on port ${PORT}`));
