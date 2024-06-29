import { useEffect, useState } from "react";

const PaswordComponent = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Password and confirm password do not match');
        }
    };

    useEffect(() => {
        localStorage.setItem('newPassword', JSON.stringify(newPassword));
        localStorage.setItem('confirmPassword', JSON.stringify(confirmPassword));
    });

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Change Password</h2>
                <div className="mb-3">
                    <label htmlFor="newpass" className="form-label">Enter New Password:</label>
                    <input type="password" id="newpass" className="form-control" placeholder="Password" required autoFocus onChange={(e) => setNewPassword(e.target.value)} />
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

export default PaswordComponent;