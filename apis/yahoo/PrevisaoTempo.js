const request = require('request');

class PrevisaoTempo {

    constructor(funcContains, cidade, estado) {

        this.isContains = funcContains;
        this.estado = estado;
        this.cidade = cidade;

        this.api_url_1 = "https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'";
        this.api_url_2 = "')%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    }

    getUrlAPI() {
        return `${this.api_url_1} ${this.cidade}, ${this.estado} ${this.api_url_2}`;
    }

    getPrevisao(callback) {

        request.get(this.getUrlAPI(), (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                const previsao = JSON.parse(result.body);
                if (previsao == null) {
                    callback(new Error('Nao foi possivel obter a previsao do tempo'), null)
                } else if (!this.isContains(previsao, "forecast")) {
                    callback(new Error('Nao foi possivel obter a previsao do tempo'), null)
                } else {
                    const itens = previsao.query.results.channel;
                    console.log(itens);
                    callback(null, extrairPrevisao(itens));
                }
            }

        })
    }
}


function extrairPrevisao(itens) {

    let resultado = {
        previsao: []
    }

    for (let i in itens) {

        const tempo = itens[i];
        console.log(tempo);
        resultado.previsao.push({
            "dia": tempo.item.forecast.date,
            "semana": tempo.item.forecast.day,
            "maxima": `${tempo.item.forecast.high} graus`,
            "minima": `${tempo.item.forecast.low} graus`
        });
    }
    return resultado;
}

module.exports = function () {
    return PrevisaoTempo;
}