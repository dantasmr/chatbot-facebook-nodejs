'use strict';

const app = require('./config/config').getapp();

app.config.tokens.validaTokens(app, function (err) {
	if (err != null) throw err;
});

console.log('Servidor ouvindo na porta 5000');
app.set('port', (process.env.PORT || 5000))

//Configuracao inicial do facebook
app.apis.facebook.config(app);



