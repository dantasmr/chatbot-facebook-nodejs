'use strict';

module.exports = function (app) {

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
    
     const facebookSend = new app.apis.facebook.Sender();
     const facebookHandle = new app.apis.facebook.Handler(facebookSend);
     const facebookReceive = new app.apis.facebook.Receiver(facebookSend, facebookHandle);

    // Make sure this is a page subscription
    if (data.object == 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach(function (pageEntry) {
        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;

        // Iterate over each messaging event
        pageEntry.messaging.forEach(function (messagingEvent) {
          if (messagingEvent.optin) {
            facebookReceive.receivedAuthentication(messagingEvent);
          } else if (messagingEvent.message) {
            facebookReceive.receivedMessage(messagingEvent);
          } else if (messagingEvent.delivery) {
            facebookReceive.receivedDeliveryConfirmation(messagingEvent);
          } else if (messagingEvent.postback) {
            facebookReceive.receivedPostback(messagingEvent);
          } else if (messagingEvent.read) {
            facebookReceive.receivedMessageRead(messagingEvent);
          } else if (messagingEvent.account_linking) {
            facebookReceive.receivedAccountLink(messagingEvent);
          } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
          }
        });
      });

      // Assume all went well.
      // You must send back a 200, within 20 seconds
      res.sendStatus(200);
    }
  });

}
