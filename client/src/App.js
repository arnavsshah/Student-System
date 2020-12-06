import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/home.js';
import Login from '../src/components/Login'
import SignUp from './pages/signup';
import Checkout from '../src/components/forms/Checkout';
import Profile from './pages/profile';
import SchoolForm from '../src/components/forms/SchoolForm'
import Library from './pages/library';
import FilterPage from './pages/filter';
class App extends React.Component{
  render(){
    return (
      <div className="app">
        <Router>
          <MyNavbar />
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/addData' component={SchoolForm} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/library' exact component={Library} />
          <Route path='/filter' exact component={FilterPage} />
      </Router>
      </div>
    );
  }
}

export default App;
