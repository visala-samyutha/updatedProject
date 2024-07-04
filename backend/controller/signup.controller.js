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

        res.status(200).json({ token: token, login: true, role: user.role, message: "User logged in successfully", id: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// User password update handler
async function updatePassword(req, res) {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await signModel.findById(userId);

        if (!user) {
            return res.json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Error in updatePassword:', error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
async function getUserData(req, res) {
    try {
        const { id } = req.params;
        const user = await signModel.findById(id, '-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getUserData:', error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
async function updateUserProfile(req, res) {
    try {
        const {id }=req.params;
        const { username, email, mobileNumber } = req.body;
        const user = await signModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user details
        user.username = username;
        user.email = email;
        user.mobileNumber = mobileNumber;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error('Error in updateUserProfile:', error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { saveUser, checkUser, updatePassword, getUserData, updateUserProfile };