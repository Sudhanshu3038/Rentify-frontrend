import React, { useState } from 'react';
import axiosInstance from '../Axios/axiosInstance'; 
import '../Components/styles/LoginPage.css';
import Dialog from '../Context/Dialog';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
  });
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleApiError = (error) => {
    if (error.response) {
      setDialogMessage(error.response.data.message || 'An error occurred');
    } else {
      setDialogMessage('Network error');
    }
    setIsDialogOpen(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/Auth/SignIn', {
        email: formData.email,
        password: formData.password,
      });

      console.log('API Response:', response.data); 

      const  token  = response.data;
      console.log('Token:', token); 

      if (token) {
        localStorage.setItem('token', token); 
        setDialogMessage('Login successful!');
        setIsDialogOpen(true);
        navigate('/'); 
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSignup = async () => {
    try {
      await axiosInstance.post('/Auth/SignUp', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        role: 1, 
      });
      setDialogMessage('Signup successful!');
      setIsDialogOpen(true);
      setIsLogin(true); 
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogMessage(''); 
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          {!isLogin && ( 
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter a username"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="toggle-form">
          <p>{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? 'Create an Account' : 'Login'}
          </button>
        </div>
      </div>
      {isDialogOpen && <Dialog message={dialogMessage} onClose={closeDialog} />}
    </div>
  );
}

export default LoginSignup;


