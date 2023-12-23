const oauthService = require("./auth.service");

// Controller code which orchestrates the overall process
// It calls the service functions where the business logic is present
function oauthProcessor(code, done) {
  //Get the access token for the logged in user
  oauthService.getGithubAccessToken(code, (error, token) => {
    if(error) {
      done(error)
    }
    else {
      if(token === undefined) {
        return done("Unauthorized Access")
      }
      return done(null, token)
    }
  })
 
}

module.exports = {
  oauthProcessor
};