var word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var UnitedStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas',
                    'California','Colorado','Connecticut','Delaware',
                    'District of Columbia','Federated States of Micronesia',
                    'Florida','Georgia','Guam','Hawaii','Idaho','Illinois',
                    'Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
                    'Marshall Islands','Maryland','Massachusetts','Michigan',
                    'Minnesota','Mississippi','Missouri','Montana','Nebraska',
                    'Nevada','New Hampshire','New Jersey','New Mexico','New York',
                    'North Carolina','North Dakota','Northern Mariana Islands',
                    'Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico',
                    'Rhode Island','South Carolina','South Dakota','Tennessee',
                    'Texas','Utah','Vermont','Virgin Island','Virginia','Washington',
                    'West Virginia','Wisconsin','Wyoming'];


var randomIndex = Math.floor(Math.random()* UnitedStates.length);
var randomWord = UnitedStates[randomIndex];

var computerWord = new word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic(){
    if(requireNewWord){
        var randomIndex = Math.floor(Math.random()* UnitedStates.length);
        var randomWord = UnitedStates[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];

    if (wordComplete.includes(false)){
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from A to Z",
                name: "userinput"
            }
        ]).then(function(input){
            if(
                !letterArray.includes(input.userinput) ||
                input.userinput.length > 1
            ) {
                console.log("\nPlease try again!\n");
                theLogic();
            }else {
                if(
                    incorrectLetters.includes(input.userinput) || 
                    correctLetters.includes(input.userinput) || 
                    input.userinput === ""
                ) {
                    console.log("\n Already Guessed or Nothing was entered \n")
                    theLogic();
                }else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.objArray.forEach(wordCheck);
                    if(wordCheckArray.join("") === wordComplete.join("")){
                        console.log("\nIncorrecr|n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft--;
                    }else{
                        console.log("\nCorrect|n");

                        correctLetters.push(input.userinput);
                    }
                    computerWord();

                    console.log("Guesses left: " + guessesLeft + "\n");

                    console.log("letters Guessed: " + incorrectLetters.join(" ") + "\n")

                    if(guessesLeft > 0){
                        theLogic();
                    }else{
                        console.log("you Have lost!\n");
                    }
                    function wordCheck(key){
                        wordCheckArray.poush(key.guessed);
                    }
                }
            }
        });
    }else{
        console.log("You Win!\n");
    }
    function wordCheck(key){
        wordCheckArray.poush(key.guessed);
    }
}
function restartGame(){
    inquirer.prompt([
        {
            type: "list",
            choices: "would you like to:",
            choices: ["play Again", "exit"],
            name: "restart"
        }
    ]).then(function(input){
        if(input.restart === "play Again"){
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            theLogic();
        } else{
            return;
        }
    });
}
theLogic();