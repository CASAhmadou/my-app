import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Todos from './pages/Todos';
import LoginSignup from './components/users/LoginSignup';

const App: React.FC =  () => {
  

 
 

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginSignup />}></Route>
        <Route path='/todos' element={<Todos />}></Route>
        <Route path="*" element={<LoginSignup />} />
      </Routes>
    </Router>
    
  );
}

export default App;
