

function Letter(ltr) {
   this.letter = ltr;
   this.guessed = false;
}

Letter.placeholder = "_"; // this is a prototype class variable because it is the same for all letters

Letter.prototype.getLetter = function() { // this is prototoype class method because it is the same for all instances
   return (this.guessed) ? this.letter : Letter.placeholder;
}

Letter.prototype.guess = function(guessedLetter) {
   if (guessedLetter.toLowerCase() === this.letter.toLowerCase()) {
      this.guessed = true;
      return true;
   } else { // else clause not strictly needed, but increases readability, I think
      return false;
   }
}

module.exports = Letter;





