const getRandomValues = () => {
  const randomValues = new Set();
  while (randomValues.size < 12) {
    const value = Math.ceil(Math.random() * 1000);
    randomValues.add(value);
  };
  return [...randomValues];
};

const colors = ['navy', 'blue', 'fuchsia', 'olive', 'green', 'yellow', 'orange', 'red',
  'purple', 'maroon', 'gray', 'black'];

const games = ['colors', 'zodiac', 'numbers'];

const zodiac = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces'
];

const numbers = getRandomValues();

const gameData = {
  colors: colors.concat(colors.slice(0)),
  games,
  zodiac: zodiac.concat(zodiac.slice(0)),
  numbers: numbers.concat(numbers.slice(0))
};

export default gameData;
