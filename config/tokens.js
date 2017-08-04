module.exports = {
  FB_PAGE_TOKEN: 'EAAWejubQsdwBAIkHrPHyd8FTOKP1gsEhZCIP63pW0tC7JC8xzHZC0GjHZBhosxnDyJ0xmpdwYfpRyfQ3rl9pvQYCZBpKuSTNN9kKmZBmU6xNhia7ZAvMAhgoi3bAr8wiXLEyAwE20yO2GDwrdpmB9chOLEoPNEpaBRafjb9M16C5K1TNSdfAww',
  FB_VERIFY_TOKEN: 'mrdbot_2017_duke',
  API_AI_CLIENT_ACCESS_TOKEN: '100bbcacbfd04edfa54c323a39dbfcf5',
  FB_APP_SECRET: 'c0adc8c409b9332264f141117b71c022',
  SERVER_URL: "https://cabd4003.ngrok.io",
  PROJECT_GOOGLE_ID: "groovy-datum-174223",
  GOOGLE_TOKEN: "AIzaSyCwOcjR8jomwBtvId5JXMcUHFmUSaHLae4",
  GOOGLE_CX_SQLCODE_TOKEN: "009305271723446281134:cnjqayk-cdq",
  GOOGLE_CX_GIT_TOKEN: "009305271723446281134:vb7twtsqdo0"
}

module.exports.validaTokens = function (app, callback) {
    // Messenger API parameters
    if (!app.config.tokens.FB_PAGE_TOKEN) {
      callback(Error('Informar o token: FB_PAGE_TOKEN'));
    }
    if (!app.config.tokens.FB_VERIFY_TOKEN) {
      callback(Error('Informar o token: FB_VERIFY_TOKEN'));
    }
    if (!app.config.tokens.API_AI_CLIENT_ACCESS_TOKEN) {
      callback(Error('Informar o token: API_AI_CLIENT_ACCESS_TOKEN'));
    }
    if (!app.config.tokens.FB_APP_SECRET) {
      callback(Error('Informar o token: FB_APP_SECRET'));
    }
    if (!app.config.tokens.SERVER_URL) { //used for ink to static files
      callback(Error('Informar o token: SERVER_URL'));
    }
  
  }
  