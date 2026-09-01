const express = require('express')
const app = express()

// require('dotenv').config({ path: './src/.env' }) // If inside src folder then use this.
require('dotenv').config() // If inside root folder then use this.
const main = require('./config/db') // Importing the database connection file
const cookieParser = require('cookie-parser') // cookies come in json format and this middleware is used to parse the cookies into JavaScript objects.



app.use(express.json()) // Middleware to parse JSON request bodies into JavaScript objects.
app.use(cookieParser()) // Middleware to parse cookies into JavaScript objects.





main() // After connecting to the database, start the server. For that .then is used to start the server after the database connection is successful.
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(` server listening on port ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.log('Error Ocuured:', err);
    });