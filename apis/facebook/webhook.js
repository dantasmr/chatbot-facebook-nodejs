'use strict';

module.exports.valida = function (app) {

  // for Facebook verification
  app.get('/webhook/', function (req, res) {
    console.log("request");
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === app.config.tokens.FB_VERIFY_TOKEN) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
  });

  /*
   * All callbacks for Messenger are POST-ed. They will be sent to the same
   * webhook. Be sure to subscribe your app to your page to receive callbacks
   * for your page. 
   * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
   *
   */

  app.post('/webhook/', function (req, res) {

    var data = req.body;
    console.log(JSON.stringify(data));

    // Make sure this is a page subscription
    if (data.object == 'page') {

      //Hashmap de sessao
      let sessionIds = new Map();

      //obtendo funcao generica
      const funcIsDefined = app.config.util.getIsDefined();

      //Tokens de acesso
      const tokenFacePage = app.config.tokens.FB_PAGE_TOKEN;
      const tokenApi_ai = app.config.tokens.API_AI_CLIENT_ACCESS_TOKEN;

      //Classes para gerenciar conversa facebook x api.ai
      const facebookSender = new app.apis.facebook.Sender(funcIsDefined, tokenFacePage, sessionIds);
      const facebookHandler = new app.apis.facebook.Handler();
      const facebookReceiver = new app.apis.facebook.Receiver();
      const api_ai = new app.apis.api_ai.Service(funcIsDefined, tokenApi_ai);

      //Relacionando classes para tratar recebimento, envio, api.ai
      facebookSender.setApiAiService(api_ai);
      facebookSender.setFacebookHandler(facebookHandler);
      facebookHandler.setFacebookSend(facebookSender);
      facebookReceiver.setSenderHandler(facebookSender, facebookHandler);

      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach(function (pageEntry) {

        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;

        // Iterate over each messaging event
        pageEntry.messaging.forEach(function (messagingEvent) {
          if (messagingEvent.optin) {
            facebookReceiver.receivedAuthentication(messagingEvent);
          } else if (messagingEvent.message) {
            facebookReceiver.receivedMessage(messagingEvent, sessionIds);
          } else if (messagingEvent.delivery) {
            facebookReceiver.receivedDeliveryConfirmation(messagingEvent);
          } else if (messagingEvent.postback) {
            facebookReceiver.receivedPostback(messagingEvent);
          } else if (messagingEvent.read) {
            facebookReceiver.receivedMessageRead(messagingEvent);
          } else if (messagingEvent.account_linking) {
            facebookReceiver.receivedAccountLink(messagingEvent);
          } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
          }
        });
      });

      res.sendStatus(200);
    }
  });
}