const http = require('http');
const URL = require('url');

let requestHandler = (req, res) => {
    const {headers, method, url} = req;
    console.log(headers);

    if (method === 'GET') {
        var parsedUrl = URL.parse(url)
        console.log(parsedUrl);
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end(JSON.stringify(parsedUrl));    
    }
}

http.createServer(requestHandler).listen(8080);