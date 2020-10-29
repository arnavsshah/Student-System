import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/download.jpg' alt='VJTI'/>
      <h1>STUDENT SYSTEM</h1>
      <h2>VJTI</h2>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          WATCH TRAILER
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;