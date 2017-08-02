const apiai = require('apiai');

function service (api_ai_token) {
  const apiAiService = apiai(api_ai_token, {
    language: "pt-BR",
    requestSource: "fb"
  });
  return apiAiService;
}

module.exports = function(){
  return service;
}
