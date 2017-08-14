const GetRequest = require('../generico/GetRequest.js')();

/*
/* @class CEP Pesquisa a cidade a partir do CEP 
*/
class CEP {

    constructor() {
        this.url = "https://api.vitortec.com/correios/zip/v1.2/?code=";
    }

    /**
     * @param  {String} cep CEP que deve ser pesquisado
     * @param  {function} callback (err, endereco)
     */
    find(cep, callback) {

        let endereco = "";
        const requisicao = new GetRequest();
        requisicao.get(`${this.url}${cep}`, (err, jsoncep) => {
            if (err) {
                callback(err, null);
            } else {
                try {
                    const status = jsoncep.code;
                    if (status == 200) {
                        endereco = `${jsoncep.data.address.trim()}, ${jsoncep.data.district.trim()}, ${jsoncep.data.city.trim()}, ${jsoncep.data.state.trim()}`;
                    } else {
                        endereco = "Cep nao encontrado";
                    }
                    callback(null, endereco);
                } catch (error) {
                    callback(error, null);
                }
            }
        });
    }
}

module.exports = function () {
    return CEP;
}