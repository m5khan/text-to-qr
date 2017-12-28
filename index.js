/**
 * Main script that starts the server and serve the urls
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

const http = require('http');
const URL = require('url');
const querystring = require('querystring');

const QRGenerator = require('./util/qr-generator');
// const TemplateGenerator = require('./util/templates');

/**
 * Http request handler
 * @param {Object} req - http.ClientRequest
 * @param {Object} res - http.ServerResponse
 */
let requestHandler = (req, res) => {
    const {headers, method, url} = req;
    // Handle get requests
    if (method === 'GET') {
        var urlParams = URL.parse(url);
        var [, format, size, text] = urlParams.path.split('/');  
        //TODO: make the proper url with query params
        if(format === 'png' || format === 'jpeg' || format === 'bmp' || format === 'svg' || format === 'pdf') {
            QRGenerator.process(format, size, querystring.unescape(text), res);
        } else if(urlParams.pathname === '/getqr') {
            var qs = querystring.parse(urlParams.query);
            QRGenerator.process(qs.type, qs.size, qs.text, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Not Found");
        }
    }
};

// Start a server
http.createServer(requestHandler).listen(process.env.PORT || 8080);