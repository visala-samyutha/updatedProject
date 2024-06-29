import { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false); // State for checkbox
    // const auth = useAuth();
    const {LoginAction} = useAuth()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
         if (email !== "" && password !== "" && agreeTerms) {
             try {
                
                LoginAction({email,password})
                
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
                            <form onSubmit={(e)=>handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="uname" className="form-label">Email:</label>
                                    <input type="email" id="uname" className="form-control" placeholder="Enter your email" autoFocus required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pass" className="form-label">Password:</label>
                                    <input type="password" id="pass" className="form-control" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="agreeCheckbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="agreeCheckbox">
                                        By continuing, I agree to the <Link to="/term">Terms And Conditions</Link> of FashionFusion
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark btn-lg">Login</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <Link to="/pass">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;