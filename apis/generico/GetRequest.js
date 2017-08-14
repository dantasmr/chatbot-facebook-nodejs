const request = require('request');

class GetRequest {

    /**
     * @param  {String} url
     * @param  {function} callback (Error, JsonResultado} 
     */
    get(url, callback) {
        request.get(url, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                try {
                    const resultado = JSON.parse(result.body);
                    if (resultado == null) {
                        callback(new Error(`Nao foi possivel obter dados da url: ${url}`), null)
                    } else {
                        callback(null, resultado);
                    }
                } catch (error) {
                    callback(error, null);
                }
            }
        });
    }

}

module.exports = function () {
    return GetRequest;
}