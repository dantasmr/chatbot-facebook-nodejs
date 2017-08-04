const GetRequest = require('../generico/GetRequest.js')();

class MegaSena {

    constructor(txt_concurso) {
        this.url = `https://api.vitortec.com/loterias/megasena/v1.2?concurso=${txt_concurso}`;
    }

    find(callback) {
      const requisicao = new GetRequest();
      requisicao.get(this.url, callback);
    }
}

module.exports = function () {
    return MegaSena;
}

/* let snippet = descricao.items[0].snippet;
snippet = snippet.split('of \n').pop(); */