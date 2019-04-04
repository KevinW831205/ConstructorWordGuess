// word.js creates words using letter.js 

//requiring the letter constructor
var Letter = require("./letter")

var Word = function (word) {

    this.wordArr = [];      // split the word input into an array of letter object created from the Letter constructor
    var word = word.split("");      //split the string into individual letters
    // pass the individual letters to the constructor and push to wordArr
    for (var i = 0; i < word.length; i++) {
        this.wordArr.push(new Letter(word[i]));
        //omits anything that is not a letter ex: empty spaces and puncuations
        if (!(/^[a-z]+$/.test(word[i]) || /^[A-Z]+$/.test(word[i]))) {
            this.wordArr[i].guessed = true;
        }
    }

    this.arrToString = function () {
        //function that uses the reveal function of Letter to create the line of letters and underscore which the user sees
        var wordStr = "";
        for (var i = 0; i < this.wordArr.length; i++) {
            wordStr += this.wordArr[i].reveal() + " ";
        }
        return wordStr;
    }

    this.userGuess = function (userGuess) {
        //function that takes user input and passes it to the guessing function of Letter on every letter to see if user guessed correct
        var guessedCorrect = false;
        for (var i = 0; i < this.wordArr.length; i++) {
            if (this.wordArr[i].guessing(userGuess)) {
                guessedCorrect = true;
            };
        }
        return guessedCorrect;
    }
}

module.exports = Word;

// var asdf = new Word("As df");

// console.log(asdf.arrToString());
// asdf.userGuess("s")
// console.log(asdf.arrToString());