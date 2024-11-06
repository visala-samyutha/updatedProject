import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import '../LoginComponent.css';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Removed the agreeTerms state, since it's no longer needed
    const {LoginAction} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            try {
                LoginAction({email, password});
            } catch (error) {
                console.error("Login error:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Login</h1>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-floating mb-3">
                                    <i className="icon fa-regular fa-envelope"></i>
                                    <input
                                        type="email"
                                        id="uname"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor='uname'>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <i className="icon fa-solid fa-key"></i>
                                    <input
                                        type="password"
                                        id="pass"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor='pass'>Password</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark btn-lg">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
