import React from 'react';

import './App.css';

import Gameboard from '../../components/Gameboard/Gameboard';
import GameList from '../../components/GameList/GameList';

import gameData from '../../gameData';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = { gameType: '', gameReset: '' };
  }

  setGameType(type) {
    const gameReset = this.state.gameType === type ? true : false;
    this.setState({ gameType: type, gameReset });
  }

  render() {
    const gameboard = this.state.gameType ? <Gameboard gameReset={this.state.gameReset} gameType={ this.state.gameType } /> : null;

    return (
      <div>
        <h1>Memory!</h1>
        <GameList gameTypes={ gameData.games } setGameType={ this.setGameType.bind(this) } />
        {gameboard}
      </div>
    );
  }
}



export default App;
