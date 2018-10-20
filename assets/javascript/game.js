//On document ready
$(document).ready(function() {

//Creating objects for the characters
let jediArray = {
    obi: {
    name: "Obi-Wan Kenobi",
    health:140,
    attack:7,
    counter:13
},
    luke: {
    name: "Luke Skywalker",
    health:120,
    attack:8,
    counter:15
},
    count: {
    name: "Count Dooku",
    health:140,
    attack:6,
    counter:10
},
    darth: {
    name: "Darth Vader",
    health:160,
    attack:10,
    counter:25
}}

var gameReset = JSON.parse(JSON.stringify(jediArray));

var counter = 0
var myChar = ""
var enemy = ""

var restart = $("#restartButton")
restart.hide()

//Autoplay audio
// var source = "assets/audio/force.mp3"
// var audio = document.createElement("audio");
// //
// audio.autoplay = true;
// //
// audio.load()
// audio.addEventListener("load", function() { 
//     audio.play(); 
// }, true);
// audio.src = source;

//FUNCTIONS

//Function to reset game
function reset() {
    jediArray = JSON.parse(JSON.stringify(gameReset));
    $(".jedi").removeClass("me defender defeated");
    $(".jedi").show();
    $(".jedi").appendTo(".charContainer");
    $(".charContainer").appendTo(".charZone");
    $("#myAttack, #enemyAttack, #enemyDefeated").empty();
    counter = 0;
    restart.hide();
    enemy = ""
    freshButtons();
}

function updateHealth() {
    $(".me").find(".health").text(myChar.health);
    $(".defender").find(".health").text(enemy.health);
}

function updateWords() {
    $("#myAttack").text("You attacked " + enemy.name + " for " + myChar.attack + " damage!");
    $("#enemyAttack").text(enemy.name + " attacked you for " + enemy.counter + " damage!");
}

//Function to clean up buttons
function freshButtons() {
    $(".jedi").each(function () {
        var charName = $(this).val()
        $(this).find(".health").text((jediArray[charName]).health)
    })
}

//ACTUAL CODE
freshButtons();

$(".jedi").on("click", function() {

//Adding a counter to manipulate when different actions should or should not be taken on click.
    if (counter === 0) {
        $(this).appendTo(".yourChar");
        $(this).addClass("me");
        myChar = jediArray[$(this).val()];
        origAttack = myChar.attack;
        $(".charContainer").appendTo(".enemies");
        counter++;
    }
    else  if (counter === 1) {
        if (myChar == jediArray[$(this).val()]) {
            alert("This is your character! Pick an enemy.")
        }
        else {
            $(this).appendTo(".defenderArea");
            $(this).addClass("defender");
            console.log(jediArray);
            console.log(gameReset);
            enemy = jediArray[$(this).val()];
            counter++;
            $("#myAttack, #enemyAttack, #enemyDefeated").empty();
            console.log($(this).attr("class"))
    }
    }

})

$("#attack").on("click", function() {

    if (myChar.health > 0) {
    enemy.health = enemy.health - myChar.attack;
    if (enemy.health > 0) {
        myChar.health = myChar.health - enemy.counter;
    }
    updateHealth();
    updateWords();
    myChar.attack = myChar.attack + origAttack;
    if (enemy.health <= 0) {
        $(".defender").addClass("defeated");
        $(".defeated").hide();
        $(".defender").removeClass("defender");
        $("#myAttack, #enemyAttack").empty();
        $("#enemyDefeated").text(enemy.name + " was defeated! Choose another opponent!")
        counter = 1;
        if ($(".charContainer .jedi").length === 0) {
            $("#enemyDefeated").text("You Won!");
            restart.show()
        }
    }
    if (enemy.health > 0 && myChar.health <= 0) {
        //Show restart button that resets game once clicked
                myChar.health=0;
                updateHealth();
                $("#myAttack, #enemyAttack, #enemyDefeated").empty();
                $("#enemyDefeated").text("You lost! Better luck next time.")
                restart.show()
            }
    }  
})

// $(".defenderArea").on("click", ".defender", function() {
//     if (myChar.health > 0) {
//     enemy.health = enemy.health - myChar.attack;
//     myChar.attack = myChar.attack + origAttack;
//     myChar.health = myChar.health - enemy.counter;
//     console.log("my health is now " + myChar.health)
//     console.log("my attack is now " + myChar.attack)
//     console.log("enemy health is " + enemy.health);
//     console.log(myChar);
//     updateHealth();
//     updateWords();
//     if (enemy.health <= 0) {
//         $(this).addClass("defeated");
//         $(".defeated").hide();
//         $(this).removeClass("defender");
//         counter = 1;
//         if ($(".charContainer .jedi").length === 0) {
//             $("#myAttack, #enemyAttack").empty();
//             $("#enemyDefeated").text("You Won!");
//             restart.show()
//         }
//     }
//     if (enemy.health > 0 && myChar.health <= 0) {
//         //Show restart button that resets game once clicked
//                 console.log("I lost")
//                 $("#myAttack, #enemyAttack, #enemyDefeated").empty();
//                 $("#enemyDefeated").text("You lost! Better luck next time.")
//                 restart.show()
//             }
//     }  
// })

$("#restartButton").on("click", function() {
    reset();
})

})

