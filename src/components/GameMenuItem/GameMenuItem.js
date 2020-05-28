import React from 'react';

import * as colors from '../../assets/brain_aqua.png';
import * as zodiac from '../../assets/brain_blue.png';
import * as numbers from '../../assets/brain_white.png';


class GameMenuItem extends React.Component {
  handleClick = type => {
    this.props.setGameType(type);
  }

  render = () => {
    const type = this.props.className;
    const images = {
      colors,
      numbers,
      zodiac
    };
    const imgSrc = images[type];

    return (
      <li
        className='banner-list-item'
        onClick={() => this.handleClick(type)}
      >
        <img className='banner-list-image' src={imgSrc} alt='brain logo' />
      </li>
    );
  }
}

export default GameMenuItem;
