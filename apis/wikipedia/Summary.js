const GetRequest = require('../generico/GetRequest.js')();

class Summary {

    constructor() {
        this.url = "https://pt.wikipedia.org/api/rest_v1/page/summary/";
    }
    /**
     * @param  {String} txt_assunto Assunto a ser pesquisado
     * @param  {Function} callback (err, texto, img_url)
     */
    find(txt_assunto, callback) {

        const requisicao = new GetRequest();
        requisicao.get(`${this.url}${txt_assunto}`, (err, json) => {

            if (err) {
                callback(err, null, null);
            } else {
                try {
                    const texto = json.extract;
                    const img_url = json.thumbnail.source;
                    callback(null, texto, img_url);
                } catch (error) {
                    callback(erro, null, null);
                }
            }
        });
    }
}

module.exports = function () {
    return Summary;
}