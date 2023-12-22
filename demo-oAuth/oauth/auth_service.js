const axios = require('axios')
const config = require('../config')

function getGITHubAccessToken(code, done) {
    const body = {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        code
    }
    const opts = { headers: { accept: 'application/json' } }

    axios.post('https://github.com/login/oauth/access_token', body, opts)
        .then((response) => response.data.access_token)
        .then((token) => {
            done(null, token)
        })
        .catch((error) => {
            done({error: error.message})
        })

}

module.exports = {
    getGITHubAccessToken
}