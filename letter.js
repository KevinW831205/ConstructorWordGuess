// creates letters from the word game

var Letter = function (letter) {
    this.letter = letter;   //stores letter to be created
    this.guessed = false;   //if the letter has been guessed

    this.reveal = function () {
        //function that returns the letter if guessed and an underscore if not
        if (this.guessed) {
            return this.letter;
        } else {
            return "_"
        }
    }

    this.guessing = function (guessing) {
        //takes user input of guessing and compares to the letter if match change guessed to true, and returns a true value.
        if (guessing.toLowerCase() == this.letter.toLowerCase()) {
            this.guessed = true;
            return true;
        }
    }
}

// var A = new Letter("A")

// A.guessing("a")
// console.log(A.reveal());


module.exports = Letter;




