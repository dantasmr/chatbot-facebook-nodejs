'use strict';

const app = require('./config/config');

// app.config.tokens.validaTokens(app, function (err) {
// 	if (err) app.config.stop(err.message);
// });

console.log('Servidor ouvindo na porta 5000');
app.set('port', (process.env.PORT || 5000))


app.get('/tempo', (req, res) => {
	const funcIsContains = app.config.util.getIsContainsKeyJson;
	const tempo = new app.apis.yahoo.Tempo(funcIsContains, 'Sao paulo', 'sp');
	tempo.getPrevisao((err, previsao) => {
		if (!err) {
			res.json(previsao)
		} else {
			res.status(404).json(err)
		}

	})
});

app.get('/cotacao', (req, res) => {
	const funcIsContains = app.config.util.getIsContainsKeyJson;
	const cotacao = new app.apis.yahoo.Cotacao(funcIsContains);
	cotacao.getCotacao((err, cotacoes) => {
		if (!err) {
			res.json(cotacoes)
		} else {
			res.status(404).json(err)
		}

	})
});


// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});