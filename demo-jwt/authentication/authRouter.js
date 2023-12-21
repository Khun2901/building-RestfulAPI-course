const express = require('express')
const router = express.Router()
const authController = require('./authController')

router.post('/register', (req, res) => {
    try{
        const {name, email, password} = req.body
        if(!(name, email, password)) {
            return res.status(400).send("Required inputs are missing")
        }

        const userDetails = { name, email, password }

        authController.registerUser(userDetails, (error, results) => {
            if(error) {
                return res.status(400).send({error: "User already existed"})
            }
            return res.status(201).send(results)
        })

    } catch(error) {
        res.status(500).send({error: "Unexpected error while registering"})
    }
})

router.post('/login', (req, res) => {
    try {
        const {email, password} = req.body
        if(!(email, password)) {
            return res.status(400).send("Required inputs are missing.")
        }
        authController.loginUser({email, password}, (error, results) => {
            if(error) {
                return res.status(401).send({error: "Invalid credentials", error})
            }
            else {
                return res.status(200).send(results)
            }
        })

    } catch(error) {
        res.status(500).send("Unexpected Error while logging in")
    }
})

module.exports = router