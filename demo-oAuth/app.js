const express = require('express')
const path = require('path')
const dateFormat = require('date-format')
const app = express()
const morgan = require('morgan')
const config = require('./config')
const oauthRouter =  require('./oauth')

//Useful for logging in the request reaching to this server
morgan.token('time', () => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date()))
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'))

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'))
})

app.use('/oauth', oauthRouter)

app.listen(config.PORT, () => {
    console.log(`App listening on Port ${config.PORT}`)
})

app.use((req, res) => {
    console.error(`Requested resource ${req.method} ${req.url} not found..`)
    res.status(400).send("Resources not found!")
})