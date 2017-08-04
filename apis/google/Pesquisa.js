const GetRequest = require('../generico/GetRequest.js')();

class Pesquisa {

  constructor(google_token, google_cx_token, txt_pesquisa) {
    this.url = `https://www.googleapis.com/customsearch/v1?key=${google_token}&cx=${google_cx_token}&q=${txt_pesquisa}`;
  }

  find(callback) {
    const requisicao = new GetRequest();
    console.log(requisicao);
    requisicao.get(this.url, callback);
  }
}

module.exports = function () {
  return Pesquisa;
}

/* let snippet = descricao.items[0].snippet;
snippet = snippet.split('of \n').pop(); */