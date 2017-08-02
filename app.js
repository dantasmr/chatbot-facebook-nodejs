'use strict';

const app = require('./config/config');

// app.config.tokens.validaTokens(app, function (err) {
// 	if (err) app.config.stop(err.message);
// });

console.log('Servidor ouvindo na porta 5000');
app.set('port', (process.env.PORT || 5000))


app.get('/tempo', (req, res) => {
	const funcIsContains = app.config.util.getIsContainsKeyJson;
	const previsao = new app.apis.yahoo.PrevisaoTempo(funcIsContains, 'Sao paulo', 'sp');
	previsao.getPrevisao((err, tempo) => {
		if (!err) {
			res.json(tempo)
		} else {
			res.status(404).json(err)
		}

	})
});


// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});