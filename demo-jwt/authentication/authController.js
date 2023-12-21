const userService = require('../users/userService')
const authService = require('./authService')

function registerUser(userData, done) {
    userService.findUser(userData.email, (error, userFound) => {
        if(error) {
            done(error)
        }
        else {
            if(userFound) {
                done(userFound)
            }
            else {
                userService.registerUser(userData, done)
            }
        }
    })
}

function loginUser({email, password}, done) {
    userService.findUser(email, (error, userFound) => {
        if(error) {
            return done(error)
        }
        else{
            const userVerified = authService.verifyUser({email, password}, userFound)
            if(userVerified) {
                const jwtToken = authService.createJWT(userFound)
                return done(undefined, jwtToken)
            }
            else {
                return done("User not verified!")
            }
        }
    })
}

module.exports = {
    registerUser, loginUser
}