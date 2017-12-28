/**
 * Main script that starts the server and serve the urls
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

const http = require('http');
const URL = require('url');
const querystring = require('querystring');

const QRGenerator = require('./util/qr-generator');
const TemplateGenerator = require('./util/templates');

/**
 * Http request handler
 * @param {*} req 
 * @param {*} res 
 */
let requestHandler = (req, res) => {
    const {headers, method, url} = req;

    // Handle get requests
    if (method === 'GET') {
        var urlParams = URL.parse(url);
        var [, format, size, text] = urlParams.path.split('/');  
        //TODO: make the proper url with query params
        if(format === 'png' || format === 'svg' || format === 'pdf') {
            QRGenerator.process(format, size, text, res);
        } else if(urlParams.pathname === '/getqr') {
            var qs = querystring.parse(urlParams.query);
            QRGenerator.process(qs.type, qs.size, qs.text, res);
            // var [contentType, qrBuffer] = QRGenerator.process(qs.type, qs.text);
            // res.writeHead(200, { 'Content-Type': contentType});
            // res.end(qrBuffer);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Not Found");
        }
    }
};

http.createServer(requestHandler).listen(8080);