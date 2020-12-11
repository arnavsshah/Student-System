import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/home.js';
import Login from '../src/components/Login'
import SignUp from './pages/signup';
import Profile from './pages/profile';
import SchoolForm from '../src/components/forms/SchoolForm'
import EventDetails from '../src/components/event/eventDetails'
import Library from './pages/library';
import FilterPage from './pages/filter';
import EventPage from './pages/event';
export default function App(){
  const [isLogin, setIsLogin] = useState(false);
    return (
      <div className="app">
        <Router >
          <MyNavbar isLogin = {isLogin} setIsLogin = {setIsLogin} />
          <Route path='/' exact component={() => <Home isLogin = {isLogin}  setIsLogin = {setIsLogin}/>}/>
          <Route path='/login' component={() => <Login isLogin = {isLogin} setIsLogin = {setIsLogin}/>} />
          <Route path='/signup' component={() => <SignUp isLogin = {isLogin} />} /> 
          <Route path='/addData' component={() => <SchoolForm isLogin = {isLogin} />} />
          <Route path='/profile' exact component={() => <Profile isLogin = {isLogin} setIsLogin = {setIsLogin}/>} />
          <Route path='/library' component={() => <Library isLogin = {isLogin} />}  />
          <Route path='/filter' component={() => <FilterPage isLogin = {isLogin} setIsLogin = {setIsLogin}/>}  />
          <Route path='/event' component={() => <EventPage isLogin = {isLogin} setIsLogin = {setIsLogin}/>}  />
          <Route path='/eventDetails' component = {EventDetails} />
      </Router>
      </div>
    );
  }
