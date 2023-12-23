//import the modules that are required
const express = require('express')
const router = express.Router()
const authController = require('./authController')

//This method post will register the use
router.post('/register',(req, res) => {
        //retrive name, email and password from request body
        //calling authController registeruser method return the error msg or the result
        const {name, email, password} = req.body
        if(!(name, email, password)){
                return res.status(400).send('Required inputs are missing.')
        }
        const userDetails = {name, email, password}
        authController.registerUser(userDetails, (err, result)=>{
                if(err) {
                        res.status(400).send({error: err})
                }
                return res.status(201).send(result)
        })
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
        //retrive email and password from req.body
        const {email, password} = req.body
        if(!(email, password)) {
                return res.status(400).send('Required inputs are missing')
        }
      
        //calling the authController login usermethod return the error or the result 
        authController.loginUser({email, password}, (err, result) => {
                if(err) {
                        return res.status(401).send({error: err})
                }
                return res.status(200).send({STATUS: "OK", token: result})
        })

})

module.exports = router