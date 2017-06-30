const http = require('http');
const fs = require('fs');
const url = require('url');
const folderpath = __dirname + '/public';
http.createServer(function(request,respone){

    var baseURL = url.parse(request.url);

    var filePath = (baseURL.pathname ==='/')?folderpath + '/index.html' : folderpath + baseURL.pathname;
    fs.access(filePath,fs.F_OK,function(err){
      if(err){
        respone.writeHead(404,{'Content-type':'text/html'})
        respone.end('<h1>Can not found file</h1>');
      }else{
        fs.readFile(filePath,function(err,contentFile){
            if(!err){
              respone.writeHead(200,{'Content-type':'text/html'})
              respone.end(contentFile);
            }else{
              respone.writeHead(500,{'Content-type':'text/html'})
              respone.end('<h1>Can not read file</h1>');
            }
        });
      }
    });
}).listen(3000);
