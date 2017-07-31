
function config(app) {
  const apiAiService = apiai(app.config.tokens.API_AI_CLIENT_ACCESS_TOKEN, {
    language: "pt-BR",
    requestSource: "fb"
  });
}

module.exports = function(){
  return config;
}