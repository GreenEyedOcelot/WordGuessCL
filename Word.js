var Letter = require('./Letter');


function Word (newWord) {
   this.letters = [];
   this.init(newWord);
   this.getWord();

}

Word.prototype.init = function (newWord) {
   var ltr;
   // console.log("the newWord is ", newWord);
   for (ltr of newWord) {
      this.letters.push(new Letter(ltr));
   }
}



Word.prototype.getWord = function() {
   return this.letters.map((letterObject) => letterObject.getLetter()).join(" ");
}


Word.prototype.guess = function (letterGuess) {
   var nLetters = this.letters.length;
   var i;
   var found = false;

   for (i = 0; i < nLetters ; i++) {
      if (this.letters[i].guess(letterGuess)) {
         found = true;
      }
   }

   return found;
}

Word.prototype.display = function() {
   var thisWord = this.getWord();
   console.log(thisWord);
}

module.exports = Word;
