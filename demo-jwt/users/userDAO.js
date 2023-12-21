const users = require('./users.json')
const fs = require('fs')

function findUser(email, done) {
    const fetchedUser = users.filter((user) => user.email === email)[0]
    return done(undefined, fetchedUser)
}

function registerUser(userData, done) {
    users.push(userData)
    fs.writeFileSync('./users/users.json', JSON.stringify(users))
    done(undefined, userData)
}

module.exports = {
    findUser, registerUser
}