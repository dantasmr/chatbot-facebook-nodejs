// Imports the Google Cloud client library
var translate = require('@google-cloud/translate')({
  key: 'API Key'
});

// Instantiates a client
const translate = Translate();

// The text to translate, e.g. "Hello, world!"
// const text = 'Hello, world!';

// The target language, e.g. "ru"
// const target = 'ru';

// The model to use, e.g. "nmt"
// const model = 'nmt';

const options = {
  // The target language, e.g. "ru"
  to: target,
  // Make sure your project is whitelisted.
  // Possible values are "base" and "nmt"
  model: model
};

// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.
translate.translate(text, options)
  .then((results) => {
    let translations = results[0];
    translations = Array.isArray(translations) ? translations : [translations];

    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });