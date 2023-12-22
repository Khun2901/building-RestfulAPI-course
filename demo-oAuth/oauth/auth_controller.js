const oauthService = require('./auth_service')

function oauthProcessor(code, done) {
    oauthService.getGITHubAccessToken(code, (error, token) => {
        if(error) {
            done(error)
        }
        else {
            console.log("pass")
            done(null, token)
        }
    })
}

module.exports = {
    oauthProcessor
}