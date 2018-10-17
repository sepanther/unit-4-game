//On document ready
$(document).ready(function() {

//Creating objects for the characters
let jediArray = {
    obi: {health:120,
    attack:7,
    counter:15
},
    luke: {
    health:100,
    attack:8,
    counter:20
},
    count: {
    health:150,
    attack:6,
    counter:10
},
    darth: {
    health:180,
    attack:10,
    counter:25
}}

var gameReset = JSON.parse(JSON.stringify(jediArray));
delete gameReset.obi;
console.log(jediArray)
console.log(gameReset);

var counter = 0
var myChar = ""
var enemy = ""

//FUNCTIONS

//Function to reset game
function reset() {
    jediArray = JSON.parse(JSON.stringify(gameReset));
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
    else  if (counter===1) {
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
    }
    if (myChar.health <= 0) {
        reset();
    }
})

})

