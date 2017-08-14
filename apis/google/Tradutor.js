// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

/**
 * @class
 */
class Tradutor {
  /**
   * @constructor
   * @param  {String} projectId id do projeto google
   * @param  {String} token_api_google id token api google
   */
  constructor(projectId, token_api_google) {

    // Instantiates a client
    this.translateClient = Translate({
      projectId: projectId,
      key: token_api_google
    });

  }

  /**
   * @param  {String} texto - Texto a ser traduzido
   * @param  {String} idioma - Idioma destino da tranducao 
   * @param  {requestCallback} cb - CallBack Resposta 
   */
  traduzir(texto, idioma, callback) {

    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.

    if (idioma == 'inglês' || idioma == 'ingles') {
      idioma = 'en';
    } else if (idioma == 'português' || idioma == 'portugues') {
      idioma = 'pt';
    }

    let options = {
      to: idioma,
      model: 'nmt'
    };

    this.translateClient.translate(texto, options)
      .then((results) => {
        console.log(results);
        callback(null, results[0]);
      })
      .catch((err) => {
        callback(err, texto)
      });
  }

/**
 * This callback is displayed as a global member.
 * @callback requestCallback
 * @param {err} Erro - Erro em caso de erro de execucao
 * @param {string} textoTraduzido - Resultado da transcao 
 */
}

module.exports = function () {
  return Tradutor;
}