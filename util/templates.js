class Templates {
    static createHtmlTemplate(callback) {
        return '' +
            '<html>' +
                '<head></head>' +
                '<body>' +
                    callback() +
                '</body>' +
            '</html>';
    }

    static createPngTemplate(size, text) {
        return this.createHtmlTemplate(()=>{
            var [w,h] = this.parseSizeParam(size);
            return '<img width='+ w +' height='+ h +' src="/getqr?type=png&text='+ text +'"></img>';
        });
    }

    static parseSizeParam(size) {
        return size.split('x');
    }
}

module.exports.templates = Templates;