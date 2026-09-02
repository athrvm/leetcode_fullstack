const express = require('express');

const authRouter = express.Router(); // Creating a router object to define routes for user authentication.

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/getProfile', getProfile);
// The above callback functions are controller function. And are kept in seperate file for code readability.








