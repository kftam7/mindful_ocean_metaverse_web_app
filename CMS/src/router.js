import React from 'react';
import './App.css'
import Layout from './layouts';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Login from './pages/login';
// import Homepage from './pages/home';
import Logout from './pages/logout';
import Emailpage from './pages/email';

function App(){
  return(
    
    <>
      <Router>
          <Routes>
            <Route path ='/login' element={<Login />}/>
            {/* <Route path ='/home' element={<Homepage />}/> */}
            <Route path ='/logout' element={<Logout />}/>
            <Route path ='/email' element={<Emailpage />}/>
            
            <Route exact path="/" element={<Navigate to ='/Homepage' replace />}/>  
          
          </Routes>
      </Router>
    </>
    
  );
}
export default App;
