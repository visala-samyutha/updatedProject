require("dotenv").config();
const signModel = require('../model/signup.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// User registration handler
async function saveUser(req, res) {
    try {
        const { email, password, username, mobileNumber } = req.body;

        // Check if user already exists
        const existingUser = await signModel.findOne({
            $or: [
                { username },
                { email },
                { mobileNumber }
            ],
        });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        // Check if there is already an admin in the database
        const adminExists = await signModel.findOne({ role: 'admin' });
        const role = adminExists ? 'user' : 'admin'; // Assign 'admin' role if no admin exists, otherwise assign 'user'

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await signModel.create({
            email,
            password: hashedPassword,
            username,
            mobileNumber,
            role // Assign the determined role
        });

        res.status(201).json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid details" });
    }
}

// User login handler
async function checkUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await signModel.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(200).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn:'24h'
        });

        res.status(200).json({ token: token, login: true, role: user.role, message: "User logged in successfully",id:user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { saveUser, checkUser };