import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/home.js';



class App extends React.Component{
  render(){
    return (
      <div className="app">
        <Router>
        <MyNavbar />
          <Route path='/' exact component={Home} />
      </Router>
      </div>
    );
  }
}

export default App;
