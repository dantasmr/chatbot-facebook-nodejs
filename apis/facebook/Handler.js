'use strict';

class Handler {

constructor(){
  this.facebookSender = null;
}

  setFacebookSend(facebookSender){
    this.facebookSender = facebookSender;
  }

  handleMessageAttachments(messageAttachments, senderID) {
    //for now just reply
    this.facebookSender.sendTextMessage(senderID, "Attachment received. Thank you.");
  }

  handleQuickReply(senderID, quickReply, messageId) {
    const quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s", messageId, quickReplyPayload);
    //send payload to api.ai
    this.facebookSender.sendToApiAi(senderID, quickReplyPayload);
  }

  //https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-echo
  handleEcho(messageId, appId, metadata) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s", messageId, appId, metadata);
  }

  handleApiAiAction(sender, action, responseText, contexts, parameters) {
    switch (action) {
      default:
        //unhandled action, just send back the text
        this.facebookSender.sendTextMessage(sender, responseText);
    }
  }

  handleMessage(message, sender) {
    switch (message.type) {
      case 0: //text
        this.facebookSender.sendTextMessage(sender, message.speech);
        break;
      case 2: //quick replies
        let replies = [];
        for (var b = 0; b < message.replies.length; b++) {
          let reply = {
            "content_type": "text",
            "title": message.replies[b],
            "payload": message.replies[b]
          }
          replies.push(reply);
        }
        this.facebookSender.sendQuickReply(sender, message.title, replies);
        break;
      case 3: //image
        this.facebookSender.sendImageMessage(sender, message.imageUrl);
        break;
      case 4:
        // custom payload
        var messageData = {
          recipient: {
            id: sender
          },
          message: message.payload.facebook

        };
        this.facebookSender.callSendAPI(messageData);
        break;
    }
  }

  handleCardMessages(messages, sender) {

    const elements = [];
    for (let m = 0; m < messages.length; m++) {
      const message = messages[m];
      const buttons = [];
      for (let b = 0; b < message.buttons.length; b++) {
        const isLink = (message.buttons[b].postback.substring(0, 4) === 'http');
        let button;
        if (isLink) {
          button = {
            "type": "web_url",
            "title": message.buttons[b].text,
            "url": message.buttons[b].postback
          }
        } else {
          button = {
            "type": "postback",
            "title": message.buttons[b].text,
            "payload": message.buttons[b].postback
          }
        }
        buttons.push(button);
      }


      let element = {
        "title": message.title,
        "image_url": message.imageUrl,
        "subtitle": message.subtitle,
        "buttons": buttons
      };
      elements.push(element);
    }
    this.facebookSender.sendGenericMessage(sender, elements);
  }


  handleApiAiResponse(sender, response) {
    const responseText = response.result.fulfillment.speech;
    const responseData = response.result.fulfillment.data;
    const messages = response.result.fulfillment.messages;
    const action = response.result.action;
    const contexts = response.result.contexts;
    const parameters = response.result.parameters;

    this.facebookSender.sendTypingOff(sender);

    if (this.isDefined(messages) && (messages.length == 1 && messages[0].type != 0 || messages.length > 1)) {
      const timeoutInterval = 1100;
      let previousType;
      const cardTypes = [];
      const timeout = 0;
      for (let i = 0; i < messages.length; i++) {

        if (previousType == 1 && (messages[i].type != 1 || i == messages.length - 1)) {

          timeout = (i - 1) * timeoutInterval;
          setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
          cardTypes = [];
          timeout = i * timeoutInterval;
          setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
        } else if (messages[i].type == 1 && i == messages.length - 1) {
          cardTypes.push(messages[i]);
          timeout = (i - 1) * timeoutInterval;
          setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
          cardTypes = [];
        } else if (messages[i].type == 1) {
          cardTypes.push(messages[i]);
        } else {
          timeout = i * timeoutInterval;
          setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
        }

        previousType = messages[i].type;

      }
    } else if (responseText == '' && !this.isDefined(action)) {
      //api ai could not evaluate input.
      console.log('Unknown query' + response.result.resolvedQuery);
      this.facebookSender.sendTextMessage(sender, "I'm not sure what you want. Can you be more specific?");
    } else if (this.isDefined(action)) {
      handleApiAiAction(sender, action, responseText, contexts, parameters);
    } else if (this.isDefined(responseData) && this.isDefined(responseData.facebook)) {
      try {
        console.log('Response as formatted message' + responseData.facebook);
        this.facebookSender.sendTextMessage(sender, responseData.facebook);
      } catch (err) {
        this.facebookSender.sendTextMessage(sender, err.message);
      }
    } else if (this.isDefined(responseText)) {
      this.facebookSender.sendTextMessage(sender, responseText);
    }
  }


  isDefined(obj) {
    if (typeof obj == 'undefined') {
      return false;
    }

    if (!obj) {
      return false;
    }

    return obj != null;
  }

}

module.exports = function () {
  return Handler;
}