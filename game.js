const buttonColours = new Array("red", "blue", "green", "yellow");
const gamePattern = new Array;
const userClickedPatern = new Array;
var gameStarted = false;
var level = 0;

// add keypress to page, to start or restart game
$(document).keypress(function(event){
    if (gameStarted == false){
        gameStarted = true;
        addEvent();
        nextSequence();
    }
});

// sets users input Array to NULL and adds color to game Array,
// add animation, play sound and level up
function nextSequence() {
    userClickedPatern.length = 0;
    var randomnr = (Math.floor(Math.random() * 4));
    var randomChosenColour = buttonColours[randomnr];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);   
    play_sound(randomChosenColour);
    level++;
    $("#level-title").text("level " + level);
};

// add eventlistener, sounds, animation to buttons and check awnsers
function addEvent(){
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPatern.push(userChosenColour);
        play_sound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPatern.length - 1);
    });
}

// compare awnser with the gamepatern if yes: call nextSequence
// else call gameover and restart
function checkAnswer(currentLevel){
    if (userClickedPatern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPatern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameoverScreen();
        restartGame();
    }
};

// play wrong audio, add/remove game-over class to body
// change H1 title
function gameoverScreen(){
    var wrong_audio = new Audio("sounds/wrong.mp3")
    wrong_audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
};

// set everything to NULL to restart
function restartGame(){
    $(".btn").unbind();
    gameStarted = false;
    level = 0;
    gamePattern.length = 0;
};

// add animation by adding/removing class
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
};

// add sound effect
function play_sound(Colour){
    var audio = new Audio("sounds/" + Colour + ".mp3");
    audio.play(); 
};
