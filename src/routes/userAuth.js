const express = require('express');
const {register, login, logout, adminRegister} = require('../controllers/userAuthentication');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const authRouter = express.Router(); // Creating a router object to define routes for user authentication.

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout); // If valid token then only go to logout controller function.
// authRouter.get('/getProfile', getProfile);
// The above callback functions are controller function. And are kept in seperate file for code readability.

authRouter.post("/admin/register", adminMiddleware, adminRegister); // One admin can register another admin. So only admin can access this route. So we will use adminMiddleware to check if the user is admin or not.




module.exports = authRouter;




