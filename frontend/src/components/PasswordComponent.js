import { useState } from "react";
import axios from 'axios';

const PasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Password and confirm password do not match');
            return;
        }
        
        try {
             await axios.put("http://localhost:3002/signup/update", {
                userId:localStorage.getItem("userId"), // replace with actual user ID
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            alert('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Error updating password');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Change Password</h2>
                <div className="mb-3">
                    <label htmlFor="currentpass" className="form-label">Enter Current Password:</label>
                    <input type="password" id="currentpass" className="form-control" placeholder="Current Password" required onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="newpass" className="form-label">Enter New Password:</label>
                    <input type="password" id="newpass" className="form-control" placeholder="Password" required onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpass" className="form-label">Confirm New Password:</label>
                    <input type="password" id="confirmpass" className="form-control" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default PasswordComponent;
