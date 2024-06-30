import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FloatingLabel } from "react-bootstrap";
// import { setAuthenticationHeader } from "../authenticate";

const SignUpComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/signup/', {
                email,
                password,
                username,
                mobileNumber,
            });

            if (response.data.message === 'User already exists') {
                alert('User already exists');
            } else {
                const token = response.data.token;
                localStorage.setItem('jsonwebtoken', token);
                // setAuthenticationHeader(token);
                navigate('/login');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Sign Up</h1>
                            <form onSubmit={handleSubmit}>
                                <FloatingLabel label="Email :" className="mb-3">
                                    
                                    <input type="email" id="email" className="form-control" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
                                </FloatingLabel>
                                <FloatingLabel label="Password :"className="mb-3">
                                    <input type="password" id="pass" className="form-control" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                                    <FloatingLabel label="UserNmae :" className="mb-3">
                                    <input type="text" id="username" className="form-control" placeholder="Enter your username" required onChange={(e) => setUsername(e.target.value)} />
                                    </FloatingLabel>                         
                                    <FloatingLabel label ="Mobile Number :"className="mb-3">
                                   
                                    <input type="number" id="mobileNumber" className="form-control" placeholder="Enter your phone number" required onChange={(e) => setMobileNumber(e.target.value)} />
                                </FloatingLabel>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="agreeCheckbox" required />
                                    <label className="form-check-label" htmlFor="agreeCheckbox">
                                        By continuing, I agree to the <Link to="/term">Terms And Conditions</Link> of FashionFusion
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-color btn-lg">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpComponent;