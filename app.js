'use strict';

const app = require('./config/config');

app.config.tokens.validaTokens(app, function (err) {
	if (err) app.config.stop(err.message);
});

console.log('Servidor ouvindo na porta 5000');
app.set('port', (process.env.PORT || 5000))

// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});






