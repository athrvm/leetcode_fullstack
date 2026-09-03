const express = require('express')
const app = express()

// require('dotenv').config({ path: './src/.env' }) // If inside src folder then use this.
require('dotenv').config() // If inside root folder then use this.
const main = require('./config/db') // Importing the database connection file
const redisClient = require('./config/redis') // Importing the redis connection file
const cookieParser = require('cookie-parser') // cookies come in json format and this middleware is used to parse the cookies into JavaScript objects.
const authRouter = require('./routes/userAuth');

app.use(express.json()) // Middleware to parse JSON request bodies into JavaScript objects.
app.use(cookieParser()) // Middleware to parse cookies into JavaScript objects.

app.use('/user', authRouter);


const InitalizeConnection = async () => {
    try {

        await Promise.all([main(), redisClient.connect()]);
        console.log("All Databases Connected");

        app.listen(process.env.PORT, () => {
            console.log("Server listening at port number: " + process.env.PORT);
        })

    }
    catch (err) {
        console.log("Error: " + err);
    }
}
InitalizeConnection();