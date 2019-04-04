//require word constructor and inquierer
var Word = require("./word")
var inquirer = require('inquirer');

var main = {
    life: 5,    //life
    wordBank: ["I Don't Know", "Some Random Word", "Jurassic Park"],       // wordbank choose for user to guess
    answer: "",     //used to store the choosen word bank
    answerArr: [],  //turns answer to an array of letters , used to validate win
    answerStr: "",  //answerArr turned into string with " " in between the so matches form of toString in the word constructor. used to validate win
    letterGuessed: [],  //store user guessed letters

    wordRNG: function (arrLength) {
        //used to choose a random word from wordBank
        seed = Math.floor(Math.random() * arrLength);
        return seed
    },

    reset: function () {
        // reset some parameters for the game to allow play again
        main.life = 5;
        main.letterGuessed = [];
        main.answer = main.wordBank[main.wordRNG(main.wordBank.length)];
        main.answerArr = new Word(main.answer);
        main.answerToReveal();
    },

    playAgain: function () {
        //function that has an inquierer prompt asking user if want to play again
        inquirer.prompt([
            {
                name: "playAgain",
                message: "Play Again?",
                type: "confirm",
                default: false
            }
        ]).then(function (answer) {
            if (answer.playAgain) {
                main.reset();
                main.guessALetter();
            } else {
                console.log("Thanks for playing")
            }

        })
    },

    answerToReveal: function () {
        //function that creates the answer in string form that matches the word constructor toString used to validate win
        var wordStr = "";
        for (var i = 0; i < main.answerArr.wordArr.length; i++) {
            wordStr += main.answerArr.wordArr[i].letter + " ";
        }
        main.answerStr = wordStr
    },

    guessALetter: function () {
        //main bulk of the game
        inquirer.prompt([
            {   
                // prompt for an userinput
                name: "userInput",
                message: main.answerArr.arrToString() + "\nGuess a letter?",
                validate: function (value) {
                    // validates user input
                    var pass = value.match(/^[a-z]+$/); // must be lower cased letter

                    if (pass && value.length === 1) {   //must be a single lower cased letter
                        if (main.letterGuessed.includes(value)) {   //make sure user haven't guessed the letter before
                            return "You've guessed " + value+" before. Letters you've guessed: "+main.letterGuessed.join(", ")
                        } else {
                            main.letterGuessed.push(value);
                            return true
                        }

                    } else {
                        return "please enter a single lower cased letter"
                    }
                }       // end user validation
            },

        ]).then(function (answers) {

            if (main.answerArr.userGuess(answers.userInput)) {  //if guessed correct
                console.log("Guessed Correct")
                console.log("\n----------------------")

            } else {    //if guessed incorrect
                main.life--
                console.log("answered wrong")
                console.log("Remaing Guesses: " + main.life)
                console.log("\n----------------------")
            }

            // game state condition check
            if (main.answerArr.arrToString() === main.answerStr) {  //win check and prompt play again if won
                console.log(main.answerArr.arrToString())
                console.log("You Win!")
                main.playAgain();
            } else {
                // loss check
                if (main.life > 0) {
                    //if didn't lose start guess letter again
                    main.guessALetter();
                } else {
                    //else gameover and prompt play again
                    console.log("game over")
                    console.log("\n----------------------")
                    main.playAgain();
                }
            }
        })
    }
}


main.reset();
// console.log(main.answer)
// console.log(main.answerArr.wordArr.length)
// console.log(main.answerArr.wordArr)
// main.playAgain();
main.guessALetter();





// var abase = new Word("Aba 'Se")

// console.log(abase.arrToString());
// console.log(abase.userGuess("s"));
// console.log(abase.userGuess("g"))

// console.log(abase.arrToString());