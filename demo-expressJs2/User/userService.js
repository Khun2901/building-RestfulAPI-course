const userDAO = require('./userDAO')

const getUsers = function(done) {
    userDAO.getUsers(done)
}

const getUserById = function(userId, done) {
    userDAO.getUserById(userId, done)
}

const updateUserDetails = function(userId, username, done) {
    userDAO.updateUserDetails(userId, username, done)
}

module.exports = { getUsers, getUserById, updateUserDetails }