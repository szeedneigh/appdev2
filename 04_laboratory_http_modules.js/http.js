const http = require('http');

const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
  if (req.url === '/greet') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, welcome to Node.js!\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

