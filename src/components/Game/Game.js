import React from 'react';

class Game extends React.Component {
  handleClick(type) {
    this.props.setGameType(type);
  }

  render() {
    const type = this.props.className;
    return (
      <button
        className={ `game-selector ${type} circle` }
        onClick={() => this.handleClick(type)}
      >
        <span>{type}</span>
      </button>
    );
  }
}

export default Game;
