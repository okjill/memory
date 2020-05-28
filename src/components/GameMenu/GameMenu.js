import React from 'react';

import GameMenuItem from '../GameMenuItem/GameMenuItem.js';

class GameMenu extends React.Component {
  handleClick = type => {
    this.props.setGameType(type);
  }

  render = () => {
    return (
      <ul className='banner-list'>
        {
          this.props.gameTypes.map((type, id) => {
            return <GameMenuItem
              key={ id }
              className={ type }
              setGameType={() => this.handleClick(type)}
            />;
          })
        }
      </ul>
    );
  }
}

export default GameMenu;
