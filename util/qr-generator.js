/**
 * Module for handling QR Code based image requests
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

'use strict';
var qr = require('qr-image');
var Jimp = require('jimp');

/**
 * Get text, size and format. Generate QR code and return buffer response to client
 * @param {string} format - png, jpeg, bmp, svg or pdf
 * @param {string} size - size of the image e.g 300x300
 * @param {string} text - text that will be in QR code
 * @param {Object} response - node http.ServerResponse object
 */
function processQRreq(format, size, text, response) {
    var contentType = getContentType(format);
    if(format === 'png' || format === 'jpeg' || format === 'bmp') {
        var imgbuffer = qr.imageSync(text, { type: 'png', size:getQRsize(size)});
            Jimp.read(imgbuffer, (err, image)=>{
                var [w, h] = parseSizeQuery(size);
                image.contain(Number(w), Number(h))
                .rgba(false)
                .getBuffer(getMimeType(format), (err, buffer)=>{
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(buffer);
                });
            });    
    } else {
        response.writeHead(200, {'Content-Type': contentType});
        response.end(qr.imageSync(text, {type: format}));
    }
}

/**
 * Returns the content type of the required format
 * @param {string} format - format of the file that has to be sent to client 
 * @returns {string}
 */
function getContentType(format) {
    var contentType = null;
    if(format === 'png') {
        contentType = 'image/png';
    } else if(format === 'jpeg') {
        contentType = 'image/jpeg';
    } else if(format === 'bmp') {
        contentType = 'image/bmp';
    } else if(format === 'svg') {
        contentType = 'image/svg+xml';
    } else if(format === 'pdf') {
        contentType = 'application/pdf';
    }
    return contentType;
}

/**
 * Decide how big QR code buffer should be generated
 * @param {string} size - required size by user
 * @returns {Number}
 */
function getQRsize(size) {
    var [w, h] = parseSizeQuery(size);
    var big = (w > h ? w : h);
    if(big  <= 300) {
        return 5;
    } else if(big <= 600) {
        return 10;
    } else if (big <= 1000) {
        return 20;
    } else if(big <= 1500) {
        return 30;
    } else return 50;
}

/**
 * parse size string
 * @param {string} size - size e.g 300x200 
 * @returns {Array}  [width, height]
 */
function parseSizeQuery(size) {
    return size.split('x');
}

/**
 * get mime type for the image
 * @param {string} mime - format for mime type
 * @returns {Jimp mime type} 
 */
function getMimeType(mime) {
    if (mime === 'png') {
        return Jimp.MIME_PNG;
    } else if (mime === 'jpeg') {
        return Jimp.MIME_JPEG;
    } else return Jimp.MIME_BMP;
}

module.exports.process = processQRreq;