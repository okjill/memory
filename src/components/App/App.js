import React from 'react';

import './App.css';

import Gameboard from '../../components/Gameboard/Gameboard';
import GameMenu from '../GameMenu/GameMenu';

import gameData from '../../gameData';
import * as imgSrc from '../../assets/memory.png';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = { gameType: '', gameReset: '' };
  }

  getRandomGame = () => {
    const num = Math.floor(Math.random() * Math.floor(3));
    return this.setGameType(gameData.games[num]);
  }

  setGameType = type => {
    const gameReset = this.state.gameType === type ? true : false;
    this.setState({ gameType: type, gameReset });
  }

  render = () => {
    const gameboard = this.state.gameType
      ? <Gameboard gameReset={ this.state.gameReset } gameType={ this.state.gameType } />
      : null;

    return (
      <div className='app-wrap'>
        <div className='banner-container'>
          <div className='banner-header-container' onClick={ this.getRandomGame }>
            <img src={ imgSrc } alt='memory logo brain' className='banner-logo' />
            <h1 className='banner-header'>Memory!</h1>
          </div>
          <GameMenu
            className='banner-list'
            gameTypes={ gameData.games }
            setGameType={ this.setGameType.bind(this) }
          />
        </div>
        {gameboard}
      </div>
    );
  }
}



export default App;
