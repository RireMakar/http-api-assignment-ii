const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);
  const body = [];

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/getUsers':
      jsonHandler.getUsers(request, response);
      break;
    case '/notReal':
      jsonHandler.notFound(request, response);
      break;
    case '/addUser':
      request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
      });
      request.on('data', (chunk) => {
        body.push(chunk);
      });
      request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParameters = query.parse(bodyString);
        jsonHandler.addUser(request, response, bodyParameters);
      });
      break;
    default:
      jsonHandler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
