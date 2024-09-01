import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout({ setUser }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });
            setUser(null);
            localStorage.removeItem('user');
            navigate('/auth');  // Redirect to login page after logout
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button className="btn btn-primary mx-3 glow-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
