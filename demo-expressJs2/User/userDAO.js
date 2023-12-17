const fs = require('fs')

const getUsers =  function(done) {
    fs.readFile('User/users.json', (err, fileContent) => {
        if(err) {
            return done("Encountered error while getting data details")
        }
        let userData = JSON.parse(fileContent)
        return done(undefined, userData)

    })
}

const getUserById = function(userId, done) {
    fs.readFile('User/users.json', (err, fileContent) => {
        if(err) {
            return done("Encountered error while getting data details")
        }
        let userData = JSON.parse(fileContent)
        const fetchedUser = userData.find(user => user.userId === parseInt(userId))
        if(fetchedUser === undefined) {
            return done("No user found for the requested ID")
        }
        return done(undefined, fetchedUser)
    })
}

const updateUserDetails = function(userId, username, done) {
    fs.readFile('User/users.json', (err, fileContent) => {
        if(err) {
            return done("Encountered error while getting data details")
        }
        let userData = JSON.parse(fileContent)
        let index = userData.findIndex(user => user.userId === parseInt(userId))

        if(index == -1) {
            return done("No user found for the requested ID")
        }

        userData[index].username = username
        fs.writeFile('User/user.json', JSON.stringify(userData), (err, updateContent) => {
            if(err) {
                return done("Encountered error while updating user details")
            }
            return done(undefined, "Successfully updates user details")
        })
    })
}

module.exports = { getUsers, getUserById, updateUserDetails }