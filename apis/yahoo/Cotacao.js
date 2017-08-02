const request = require('request');

class Cotacao {


    constructor(funcContains) {
        this.isContains = funcContains;
        this.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDBRL%22%2C%20%22EURBRL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    }

    getCotacao(callback) {

        request.get(this.url, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                const moeda = JSON.parse(result.body);
                if (moeda == null) {
                    callback(new Error('Nao foi possivel obter a cotacao'), null)
                } else if (!this.isContains(moeda, "forecast")) {
                    callback(new Error('Nao foi possivel obter a cotacao'), null)
                } else {
                    const itens = moeda.query.results.rate;
                    console.log(itens);
                    callback(null, extrairCotacao(itens));
                }
            }

        })
    }
}


function extrairCotacao(itens) {

    let resultado = {
        cotacao: []
    }

    for (let i in itens) {
        const moeda = itens[i];
        console.log(moeda);
        resultado.cotacao.push({
            "conversao": moeda.Name,
            "cotacao": moeda.Rate
        });
    }
    return resultado;
}

module.exports = function () {
    return Cotacao;
}








