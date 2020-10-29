import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/search.png'
              label='Search'
              path='/search'
              alt='search'
            />
            <CardItem
              text={text}
              path='/search'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/library.png'
              label='Library'
              path='/library'
              alt='library'
            />
            <CardItem
              text={text}
              path='/library'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/hostel.png'
              label='Hostel'
              path='/hostel'
              alt='hostel'
            />
            <CardItem
              text={text}
              path='/hostel'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
