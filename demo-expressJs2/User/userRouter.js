const express = require('express')
const routes = express.Router()

const userController = require('./userController')

routes.get("/", (req, res) => {
    try{ 
        userController.getUsers((error, results) => {
            if(error) {
                return res.status(400).send(error)
            }
            return res.status(200).send({status: "OK", data: results})
        })
    } catch(error) {
        return res.status(500).send("Try after sometime", error)
    }
})

routes.get("/:userId", (req, res) => {
    try{
        const userId = req.params.userId
        userController.getUserById(userId, (error, results) => {
            if(error) {
                return res.status(400).send(error)
            }
            return res.status(200).send({status: "OK", data: results})
        })
    } catch(error) {
        res.status(500).send("Unexpected error, try after sometime", error)
    }
})

routes.put("/:userId", (req, res) => {
    try{
        const userId = req.params.userId
        const username = req.body.username
        userController.updateUserDetails(userId, username, (error, results) => {
            if(error) {
                return res.status(400).send(error)
            }
            return res.status(200).send({status: "OK", data: results})
        })

    } catch(error) {
        res.status(500).send("Unexpected error, try after sometime", error)
    }
})

module.exports = routes