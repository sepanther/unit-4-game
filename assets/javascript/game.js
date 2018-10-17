//On document ready
$(document).ready(function() {

//Creating objects for the characters
let jediArray = {
    obi: {
    name: "obi",
    health:520,
    attack:7,
    counter:15
},
    luke: {
    name: "luke",
    health:100,
    attack:8,
    counter:20
},
    count: {
    name: "count",
    health:150,
    attack:6,
    counter:10
},
    darth: {
    name: "darth",
    health:180,
    attack:10,
    counter:25
}}

var gameReset = JSON.parse(JSON.stringify(jediArray));
// console.log(jediArray)
// console.log(gameReset);

var counter = 0
var myChar = ""
var enemy = ""

var restart = $("#restartButton")
restart.hide()

//FUNCTIONS

//Function to reset game
function reset() {
    jediArray = JSON.parse(JSON.stringify(gameReset));
    $(".jedi").appendTo(".charContainer")
    $(".charContainer").appendTo(".charZone");
    counter = 0;
    restart.hide();
    myChar = jediArray[myChar.name]
}

$(".jedi").on("click", function() {

//Adding a counter to manipulate when different actions should or should not be taken on click.
    if (counter === 0) {
        $(this).appendTo(".yourChar");
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
        enemy = jediArray[$(this).val()];
        counter++;
        console.log($(this).attr("class"))
    }
    }

})


$(".defenderArea").on("click", ".defender", function() {
    if (myChar.health > 0) {
    enemy.health = enemy.health - myChar.attack;
    myChar.attack = myChar.attack + origAttack;
    myChar.health = myChar.health - enemy.counter;
    console.log("my health is now " + myChar.health)
    console.log("my attack is now " + myChar.attack)
    console.log("enemy health is " + enemy.health);
    if (enemy.health <= 0) {
        $(this).addClass("defeated");
        $(".defeated").hide();
        $(this).removeClass("defender");
        counter = 1;
        if ($(".charContainer .jedi").length === 0) {
            var youWon = $("div");
            youWon.text("You Won!");
            $("#restart").append(youWon)
        }
    }
}
    if (myChar.health <= 0) {
//Set up this logic. Probably create new button for resetting, and if clicked, trigger reset() function
        console.log("I lost")
        restart.show()
    }
})

$("#restartButton").on("click", function() {
    reset();
})

})

