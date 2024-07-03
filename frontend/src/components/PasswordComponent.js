import { useState } from "react";
import axios from 'axios';
import { Card, FloatingLabel, Form, Button } from "react-bootstrap";
import '../App.css';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

const PasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Password and confirm password do not match');
            return;
        }
        
        try {
            await axios.put("http://localhost:3002/signup/update", {
                userId: localStorage.getItem("userId"),
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            toast.success('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Error updating password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Title className="mb-4" style={{ textAlign: 'center' }}>Change Password</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="currentpass" label='Current Password:' className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Current Password" 
                            required 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="newpass" label='New Password:' className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="New Password" 
                            required 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmpass" label='Confirm New Password:' className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password" 
                            required 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                    <Button variant="dark" type="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default PasswordComponent;
