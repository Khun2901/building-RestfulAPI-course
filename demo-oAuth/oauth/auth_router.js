const express = require('express')
const config = require('../config')
const router = express.Router()
const oauthController = require('./auth_controller')

router.get('/login', (req, res) => {
    console.log("log-in")
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
})

router.get('/callback', (req, res) => {
    try{
        console.log('callback')
        oauthController.oauthProcessor(req.query.code, (error, data) => {
            if(error) {
                res.status(401).send({error: "Bad Request"})
            }
            else {
                console.log("callback!!!")
                res.redirect(`/welcome.html?token=${data}`)
            }
        })
    } catch(error) {
        res.status(500).send("Unexpected error")
    }
})

module.exports = router