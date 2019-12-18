var characters;
var gameStats;
var audio = new Audio("assets/sounds/battleground_music.mp3")
var effects = [new Audio("assets/sounds/saberclash1.mp3"), new Audio("assets/sounds/saberclash2.mp3"), new Audio("assets/sounds/saberclash3.mp3")];

// this starts the game
function startGame() {
    characters = resetCharChoices();
    gameStats = gameStatsReset()
    addChars();
    $("#attack").hide()
    $("#reset").hide()
}

// this resets the characters key values
function resetCharChoices() {
    return {
        bobaFett: {
            name: "Boba Fett",
            health: 140,
            attack: 9,
            counter: 18,
            imgURL: "assets/images/boba_fett.jpeg"
        },
        darthVader: {
            name: "Darth Vader",
            health: 155,
            attack: 10,
            counter: 20,
            imgURL: "assets/images/Darth_vader.jpeg"
        },
        kyloRen: {
            name: "Kylo Ren",
            health: 150,
            attack: 13,
            counter: 6,
            imgURL: "assets/images/Kylo_ren.jpeg"
        },
        lukeSkywalker: {
            name: " Luke Skywalker",
            health: 145,
            attack: 8,
            counter: 14,
            imgURL: "assets/images/Luke.jpeg"
        },
        Rey: {
            name: "Rey",
            health: 135,
            attack: 7,
            counter: 16,
            imgURL: "assets/images/rey.jpeg"
        },
        Yoda: {
            name: "Yoda",
            health: 130,
            attack: 12,
            counter: 17,
            imgURL: "assets/images/yoda.jpeg"
        }
    }
}

// creates the possible players 
function createChar(char, key) {
    var charContainer = $("<div class='char' data-name='" + key + "'>")
    var characterName = $("<div class='char-name'>").text(char.name)
    var image = $("<img alt='player' class='char-image'>").attr("src", char.imgURL)
    var hP = $("<div class='char-health'>").text(char.health)
    charContainer.append(characterName).append(image).append(hP)
    return charContainer
}

// adds the players to html doc
function addChars() {
    var keys = Object.keys(characters)
    for (var i = 0; i < keys.length; i++) {
        var charKey = keys[i];
        var char = characters[charKey];
        var charContainer = createChar(char, charKey)
        $(".characters").append(charContainer)
    }
}

// this is to move the possible opponents to opponents div
function createOpponents(charPickedKey) {
    var charKeys = Object.keys(characters)
    for (var j = 0; j < charKeys.length; j++) {
        if (charKeys[j] !== charPickedKey) {
            var opponentKey = charKeys[j]
            var opponent = characters[opponentKey]
            var opponentContainer = createChar(opponent, opponentKey)
            $(opponentContainer).addClass("opponent")
            $("#opponents").append(opponentContainer);
        }
    }
}

// this is to select an enemy to battle
function moveOpponentToEnemy() {
    $(".opponent").on("click", function () {
        var enemy = $(this).attr("data-name")
        gameStats.enemyPicked = characters[enemy]
        $("#enemy").append(this)
        $("#attack").show()
        $("#opponents").hide()
        $(".opponent").off("click")
    })
}

// this is to check a selected players health after attack button is clicked
function playerHealth(character) {
    return character.health <= 0;
}

// this is to check if theres any possible opponents left
function matchesFinished() {
    return gameStats.enemiesRemaining === 0;
}

// this is to check if the current battle is over
function isBattleComplete() {
    if (playerHealth(gameStats.charPicked)) {
        // checks players health
        $("#charSelected").empty();
        $("#reset").show();
        $("#characterAttack").empty()
        $("#opponentCounter").empty()
        setTimeout(function () {
            alert(gameStats.enemyPicked.name + " defeated you! Click the button to play again.");
        }, 150)
        return true;
    } else if (playerHealth(gameStats.enemyPicked)) {
        // removes current enemy if defeated
        gameStats.enemiesRemaining--;
        $("#characterAttack").empty()
        $("#opponentCounter").empty()
        $("#enemy").empty()
        $("#opponents").show();
        if (matchesFinished()) {
            // checks to see if match is won
            setTimeout(function () {
                alert("You Defeated All Enemies! Click Play Again.")
            }, 150)
            $("#reset").show();
        } else {
            // allows new enemy selection
            $("#characterAttack").empty()
            $("#opponentCounter").empty()
            moveOpponentToEnemy();
            setTimeout(function () {
                alert(gameStats.charPicked.name + " defeated " + gameStats.enemyPicked.name + "! Click the button to continue the battles.");
            }, 150)
        }
        return true
    }
    return false
}

// used to reset stats of the game needed for tracking
function gameStatsReset() {
    return {
        charPicked: null,
        enemyPicked: null,
        enemiesRemaining: 0,
        numberOfAttacks: 0
    };
}

// slides the title div to the right
function slideTitle() {
    $(".title").animate({ right: "1%" }, "fast")
}
// plays sounds effects 
function playSounds() {
    var randomEffects = effects[Math.floor(Math.random() * effects.length)]
    randomEffects.play()
}
// empties game board
function emptyGameBoard() {
    $("#characterAttack").empty()
    $("#opponentCounter").empty()
    $(".characters").empty()
    $("#opponents").empty()
    $("#enemy").empty()
    $("#charSelected").empty()
}


$(document).ready(function () {


    $(".characters").on("click", ".char", function () {
        var charPickedKey = $(this).attr("data-name");
        gameStats.charPicked = characters[charPickedKey];
        $("#charSelected").append(this);
        $("#pick").hide()
        createOpponents(charPickedKey);
        $(".characters").hide();
        gameStats.enemiesRemaining = Object.keys(characters).length - 1;
        moveOpponentToEnemy();
        slideTitle()
        audio.play()
    })

    $("#attack").on("click", function () {
        // adds one to number of attacks
        gameStats.numberOfAttacks++
        playSounds()
        // decreases health of opponent
        gameStats.enemyPicked.health -= gameStats.charPicked.attack * gameStats.numberOfAttacks;
        $("#enemy .char-health").text(gameStats.enemyPicked.health)
        $("#characterAttack").text("You attacked " + gameStats.enemyPicked.name + " for " + (gameStats.charPicked.attack * gameStats.numberOfAttacks) + " damage!")
        if (isBattleComplete()) {
            $("#attack").hide()
        } else {
            // decreases health of users player
            gameStats.charPicked.health -= gameStats.enemyPicked.counter;
            $("#charSelected .char-health").text(gameStats.charPicked.health)
            $("#opponentCounter").text(gameStats.enemyPicked.name + " countered " + gameStats.charPicked.name + " for " + gameStats.enemyPicked.counter + " damage!")
            if (isBattleComplete()) {
                $("#attack").hide()
            }
        }
        $("#opponentCounter").show()
    })
    // resets game board
    $("#reset").on("click", function () {
        emptyGameBoard()
        $(".characters").show()
        $("#opponents").show()
        $("#pick").show()
        startGame();
    })

    startGame();
});