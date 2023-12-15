import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import AuthorizeClient from './components/AuthorizeClient';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = () => { 
    const userId = localStorage.getItem('userId');
    return userId!== null; 
  }
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
  };

  useEffect(() => {
    // Replace this with your actual authentication check
    const checkAuthentication = async () => {
      await isAuthenticated();
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      <Routes>
        <Route path='/authorize-client' element={<AuthorizeClient/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signout' element={<SignOut/>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
