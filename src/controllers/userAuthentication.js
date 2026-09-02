const User = require('../models/user');
const validate = require('../utils/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const register = async (req, res) => {
    // Logic for user registration

    try {
        validate(req.body); // Validate the request body using the validate function from utils/validate.js

        const { firstName, emailId, password } = req.body;

        // Check if a user with the provided email already exists in the database
        // const existingUser = await User.exists({ emailId: emailId});
        // if (existingUser) {
        //     return res.status(400).json({ message: 'User with this email already exists' });
        // }
        // No need of creating this check as we have already defined emailId as unique in the userSchema. So mongoose will take care of this.


        // save password in hased form.
        req.body.password = await bcrypt.hash(password, 10);

        const user = await User.create(req.body) // Create a new user in the database using the User model

        // create jwt token
        const token = jwt.sign({ _id: user._id, emailId: user.emailId }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 3600000 }); // Set the JWT token in a cookie with a 1-hour expiration time

        res.status(201).send("User registered successfully");

    }
    catch (err) {
        res.status(400).send("Error: " + err);
    }


}


const login = async (req, res) => {

    try {
        const { emailId, password } = req.body;

        if (!emailId) {
            throw new Error("Invalid Credentials");
        }

        if (!password) {
            throw new Error("Invalid Credentials");
        }

        const user = await User.findOne({ emailId: emailId }); // Find a user in the database with the provided email
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isPasswordValid = bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
        if (!isPasswordValid) {
            return res.status(400).send("Invalid Credentials");
        }

        const token = jwt.sign({ _id: user._id, emailId: user.emailId }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 3600000 });
        res.status(200).send("User logged in successfully");


    }
    catch (err) {
        res.status(400).send("Error: " + err);
    }
}
