const GetRequest = require('../generico/GetRequest.js')();

class CEP {

    constructor(txt_cep) {
        this.url = `https://api.vitortec.com/correios/zip/v1.2/?code=${txt_cep}`;
    }

    find(callback) {
      const requisicao = new GetRequest();
      requisicao.get(this.url, callback);
    }
}

module.exports = function () {
    return CEP;
}