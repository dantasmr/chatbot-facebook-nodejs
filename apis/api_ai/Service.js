const apiai = require('apiai');

class Service {

  constructor(funcIsDefined, api_ai_token) {
    this.isDefined = funcIsDefined;
    this.apiAiService = apiai(api_ai_token, {
      language: "pt-BR",
      requestSource: "fb"
    });
  }

  sendText(text, sessionIds, callback) {

    var saida = {
      type: "",
      responseData: null,
      messages: null,
      action: null,
      contexts: null,
      parameters: null,
      facebook: null,
      responseText: ""
    }

    const apiaiRequest = this.api_service.textRequest(text, {
      sessionId: sessionIds.get(sender)
    });

    apiaiRequest.on('response', (response) => {

      if (util.isDefined(response.result)) {

        saida.responseData = response.result.fulfillment.data;
        saida.messages = response.result.fulfillment.messages;
        saida.action = response.result.action;
        saida.contexts = response.result.contexts;
        saida.parameters = response.result.parameters;

        if (this.isDefined(messages) && (messages.length == 1 &&
            messages[0].type != 0 || messages.length > 1)) {
          saida.type = "CardMessages";
        } else if (responseText == '' && !this.isDefined(action)) {
          saida.type = "Unknown";
        } else if (this.isDefined(action)) {
          saida.type = "action";
        } else if (this.isDefined(responseData) && this.isDefined(responseData.facebook)) {
          saida.type = "facebook";
          saida.facebook = responseData.facebook
        } else if (this.isDefined(responseText)) {
          saida.type = "responseText";
          saida.responseText = responseText;
        }
      }
    });
    apiaiRequest.on('error', (error) => {
      callback(error, null);
    });
    apiaiRequest.end();
    callback(null, saida);
  }
}

module.exports = function () {
  return Service;
}