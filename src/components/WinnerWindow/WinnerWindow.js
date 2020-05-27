import React from 'react';

class WinnerWindow extends React.Component {
  handleClick() {
    this.props.resetGame();
  }

  render() {
    return (
      <div id='overlay'>
        <div id="winnerBanner">
          <h1>You win!</h1>
          <button onClick={ () => this.handleClick() }>Play again?</button>
          </div>
      </div>
    );
  }
}

export default WinnerWindow;
