//import the userService and authService module
const userService = require('../Users/userService')
const authService = require('./authService')


//This function will registerUser it will take two parameters
//first the userData second the callback
//call the userService finduser method and also the userService register method
function registerUser(userData, done){
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

//This function will loginUser 
//Use the method findUser of userService to first verify and if userfound than call
//the createToken method
function loginUser({ email, password }, done) {
  userService.findUser(email, (error, userFound) => {
    if(error) {
      return done(error)
    }
    else {
      const isUserVerified = authService.verifyUser({email, password}, userFound)
      if(isUserVerified) {
        const jwtToken = authService.createJWT(userFound);
        return done(undefined, jwtToken)
      }
      else {
        return done("User not verified")
      }
    }
  })
}

module.exports = {
    registerUser, loginUser
}