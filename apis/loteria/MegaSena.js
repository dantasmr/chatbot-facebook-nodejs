const GetRequest = require('../generico/GetRequest.js')();
/*
@class MegaSena Pesquisa resultado da mega sena
*/
class MegaSena {

    constructor() {
        this.url = "https://api.vitortec.com/loterias/megasena/v1.2?concurso=";
    }
    /**
     * @param  {String} num_concurso Numero do concurso, pode ser vazio
     * @param  {Function} callback (err, resultado)
     */
    find(num_concurso, callback) {
        console.log(num_concurso);
        let resposta = "";
        const requisicao = new GetRequest();
        requisicao.get(`${this.url}${num_concurso}`, (err, jsoncef) => {
            console.log(jsoncef);

            if (err) {
                callback(err, null)
            } else {
                try {
                    console.log(jsoncef);
                    const status = jsoncef.code;
                    if (status == 200) {
                        const dados = jsoncef.data;
                        const acumulou = (dados.acumulou) ? `Acumulou!` : `${dados.ganhadores.sena.quantidade} ganhador(es) Premio: ${dados.ganhadores.sena.valor}`;
                        const proximo = `Prox. dia ${dados.proximoConcurso.data} no valor de R$${dados.proximoConcurso.estimativa}`
                        resposta = `Concurso:${dados.concurso} (${dados.data}), [${dados.resultado.ordemCrescente[0]}, ${dados.resultado.ordemCrescente[1]}, ${dados.resultado.ordemCrescente[2]},${dados.resultado.ordemCrescente[3]}, ${dados.resultado.ordemCrescente[4]}, ${dados.resultado.ordemCrescente[5]}], ${acumulou}, ${proximo}`
                        callback(null, resposta);
                    } else {
                        callback(null, "Nao foi possivel obter o resultado");
                    }
                } catch (error) {
                    callback(error, null);
                }
            }
        });
    }
}

module.exports = function () {
    return MegaSena;
}
