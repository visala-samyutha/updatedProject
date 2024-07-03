import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        const savedRole = localStorage.getItem("role");
        return savedRole ? JSON.parse(savedRole) : null;
    });
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem("token");
        return savedToken ? JSON.parse(savedToken) : null;
    });
    const [productId, setProductId] = useState(null);
    const navigate = useNavigate();

    const LoginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:3002/signup/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRole(response.data.role);
            localStorage.setItem("userId", response.data.id);
            toast.success(response.data.message); // Success toast message
            if (response.data && response.data.token) {
                setToken(response.data.token);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                navigate('/');
            }
            localStorage.setItem('role', JSON.stringify(response.data.role));
            if (response.data.role === "admin") {
                navigate('/');
            } else if (response.data.role === "user") {
                navigate('/');
            }
            return;
        } catch (err) {
            console.log(err);
            toast.error('Error logging in'); // Error toast message
        }
    };

    const logOut = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.success('Logged out successfully'); // Success toast message
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, LoginAction, logOut, productId, setProductId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
