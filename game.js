//Defining Basic Variables
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//Creating a New Pattern
function nextSequence() {
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    for (let i=0; i<gamePattern.length; i++) {
        gameAnimationSound(i, gamePattern);
    }

    level += 1;
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
}


//Animation Function
function gameAnimationSound(i, pattern) {
    setTimeout(function() {

        $("#" + pattern[i]).fadeOut(50).fadeIn(50);

        playSound(pattern[i]);

    }, (1000 * i));
}


//Play Correct Sound
function playSound(currentColor) {

    switch(currentColor) {
        case "green":
            new Audio("sounds/green.mp3").play();
            break;
        case "blue":
            new Audio("sounds/blue.mp3").play();
            break;
        case "red":
            new Audio("sounds/red.mp3").play();
            break;
        case "yellow":
            new Audio("sounds/yellow.mp3").play();
            break;
    }
}


//Animation Function
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

//Check Which Button is Pressed
$(".btn").click(function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//Call Next Sequence Upon Key Down
$(document).on("keydown", function() {
    if (started === false) {
        started = true;
        nextSequence();
    }
});

//Check Answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}


//Reset Game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


