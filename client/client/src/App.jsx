import React, { useState } from 'react';
import axios from 'axios';
import Main from './views/Main'
import Detail from './components/Detail';
import Update from './components/Update';
import PersonForm from './components/PersonForm';
import Smartphone from './components/Smartphone';
import Auth from './views/Auth';
import Login from './components/Login'

import {BrowserRouter, Routes, Route,Link} from 'react-router-dom';




import './App.css'

const App = () => {
    const [user,setUser] = useState(localStorage.getItem('user'))
    
    return(
	<div>
    	<BrowserRouter>
        {
    user?
            <Routes>
	    <Route excat element={<Main/>} path="/" default /> 
        <Route element={<PersonForm/>} path="/people" /> 
        <Route element={<Detail/>} path="/people/:id" />
         
        <Route element={<Update/>} path="/people/edit/:id"/>
        <Route element={<Smartphone/>} path="/people/smartphone"/>
    

        


        </Routes> : <Routes>
  
              
        <Route path='/auth' element={<Auth setUser={setUser} user={user} />} />
        <Route path='/login' element={<Login setUser={setUser} user={user} />} />
        <Route exact element={<Auth setUser={setUser} user={user} />} path="/" />
         <Route element={<Auth setUser={setUser} user={user} />} path="/:peopleId" />
        <Route element={<Auth setUser={setUser} user={user} />} path="edit/:peopleId" />
        
        </Routes>

        }
    	</BrowserRouter>
        </div>
        
    ) 
}
export default App;