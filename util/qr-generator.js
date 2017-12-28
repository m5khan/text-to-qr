/**
 * Module for handling QR Code based image requests
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

'use strict';
var qr = require('qr-image');
var Jimp = require('jimp');

/**
 * Get text and format and create generate QR code
 * @param {*} format    png, svg or pdf
 * @param {*} size      size of the image
 * @param {*} text      text that will be in QR code
 * @returns [*] Array containing content-type and buffer respectively 
 */
function processQRreq(format, size, text, response) {
    var contentType = null;
    if(format === 'png') {
        contentType = 'image/png';
    } else if(format === 'svg') {
        contentType = 'image/svg+xml';
    } else {
        contentType = 'application/pdf';
    }
    
    if(format === 'png') {
        var imgbuffer = qr.imageSync(text, { type: format, size:getQRsize(size)});
            Jimp.read(imgbuffer, (err, image)=>{
                var [w, h] = parseSizeQuery(size);
                console.log(w,h);
                image.contain(Number(w), Number(h))
                .getBuffer(Jimp.MIME_PNG, (err, buffer)=>{
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
 * Decide how big QR code buffer should be generated
 * @param {string} size      required size by user
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

function parseSizeQuery(size) {
    return size.split('x');
}


module.exports.process = processQRreq;