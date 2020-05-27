import React from 'react';

import Game from '../Game/Game.js';

class GameList extends React.Component {
  handleClick(type) {
    this.props.setGameType(type);
  }

  render() {
    return (
      <div>
        <h3>Choose game type:</h3>
        <div className='game-selector'>
          {
            this.props.gameTypes.map((type, id) => {
              return <Game
                key={ id }
                className={ type }
                setGameType={() => this.handleClick(type)}
              />;
            })
          }
        </div>
      </div>
    );
  }
}

export default GameList;
