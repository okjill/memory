import React from 'react';

const colors = ['navy', 'blue', 'fuchsia', 'olive', 'green', 'yellow', 'orange', 'red',
  'purple', 'maroon', 'gray', 'black'];

const games = ['colors', 'zodiac', 'numbers'];

const zodiac = [
  <div>aries<br /><span role='img' aria-label='zodiac emoji aries' className='zodiac-emoji'>♈</span></div>,
  <div>taurus<br /><span role='img' aria-label='zodiac emoji taurus' className='zodiac-emoji'>♉</span></div>,
  <div>gemini<br /><span role='img' aria-label='zodiac emoji gemini' className='zodiac-emoji'>♊</span></div>,
  <div>cancer<br /><span role='img' aria-label='zodiac emoji cancer' className='zodiac-emoji'>♋</span></div>,
  <div>leo<br /><span role='img' aria-label='zodiac emoji leo' className='zodiac-emoji'>♌️</span></div>,
  <div>virgo<br /><span role='img' aria-label='zodiac emoji virgo' className='zodiac-emoji'>♍️</span></div>,
  <div>libra<br /><span role='img' aria-label='zodiac emoji libra' className='zodiac-emoji'>♎️</span></div>,
  <div>scorpio<br /><span role='img' aria-label='zodiac emoji scorpio' className='zodiac-emoji'>♏️</span></div>,
  <div>sagittarius<br /><span role='img' aria-label='zodiac emoji sagittarius' className='zodiac-emoji'>♐️</span></div>,
  <div>capricorn<br /><span role='img' aria-label='zodiac emoji capricorn' className='zodiac-emoji'>♑️</span></div>,
  <div>aquarius<br /><span role='img' aria-label='zodiac emoji aquarius' className='zodiac-emoji'>♒️</span></div>,
  <div>pisces<br /><span role='img' aria-label='zodiac emoji pisces' className='zodiac-emoji'>♓️</span></div>
];

const gameData = {
  colors: colors.concat(colors.slice(0)),
  games,
  zodiac: zodiac.concat(zodiac.slice(0)),
};

export default gameData;
