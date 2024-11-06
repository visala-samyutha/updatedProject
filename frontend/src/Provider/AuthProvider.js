import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        try {
            const savedRole = localStorage.getItem("role");
            return savedRole ? JSON.parse(savedRole) : null;
        } catch (error) {
            console.error("Error parsing role from localStorage", error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        // Directly retrieve token without JSON.parse since it's a JWT string
        return localStorage.getItem("token") || null;
    });

    const [productId, setProductId] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    const LoginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:3002/signup/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { role, user, id, token: jwtToken, message } = response.data;

            setRole(role);
            setName(user.username);
            setToken(jwtToken);

            // Save values to localStorage
            localStorage.setItem("userId", id);
            localStorage.setItem("token", jwtToken); // Store token directly
            localStorage.setItem("role", JSON.stringify(role));

            // Display success message
            toast.success(message);

            // Redirect based on role
            if (role === "admin") {
                navigate('/');
            } else if (role === "user") {
                navigate('/');
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error('Error logging in'); // Error toast message
        }
    };

    const logOut = () => {
        setToken(null);
        setRole(null);

        // Remove items from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        toast.success('Logged out successfully'); // Success toast message
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, LoginAction, logOut, productId, setProductId, name }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
