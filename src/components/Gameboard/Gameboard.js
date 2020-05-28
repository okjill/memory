import React from 'react';

import Card from '../../components/Card/Card';
import WinnerWindow from '../../components/WinnerWindow/WinnerWindow';

import gameData from '../../gameData';

class Gameboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      matches: [],
      selectedCards: [],
      winner: false
    }
  }

  componentDidMount() {
    this.createDeck();
  }

  createDeck() {
    const getRandomValues = () => {
      const randomValues = new Set();
      while (randomValues.size < 12) {
          const min = Math.ceil(0);
          const max = Math.floor(1500);
          const value = Math.floor(Math.random() * (max - min)) + min;
        randomValues.add(value);
      };
      const numbersDeck = [...randomValues];
      return numbersDeck.concat(numbersDeck.slice(0));
    };

    let deckData = gameData[this.props.gameType];

    if (this.props.gameType === 'numbers') {
      deckData = getRandomValues();
    }

    const deck = this.shuffle(deckData);
    this.setState({ deck });
  };
  
  shuffle(deck) {
    let currentIndex = deck.length;
    let tempValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element
      tempValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = tempValue;
    }
    return deck;
  }

  componentDidUpdate(prevProps) {
    // If gameType has changed, reset state
    if (prevProps !== this.props) {
      this.resetGame();
      this.createDeck();
    }
  }

  onSelect(card) {
    const selectedCards = [...this.state.selectedCards];

    if (selectedCards.length !== 2) {
      selectedCards.push(card);
    }
  
    this.setState({ selectedCards }, () => {
      if (this.state.selectedCards.length === 2) {
        this.findMatch();
      }
    });
  }

  findMatch() {
    const newMatch = [];
    // If gameType is 'colors', don't set the 'no - match' class since no transition animation is necessary
    let animationType = this.props.gameType !== 'colors' ? animationType = 'no-match' : '';

    if (this.isMatch()) {
      animationType = 'highlight-match';
      this.state.selectedCards.forEach(card => {
        newMatch.push(card)
      });
    }

    this.setState({ animate: true, animationType }, () => {
      setTimeout(() => {
        const matches = [...this.state.matches].concat(newMatch);
  
        this.setState({ animate: false, animationType: '', matches, selectedCards: [] }, () => {
          if (this.state.matches.length === 24) {
            this.setState({ winner: true });
          }
        });
      }, 500);
    });
  }

  resetGame() {
    this.setState({ deck: [], matches: [], selectedCards: [], winner: false });
  }

  isMatch() {
    return this.state.selectedCards[0].value === this.state.selectedCards[1].value ? true : false;
  }

  render() {
    let cards = [];

    if (this.state.deck) {
      cards = this.state.deck.map((value, id) => {
        let classNames = [this.props.gameType];
        const selectedCards = this.state.selectedCards;
        const isMatch = this.state.matches.find(matches => matches.id === id) ? true : false;
        const isSelected = selectedCards.find(selected => selected.id === id) ? true : false;
        const cardData = { value, id, faceup: false, gameType: this.props.gameType };

        if (isSelected) {
          cardData.faceup = true;
          classNames.push('faceup');
        }
  
        if (isSelected && this.state.animate) {
          classNames.push(this.state.animationType);
        }
  
        return <Card
          key={ id }
          className={isMatch ? 'matched' : classNames.join(' ')}
          data={ cardData }
          onSelect={ this.onSelect.bind(this) }
        />;
      });
    }
  
    const winnerWindow = this.state.winner ? <WinnerWindow resetGame={ this.resetGame.bind(this) } /> : null;

    return (
      <div id='game-wrapper'>
        <div className='game-container' id='game-container'>
          { cards }
          { winnerWindow }
        </div>
      </div>
    );
  }
}

export default Gameboard;
