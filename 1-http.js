const http = require('http');
const fs = require('fs');
//const http2 = require('http2'); //https 만 사용

// req : 요청 , res : 응답
// 문제점 : text/html 만 보낼 수 있음
const server = http.createServer((req, res) => {
  console.log('incoming...');
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  res.setHeader('Content-type', 'text/html');
  if (url === '/') {
    const read = fs.createReadStream('./html/index.html');
    read.pipe(res);
  } else if (url === '/courses') {
    fs.createReadStream('./html/courses.html').pipe(res);
  } else {
    fs.createReadStream('./html/not-found.html').pipe(res);
  }
});

server.listen(8080);
