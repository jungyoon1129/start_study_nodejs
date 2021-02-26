var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
      fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}
        </p>
      </body>
      </html>
      `;
      response.writeHead(200);  //웹서버와 웹 브라우저가 통신할때 정상적이라면 200
      response.end(template);
    });
  }
  else{
    response.writeHead(404);  //웹서버와 웹 브라우저가 통신할때 정상적이지 않다면 404
    response.end('Not Found');
  }

});
app.listen(3000);
