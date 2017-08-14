const GetRequest = require('../generico/GetRequest.js')();

class Tempo {

    constructor() {

        this.api_url_1 = "https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'";
        this.api_url_2 = "')%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    }
    /**
     * @param  {String} estado estado a ser pesquisado
     * @param  {String} cidade cidade a ser pesquisada
     * @param  {function} callback (erro, previsao)
     */
    getPrevisao(estado, cidade, callback) {

        const url = `${this.api_url_1}${cidade},${estado}${this.api_url_2}`;

        const requisicao = new GetRequest();
        requisicao.get(url, (err, previsao) => {
            if (err) {
                callback(err, null)
            } else {
                const itens = previsao.query.results.channel;
                callback(null, extrairPrevisao(itens));
            }
        })
    }
}

function extrairPrevisao(itens) {

    let resultado = "";
    for (let i in itens) {
        const tempo = itens[i];
        let dia = `${getDiaSemana(tempo.item.forecast.day)} (${tempo.item.forecast.date}): ${getDescricaoTempo(tempo.item.forecast.code)} com máxima de ${tempo.item.forecast.high}º e miníma de ${tempo.item.forecast.low}º`

        if (resultado == ""){
            resultado = dia;
        }else{
            resultado = resultado + " / " + dia;
        }
    }
    return resultado;
}


function getDescricaoTempo(code) {
    const ywcc_ptbr = {
        '0': 'tornado',
        '1': 'tempestade tropical',
        '2': 'furacão',
        '3': 'tempestade severa',
        '4': 'trovoadas',
        '5': 'chuva e neve',
        '6': 'chuva e granizo fino',
        '7': 'neve e granizo fino',
        '8': 'garoa gélida',
        '9': 'garoa',
        '10': 'chuva gélida',
        '11': 'chuvisco',
        '12': 'chuva',
        '13': 'neve em flocos finos',
        '14': 'leve precipitação de neve',
        '15': 'ventos com neve',
        '16': 'neve',
        '17': 'chuva de granizo',
        '18': 'pouco granizo',
        '19': 'pó em suspensão',
        '20': 'neblina',
        '21': 'névoa seca',
        '22': 'enfumaçado',
        '23': 'vendaval',
        '24': 'ventando',
        '25': 'frio',
        '26': 'nublado',
        '27': 'muitas nuvens a noite',
        '28': 'muitas nuvens de dia',
        '29': 'parcialmente nublado a noite',
        '30': 'parcialmente nublado de dia',
        '31': 'céu limpo a noite',
        '32': 'ensolarado',
        '33': 'tempo bom a noite',
        '34': 'tempo bom de dia',
        '35': 'chuva e granizo',
        '36': 'quente',
        '37': 'tempestades isoladas',
        '38': 'tempestades esparsas',
        '39': 'tempestades esparsas',
        '40': 'chuvas esparsas',
        '41': 'nevasca',
        '42': 'tempestades de neve esparsas',
        '43': 'nevasca',
        '44': 'parcialmente nublado',
        '45': 'chuva com trovoadas',
        '46': 'tempestade de neve',
        '47': 'relâmpagos e chuvas isoladas',
        '3200': 'não disponível'
    }

    if (ywcc_ptbr[code] != undefined) {
        return ywcc_ptbr[code];
    } else {
        return 'não disponível';
    }

}



function getDiaSemana(abrev) {

    const semana = {
        "Mon": "Segunda",
        "Tue": "Terça",
        "Wed": "Quarta",
        "Thu": "Quinta",
        "Fri": "Sexta",
        "Sat": "Sábado",
        "Sun": "Domingo"
    }

    if (semana[abrev] != undefined) {
        return semana[abrev];
    } else {
        return abrev;
    }
}



module.exports = function () {
    return Tempo;
}