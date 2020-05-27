import React from 'react';

const importAll = r => {
  return r.keys().map(r);
}

const zodiacImages = importAll(require.context('../../assets/zodiac/', false, /\.png$/));

class Card extends React.Component {
  handleClick(e, card, gameType) {
    const element = e.target;

    if (gameType === 'colors') {
      element.style.setProperty('--faceup-card-bg', `var(--${card.value})`);
    }

    this.props.onSelect(card);
  }

  render() {
    const card = this.props.data;
    let img;
    let text = card.faceup ? card.value : '';
    if (this.props.className === 'zodiac faceup') {
      text = '';
      const imgSrc = zodiacImages.find(i => i.slice(14, -13) === card.value);
      console.log(this.props.className);
      img = <img className='img' src={ imgSrc } alt={ card.value }/>;
    }

    return (
      <div
        id={card.value}
        className={this.props.className}
        onClick={(e) => this.handleClick(e, card, card.gameType)}
      >
        {text}
        {img}
      </div>
    );
  }
}

export default Card;
