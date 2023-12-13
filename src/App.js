import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SecurePage from './components/SecurePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
        <Route path='/secure-page' element={<SecurePage/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
