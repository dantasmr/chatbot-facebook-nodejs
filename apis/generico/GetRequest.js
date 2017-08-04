const request = require('request');

class GetRequest {

    get(url, callback) {
        request.get(url, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                const resultado = JSON.parse(result.body);
                if (resultado == null) {
                    callback(new Error(`Nao foi possivel obter dados da url: ${url}`), null)
                } else {
                    callback(null, resultado);
                }
            }
        });
    }
}

module.exports = function () {
    return GetRequest;
}
