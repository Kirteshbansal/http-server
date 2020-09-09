const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const status = require("http-status");

// Path
const filePathHTML = path.join(__dirname, "/public/html/index.html");
const filePathError = path.join(__dirname, "/public/html/404.html");
const filePathJSON = path.join(__dirname, "/public/json/data.json");

// content type
const contentHTML = "text/html";
const contentJSON = "application/json";

function httpRequest(req, res) {
  let urlPath = req.url.split("/");
  return requestType(urlPath, res);
}

function requestType(urlArray, res) {
  switch (urlArray[1]) {
    case "html":
      deliverHTML(filePathHTML, res);
      break;
    case "json":
      deliverJSON(filePathJSON, res);
      break;
    case "uuid":
      deliverUUID(res);
      break;
    case "status":
      deliverStatus(urlArray[2], res);
      break;
    case "delay":
      deliverDelay(urlArray[2], res);
      break;
    default:
      deliverError(filePathError, res);
      break;
  }
}

function httpResponse(res, content, contentType, statusCode) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
}

//  delivers index.html file
function deliverHTML(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      return httpResponse(res, content, contentHTML, (statusCode = 200));
    }
  });
}

//  delivers data.json file
function deliverJSON(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      return httpResponse(res, content, contentJSON, (statusCode = 200));
    }
  });
}

//  delivers UUID
function deliverUUID(res) {
  let content = JSON.stringify({ uuid: uuidv4() });
  return httpResponse(res, content, contentJSON, (statusCode = 200));
}

// delivers Status & Status code
function deliverStatus(status_Code, res) {
  if (status[status_Code]) {
    let content = JSON.stringify({
      Status: status[status_Code],
      "Status Code": status_Code,
    });
    return httpResponse(res, content, contentJSON, status_Code);
  } else {
    let content = JSON.stringify({
      Status: status[400],
      "Status Code": `${400}`,
    });
    return httpResponse(res, content, contentJSON, (statusCode = 400));
  }
}

//  delivers delay in status
function deliverDelay(timeInSeconds, res) {
  if (parseFloat(timeInSeconds) == timeInSeconds) {
    let content =
      `Responsing after ${timeInSeconds + " seconds"}` +
      "\n\n" +
      JSON.stringify({ Status: status[200], "Status Code": `${200}` });
    setTimeout(() => {
      httpResponse(res, content, contentJSON, (statusCode = 200));
    }, parseInt(timeInSeconds) * 1000);
  } else {
    let content =
      `Responsing after ${0 + " seconds"}` +
      "\n\n" +
      JSON.stringify({ Status: status[400], "Status Code": `${400}` });
    return httpResponse(res, content, contentJSON, (statusCode = 400));
  }
}

//  delivers 404.html file
function deliverError(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      return httpResponse(res, content, contentHTML, (statusCode = 404));
    }
  });
}

module.exports = {
  httpRequest: httpRequest,
};
