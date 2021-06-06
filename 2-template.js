const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
//const http2 = require('http2'); //https 만 사용

// req : 요청 , res : 응답
const name = 'Ellie';
const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Javascript' },
  { name: 'Node' },
  { name: 'FrontEnd' },
];

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
    ejs
      .renderFile('./template/index.ejs', { name: name })
      .then((data) => res.end(data));
  } else if (url === '/courses') {
    ejs
      .renderFile('./template/courses.ejs', { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile('./template/not-found.ejs', { name })
      .then((data) => res.end(data));
  }
});

server.listen(8080);
