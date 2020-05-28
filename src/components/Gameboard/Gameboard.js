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

  componentDidMount = () => {
    this.createDeck();
  }

  createDeck = () => {
    const { props: { gameType } } = this;
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

    let deckData = gameData[gameType];

    if (gameType === 'numbers') {
      deckData = getRandomValues();
    }

    const deck = this.shuffle(deckData);
    this.setState({ deck });
  };
  
  shuffle = deck => {
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

  componentDidUpdate = prevProps => {
    // If gameType has changed, reset state
    if (prevProps !== this.props) {
      this.resetGame();
      this.createDeck();
    }
  }

  onSelect = card => {
    const selectedCards = [...this.state.selectedCards];

    if (selectedCards.length !== 2) {
      selectedCards.push(card);
    }
  
    this.setState({ selectedCards }, () => {
      if (this.state.selectedCards.length === 2) {
        this.setAnimationType();
      }
    });
  }

  handleMatchAnimation = (animationType, selectedCards) => {
    this.setState({ animate: true, animationType }, () => {
      setTimeout(this.flipCardDown, 1000);
      if (this.isMatch()) setTimeout(() => this.saveMatch(selectedCards), 1000);
    });
  }

  flipCardDown = () => {
    this.setState({
      animate: false,
      animationType: '',
      selectedCards: []
    });
  }

  saveMatch = newMatch => {
    const { state: { matches } } = this;
    const allMatches = matches
      .concat(newMatch
      .map(card => card));

    if (allMatches.length === 24) {
      this.setState({ winner: true });
    }

    this.setState({ matches: allMatches });
  }

  setAnimationType = () => {
    let animationType;
    
    // If gameType is 'colors', no transition animation is necessary
    if (this.props.gameType === 'numbers') {
      animationType = 'no-match';
    } else if (this.props.gameType === 'zodiac') {
      animationType = 'no-match-zodiac';
    }

    if (this.isMatch()) {
      animationType = 'highlight-match';
    }

    this.handleMatchAnimation(animationType, this.state.selectedCards);
  }

  resetGame = () => {
    this.setState({
      deck: [],
      matches: [],
      selectedCards: [],
      winner: false
    });
  }

  isMatch = () => {
    const { state: { selectedCards } } = this;
    return selectedCards[0].value === selectedCards[1].value ? true : false;
  }

  render = () => {
    let cards = [];
    const {
      props: { gameType },
      state: { animate, animationType, deck, matches, selectedCards, winner }
		} = this;

    if (deck) {
      cards = deck.map((value, id) => {
        let classNames = [gameType];
        const isMatch = matches.find(matches => matches.id === id) ? true : false;
        const isSelected = selectedCards.find(selected => selected.id === id) ? true : false;
        const cardData = { value, id, faceup: false, gameType };

        if (isSelected) {
          cardData.faceup = true;
          classNames.push('faceup');
        }
  
        if (isSelected && animate) {
          classNames.push(animationType);
        }
  
        return <Card
          className={ isMatch ? 'matched' : classNames.join(' ') }
          data={ cardData }
          key={ id }
          onSelect={ this.onSelect.bind(this) }
        />;
      });
    }
  
    const winnerWindow = winner ? <WinnerWindow resetGame={ this.resetGame.bind(this) } /> : null;

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
