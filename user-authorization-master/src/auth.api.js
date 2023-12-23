const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
});

// Callback url to which github oauth code is sent 
router.get('/callback', (req, res) => {
        // Return the token in cookie
        // Data should be sent either in cookie or in session storage
        try {
                oauthCtrl.oauthProcessor(req.query.code, (error, result) => {
                        if(error) {
                                return res.status(401).send({error: "Bad Request"})
                        }
                        else {
                                return res.redirect(`/index.html?token=${result}`)
                        }
                })
        } catch(error) {
                res.status(500).send("Unexpected error")
        }
       
});

module.exports = router;