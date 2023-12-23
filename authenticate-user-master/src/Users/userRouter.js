//import the required module
const express = require('express')
const router = express.Router()
const userController = require('./userController')

//This get method will get the user with token
router.get('/', (req, res)=>{
       //retrive userdata from req claims
       const userdata = req.claims
       if(!(userdata.email)){
        return res.status(400).send("User\'s email required")
       }

        //Calling controller findUser method return the error or result
        userController.findUser(userdata.email, (err, result)=>{
                if(err) {
                        return res.status(400).send(err)
                }
                return res.status(200).send(result)
        })
   
})


module.exports = router