// At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
let buttonColours = ["red", "blue", "green", "yellow"];

// At the top of the game.js file, create a new empty array called gamePattern.
let gamePattern = [];

//At the top of the game.js file, create a new empty array with the name userClickedPattern.
let userClickedPattern = [];

//create variabel started to wrapping false before game start
var started = false;

//create new variabel to start level from 0
var level = 0;

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click( function() {
    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour); 

    // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); // Call checkAnswer() after a user has clicked and chosen their answer and put as the last index

});

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
  if(!started){

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence(); //function berjalan 
    started=true; // change condition to true
  }
});

function startOver(){ //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  started = false;
  gamePattern = [];
}

// Inside game.js create a new function called nextSequence()
function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // adding level 
  level++;

  //update everytime level
  $("#level-title").text("Level " + level);

  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  let randomNumber = Math.floor(Math.random() * 4);

  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  let randomChosenColour = buttonColours[randomNumber];

  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 

  // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

}

// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

    // Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
 }

 function animatePress(currentColour){ //Create a new function called animatePress(), it should take a single input parameter called currentColour.
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() { //remove the pressed class after a 100 milliseconds.
    $("#" + currentColour).removeClass("pressed");
  }, 100);
 }

 //Create a new function called checkAnswer(), it should take one input with the name currentLevel
 function checkAnswer(currentLevel){
  //Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    //If the user got the most recent answer right in step if, then check that they have finished their sequence with another if statement.
    if(userClickedPattern.length === gamePattern.length){
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");// In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200); 

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
 }