import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Components/styles/Logout.css';

function LogoutPage() {
  const navigate = useNavigate(); 

  useEffect(() => {
      const handleLogout = () => {
      localStorage.removeItem('userData');
      localStorage.removeItem('token'); 
      navigate('/login'); 
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>You have been logged out.</h2>
      <p>Thank you for using our application. You will be redirected to the login page.</p>
    </div>
  );
}

export default LogoutPage;
