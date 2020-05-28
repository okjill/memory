import React from 'react';

class Card extends React.Component {
  handleClick = (e, card, gameType) => {
    const element = e.target;

    if (gameType === 'colors') {
      element.style.setProperty('--faceup-card-bg', `var(--${card.value})`);
    }

    this.props.onSelect(card);
  }

  render = () => {
    const card = this.props.data;
    let text = card.faceup ? card.value : '';
    let className = this.props.className;
  
    if (this.props.className === 'zodiac faceup') {
      className += ' zodiac-card';
    }

    return (
      <div
        id={card.value}
        className={className}
        onClick={(e) => this.handleClick(e, card, card.gameType)}
      >
        {text}
      </div>
    );
  }
}

export default Card;
