const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const EventEmitter = require("events");

const port = 3000;
const hostname = "localhost";

const eventEmitter = new EventEmitter();

eventEmitter.on("fileAction", (action, filename) => {
  console.log(`File ${action}: ${filename}`);
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const filename = query.filename;

  if (!filename) {
    res.statusCode = 400;
    res.end("Filename query parameter is required");
    return;
  }

  const filepath = path.join(__dirname, filename);

  if (pathname === "/create") {
    fs.writeFile(filepath, "", (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error creating file");
      } else {
        eventEmitter.emit("fileAction", "created", filename);
        res.statusCode = 200;
        res.end("File created successfully");
      }
    });
  } else if (pathname === "/read") {
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading file");
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else if (pathname === "/update") {
    const content = query.content || "";
    fs.appendFile(filepath, content, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error updating file");
      } else {
        eventEmitter.emit("fileAction", "updated", filename);
        res.statusCode = 200;
        res.end("File updated successfully");
      }
    });
  } else if (pathname === "/delete") {
    fs.unlink(filepath, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error deleting file");
      } else {
        eventEmitter.emit("fileAction", "deleted", filename);
        res.statusCode = 200;
        res.end("File deleted successfully");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Route not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});