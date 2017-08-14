const GetRequest = require('../generico/GetRequest.js')();

class Pesquisa {
  /**
   * @param  {String} google_token
   * @param  {String} google_cx_token
   */
  constructor(google_token, google_cx_token) {
    this.url = `https://www.googleapis.com/customsearch/v1?key=${google_token}&cx=${google_cx_token}&q=`;
  }
  /**
   * @param  {String} txt_pesquisa
   * @param  {function} callback
   */
  find(txt_pesquisa, callback) {
    const requisicao = new GetRequest();
    console.log(requisicao);
    requisicao.get(`this.url${txt_pesquisa}`, callback);
  }
}

module.exports = function () {
  return Pesquisa;
}

/* let snippet = descricao.items[0].snippet;
snippet = snippet.split('of \n').pop(); */