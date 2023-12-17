const userService = require('./userService')

const getUsers = function(done) {
    userService.getUsers(done)
}

const getUserById = function(userId, done) {
    userService.getUserById(userId, done)
}

const updateUserDetails = function(userId, username, done) {
    userService.updateUserDetails(userId, username, done)
}

module.exports = { getUsers, getUserById, updateUserDetails }