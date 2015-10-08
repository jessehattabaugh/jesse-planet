var static = require('node-static');

var server = new static.Server('./');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    server.serve(request, response);
  }).resume();
}).listen(7777);

console.info("static file server started");
