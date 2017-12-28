class Templates {
    static createPngTemplate() {
        var templ = 
            '<html>' +
                '<head></head>' +
                '<body>' +
                    '<img src="/getqr?type=png&size=500x500&text=helloworld"></img>' +
                '</body>' +
            '</html>';
        return templ;
    }
}

module.exports.templates = Templates;