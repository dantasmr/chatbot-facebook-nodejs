'use strict';

const bodyParser = require('body-parser');

module.exports = function (app) {
  //verify request came from facebook
  app.use(bodyParser.json({
    verify: verifyRequestSignature
  }));

}

/*
 * Verify that the callback came from Facebook. Using the App Secret from 
 * the App Dashboard, we can verify the signature that is sent with each 
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  const signature = req.headers["x-hub-signature"];

  if (!signature) {
    throw new Error('Couldn\'t validate the signature.');
  } else {
    const elements = signature.split('=');
    const method = elements[0];
    const signatureHash = elements[1];

    const expectedHash = app.crypto.createHmac('sha1', app.tokens.FB_APP_SECRET)
      .update(buf)
      .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

