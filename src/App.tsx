import React, { useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomePage from './pages/home';


function App() {
  useEffect(() => {

    localStorage.setItem('userKey', '')
    if (!localStorage.getItem('userKey')) {
      localStorage.setItem('userKey', (Math.floor(Math.random() * (5000000000) + 2000000000)).toString())
    }
  }, [localStorage.getItem('userKey')]);
  console.log(localStorage.getItem('userKey'));
  
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
