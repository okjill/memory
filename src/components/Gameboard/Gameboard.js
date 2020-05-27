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
    const deckData = gameData[this.props.gameType];
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
    // if gameType has changed, reset state
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
    let animationType;
    const newMatch = [];
    if (this.props.gameType === 'numbers') {
      animationType = 'no-match';
    } else {
      animationType = 'no-match-color';
    }

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
      }, 1000);
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
        const isMatch = this.state.matches.find(matches => matches.id === id) ? true : false;
        let classNames = [this.props.gameType];
        const cardData = { value, id, faceup: false, gameType: this.props.gameType };
        const selectedCards = this.state.selectedCards;
        const isSelected = selectedCards.find(selected => selected.id === id) ? true : false;
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
  
    const winnerWindow = this.state.winner ? <WinnerWindow resetGame={ this.resetGame.bind(this) }/> : null;

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
