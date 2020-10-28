import React from 'react';
import './App.css';
import MyNavbar from './components/MyNavbar';
class App extends React.Component{
  render(){
    return (
      <div className="app">
        <MyNavbar></MyNavbar>
        <h1>hello form react</h1>
      </div>
    );
  }
}

export default App;
