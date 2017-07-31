module.exports = {
  
};

module.exports.validaTokens = function (app, callback) {
  
    // Messenger API parameters
    if (!app.config.tokens.FB_PAGE_TOKEN) {
      callback(Error('missing FB_PAGE_TOKEN'));
    }
    if (!app.config.tokens.FB_VERIFY_TOKEN) {
      callback(Error('missing FB_VERIFY_TOKEN'));
    }
    if (!app.config.tokens.API_AI_CLIENT_ACCESS_TOKEN) {
      callback(Error('missing API_AI_CLIENT_ACCESS_TOKEN'));
    }
    if (!app.config.tokens.FB_APP_SECRET) {
      callback(Error('missing FB_APP_SECRET'));
    }
    if (!app.config.tokens.SERVER_URL) { //used for ink to static files
      callback(Error('missing SERVER_URL'));
    }
  
    callback(null);
  
  }
  