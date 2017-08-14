const GetRequest = require('../generico/GetRequest.js')();
/**
 * @class
 */
class Cotacao {

    /**
     * @constructor 
     */
    constructor() {
        this.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDBRL%22%2C%20%22EURBRL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    }

    /**
     * @param  {function} callback (err, resultado)
     */
    getCotacao(callback) {

        const requisicao = new GetRequest();
        requisicao.get(this.url, (err, moeda) => {
            if (err) {
                callback(err, null)
            } else {
                try {
                    const itens = moeda.query.results.rate;
                    const dolar_venda = itens[0].Ask;
                    const euro_venda = itens[1].Ask;
                    let resultado = `Dolar R$${dolar_venda} e Euro R$${euro_venda}`
                    callback(null, resultado);
                } catch (error) {
                    callback(error, null)
                }
            }
        });
    }
}

module.exports = function () {
    return Cotacao;
}