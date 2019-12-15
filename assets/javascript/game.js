var characters;
var gameStats;

// this starts the game
function startGame() {
    console.log(resetCharChoices)
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
            attack: 10,
            counter: 18,
            imgURL: "assets/images/boba_fett.jpeg"
        },
        darthVader: {
            name: "Darth Vader",
            health: 200,
            attack: 11,
            counter: 20,
            imgURL: "assets/images/Darth_vader.jpeg"
        },
        kyloRen: {
            name: "Kylo Ren",
            health: 150,
            attack: 13,
            counter: 5,
            imgURL: "assets/images/Kylo_ren.jpeg"
        },
        lukeSkywalker: {
            name: " Luke Skywalker",
            health: 145,
            attack: 8,
            counter: 17,
            imgURL: "assets/images/Luke.jpeg"
        },
        Rey: {
            name: "Rey",
            health: 135,
            attack: 7,
            counter: 15,
            imgURL: "assets/images/rey.jpeg"
        },
        Yoda: {
            name: "Yoda",
            health: 130,
            attack: 12,
            counter: 16,
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
    console.log(characters)
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
    $(".opponent").on("click.opponentSelect", function () {
        var enemy = $(this).attr("data-name")
        gameStats.enemyPicked = characters[enemy]
        $("#enemy").append(this)
        $("#attack").show()
        $("#opponents").hide()
        $(".opponent").off()
    })
}

// this is to check a selected players health after attack button is clicked
function playerHealth(characters) {
    console.log("checking health")
    return characters.health <= 0;
}

// this is to check if theres any possible opponents left
function matchesFinished() {
    console.log("looking for enemies remaining")
    return gameStats.enemiesRemaining === 0;
}

// this is to check if the current battle is over
function isBattleComplete() {
    if (playerHealth(gameStats.selecedCharacter)) {
        console.log("you lost");
        $("#charSelected").empty();
        $("#reset").show();
    } else if (playerHealth(gameStats.enemyPicked)) {
        console.log("you defeated " + gameStats.enemyPicked);
        gameStats.enemiesRemaining--;
        console.log(gameStats.enemiesRemaining)
        $("#enemy").empty()
        if (matchesFinished()) {
            console.log("you win")
            $("#reset").show();
        } else {
            moveOpponentToEnemy();
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

// 
$(document).ready(function () {
    
    $(".characters").on("click", ".char", function() {
        var charPickedKey = $(this).attr("data-name");
        gameStats.charPicked = characters[charPickedKey];
        $("#charSelected").append(this);
        createOpponents(charPickedKey);
        $(".characters").hide();
        gameStats.enemiesRemaining = Object.keys(characters).length - 1;
        moveOpponentToEnemy();
    })
    
    $("#attack").on("click", function () {
        gameStats.numberOfAttacks++
        console.log(gameStats.numberOfAttacks)
        gameStats.enemyPicked.health -= gameStats.charPicked.attack * gameStats.numberOfAttacks;
        $("#enemy .char-health").text(gameStats.enemyPicked.health)
        console.log(gameStats.enemyPicked.health)
        // if (isBattleComplete()){
        //     $("#attack").hide()
        // } else {
            gameStats.charPicked.health -= gameStats.enemyPicked.counter;
        $("#charSelected .char-health").text(gameStats.charPicked.health)
        console.log(gameStats.charPicked.health)
        // }
    })

    startGame();
});