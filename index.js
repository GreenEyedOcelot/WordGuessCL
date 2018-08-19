var Word = require('./Word.js');
var Letter = require('./Letter.js');
var inquirer = require('inquirer');
var prompt = require('prompt');
prompt.colors = false;
prompt.delimiter = "";
prompt.message = "";



var game = {
   wordList: ["aardvark", "alligator", "alpaca", "anteater", "armadillo", "baboon", "badger", "beaver", "bobcat", "butterfly",
      "cardinal", "cheetah", "chimpanzee", "chicken", "crocodile", "dolphin", "ferret", "gazelle", "giraffe", "gorilla",
      "hippopotamus", "hummingbird", "jaguar", "jellyfish", "leopard", "lizard", "llama", "meercat", "mongoose", "orangutan",
      "puffin", "raccoon", "reindeer", "rhinoceros", "salamander", "serval", "squirrel", "tortoise", "turkey", "turtle"
   ],
   guessesLeft: 10,
   availableLetters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
   answerWord: null,
   targetWord: null,
   targetWordSize: null,

   display: function (str) {
      console.log(str);
   },

   setWord: function () {
      var nWords = this.wordList.length;
      this.answerWord = this.wordList[Math.floor(Math.random() * nWords)];
      this.targetWordSize = this.answerWord.length;
      this.targetWord = new Word(this.answerWord);
      return this.targetWord;
   },

   startGame: function () {
      var thisGame = this;
      inquirer
         .prompt([{
            type: 'list',
            name: 'confirmPlay',
            choices: ['Yes', 'No'],
            message: 'Hello there. Would you like to play an animal Word Guess game now?',
         }]).then(response => {
            if (response.confirmPlay === "Yes") {
               thisGame.setWord();
               thisGame.targetWord.display();
               thisGame.promptGuess();
            } else {
               thisGame.display('\nThat\'s cool. I didn\'t want to play now either.\n');
            }

         }).catch((error) => {
            console.log('got error', error);
         });





   },


   replayGame: function (msg) {
      var thisGame = this;
      thisGame.targetWord = null;
      thisGame.answerWord = null;
      thisGame.targetWordSize = null;
      thisGame.guessesLeft = 10;
      thisGame.availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

      inquirer
         .prompt([{
            type: 'list',
            name: 'confirmPlay',
            choices: ['Yes', 'No'],
            message: msg + '\n' + 'Would you like to play again?',
         }]).then(response => {
            if (response.confirmPlay === "Yes") {
               thisGame.setWord();
               thisGame.targetWord.display();
               thisGame.promptGuess();
            } else {
               thisGame.display('\nOkay, thanks for playing.\n');


            }
         })
   },

   promptGuess: function () {

      var thisGame = this;
      var guesses = thisGame.guessesLeft;
      var wordSize = thisGame.targetWordSize;
      var guessedLetter, letterFound, currWord;
      var promptUser = function () {
         return 'Please choose a single letter from this list: ' + thisGame.availableLetters.join(' ');
      };

      thisGame.display('\nYou have ' + guesses + ' guesses left.');
      thisGame.display(promptUser());

      prompt.get([{
         name: 'guess',
         warning: promptUser(),
         empty: false,
         conform: function (val) {
            return (thisGame.availableLetters.indexOf(val) !== -1);
         }
      }], function (err, result) {
         if (err) {
            console.log("there is an error in promptGuess, it is...", err);
         }
         var guessedLetter = result.guess;
         thisGame.availableLetters = thisGame.availableLetters.filter((item) => item !== guessedLetter);
         letterFound = thisGame.targetWord.guess(guessedLetter);
         currWord = thisGame.targetWord.getWord();
         thisGame.display("\nHere is what the " + thisGame.targetWordSize + " letter target word looks like now: " + currWord);
         if (!letterFound) {
            thisGame.guessesLeft--;
         }
         if (thisGame.isWon(currWord)) {
            thisGame.display('\n');
            thisGame.replayGame('Congratulations, you won the game!');
         } else if (thisGame.isLost()) {
            thisGame.display('\n');
            thisGame.replayGame('You have lost the game. The secret word was ' + thisGame.answerWord + '.');
         } else {
            thisGame.promptGuess();
         }



      })


   },


   isLost: function () {
      return this.guessesLeft < 1;
   },

   isWon: function (theWord) {
      var thisGame = this;

      return (theWord.indexOf("_") === -1);



   }






}














game.startGame();