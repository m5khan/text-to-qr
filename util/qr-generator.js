/**
 * Module for handling QR Code based image requests
 * Author: Shoaib Khan
 * Date: 27/12/2017
 */

'use strict';
var qr = require('qr-image');

/**
 * Get text and format and create generate QR code
 * @param {*} format    png, svg or pdf
 * @param {*} size      size of the image
 * @param {*} text      text that will be in QR code
 * @returns [*] Array containing content-type and buffer respectively 
 */
function processQRreq(format, size, text) {
    var [width, height] = size.split('x');
    var contentType = null;
    if(format === 'png') {
        contentType = 'image/png';
    } else if(format === 'svg') {
        contentType = 'image/svg+xml';
    } else {
        contentType = 'application/pdf';
    }
    return [contentType, qr.imageSync(text, { type: format})];
}

module.exports.process = processQRreq;