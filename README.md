# Memory!

## Rules 
* At the start of the game, the user is presented with a grid of 24 facedown cards. 
* Each card looks identical face down, but has a face-up value that is matched by only one other card on the table. 
* When the user clicks a card, it flips over revealing its value. 
* When the user clicks the next card, its value is revealed and then compared against the other face-up card. 
  * If they are equal, both cards disappear.
  * If they are different, they flip back down. 
* The game is continued until there are no cards left.


## Assumptions
* Designed for a single player.
* No need to store user data or game results.
* Player will not use dev tools to cheat.
* No time limit or max number of tries to win the game.


## Design rationale
**Animations**
I used CSS animations to visually indicate a match/no match. Setting a duration for the animation meant striking the right balance between too long a delay (the app seeming slow) and too short (not enough time to process the card values). WCAG doesn't specify a standard duration, so I used Material Design <sup>1</sup> for guidance.

**Colors**
I chose high-contrast A11Y-compliant color combos<sup>2</sup> to create an accessible theme.

**Game categories**
As I started developing, my very first thought was to create a simple color-matching game. Then I realized that was probably no good for people with color blindness or other vision impairments. So I decided to offer a few additional game styles using random numbers<sup>3</sup> and zodiac signs. ♓️

## Notes
* Built with React.
* I used [this algorithm](https://stackoverflow.com/a/2450976)<sup>4</sup> to shuffle the card deck. No sense in recreating the wheel!
* I'm still working on adding tests.
* I'm also working on reorganizing the CSS, creating individual component stylesheets instead of keeping all styles in one giant, hard-to-navigate file.


## Potential add-ons
* Add multi-player functionality.
* Add game categories.
* Set game limitations like a timer or max number of tries.
* Cheat-proof the card values!


## Resources
1. https://material.io/design/motion/speed.html#duration
2. https://clrs.cc/a11y/
3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
4. https://stackoverflow.com/a/2450976 
5. Too many searches on [CSS Stack Overflow](https://stackoverflow.com/questions/tagged/css) and [CSS-Tricks](https://css-tricks.com/) to count!
