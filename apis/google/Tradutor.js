// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

class Tradutor {

  constructor(projectId, token_api_google) {

    // Instantiates a client
    this.translateClient = Translate({
      projectId: projectId,
      key: token_api_google
    });

  }

  // The text to translate, e.g. "Hello, world!"
  // const text = 'Hello, world!';

  // The target language, e.g. "ru"
  // const target = 'ru';

  // The model to use, e.g. "nmt"
  // const model = 'nmt';

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
      // The target language, e.g. "ru"
      to: idioma,
      // Make sure your project is whitelisted.
      // Possible values are "base" and "nmt"
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
}

module.exports = function () {
  return Tradutor;
}