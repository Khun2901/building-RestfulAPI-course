const usersDao = require('./userDAO')

function findUser(email, done) {
    usersDao.findUser(email, done)
}

function registerUser(userData, done) {
    usersDao.registerUser(userData, done)
}

module.exports = {
    findUser, registerUser
}