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

app.get('/traducao', (req, res) => {
	const project_id = app.config.tokens.PROJECT_GOOGLE_ID;
	const google_token = app.config.tokens.GOOGLE_TOKEN;
	const traducao = new app.apis.google.Tradutor(project_id, google_token);
	traducao.traduzir('dog', 'português', (err, texto_traduzido) => {
		if (!err) {
			res.status(200).json(texto_traduzido);
		} else {
			res.status(404).json(err);
		}
	});
});

app.get('/sqlcode', (req, res) => {

	const google_token = app.config.tokens.GOOGLE_TOKEN;
	const google_cx = app.config.tokens.GOOGLE_CX_SQLCODE_TOKEN;
	const funcIsContains = app.config.util.getIsContainsKeyJson;
	const sqlcode = new app.apis.google.SQLCODE(funcIsContains, google_token, google_cx, "100");
	sqlcode.find((err, descricao) => {
		if (!err) {
			res.status(200).json(descricao);
		} else {
			res.status(404).json(err);
		}
	});
});



// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
});