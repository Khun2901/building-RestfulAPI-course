const jwt = require('jsonwebtoken')
const config = require('../config')

const verifyToken = (req, res, next) => {
    //getting the auhtorization header
    const token = req.headers["authorization"]

    //Token coming in headers
    if(!token) {
        return res.status(403).send("A token is required for authentication")
    }

    //Synchronously verify given token using a secret or a public key to get a decoded token
    try {
        const decoded = jwt.verify(token, config.AUTH_SECRET)
        req.claims = decoded
    } catch(error) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken