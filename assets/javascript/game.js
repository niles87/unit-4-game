var char
var isPlayerChosen = false;
function startGame() {
    char = resetCharChoices();
    addChars();
}
var resetCharChoices = function () {
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
            attack: 6,
            counter: 25,
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


function createChar(char, key) {
    var charContainer = $("<div class='char' data-name='" + key + "'>")
    var characterName = $("<div class='char-name'>").text(char.name)
    var image = $("<img alt='player' class='char-image'>").attr("src", char.imgURL)
    var hP = $("<div class'char-health'>").text(char.health)
    charContainer.append(characterName).append(image).append(hP)
    return charContainer
}
function addChars() {
    var keys = Object.keys(char)
    for (var j = 0; j < keys.length; j++)
    var charKey = keys[j];
    var char = char[charKey];
    var charContainer = createChar(char, charKey)
    $(".characters").append(charContainer)
}
function moveChar(elem) {
    isPlayerChosen = true;
    if (isPlayerChosen === false) {
        $(elem).detach().appendTo("#char")
    }
}

function moveOppon(elem) {
    if (isPlayerChosen === true) {
        $(elem).detach().appendTo("#opponents")
    }
}



$(document).ready(function () {

    $(".player").on("click", function () {
        console.log($(this).attr("id"))
        if ($(this).attr("id") === "bobaFett") {
            console.log("char moved")
            moveChar("#bobaFett");
            moveOppon("#darthVader, #kyloRen, #luke, #rey, #yoda")
        }
        else if ($(this).attr("id") === "darthVader") {
            console.log("vader selected")
            moveChar("#darthVader")
            moveOppon("#bobaFett, #kyloRen, #luke, #rey, #yoda")
        }
        else if ($(this).attr("id") === "kyloRen") {
            console.log("kylo selected")
            moveChar("#kyloRen")
            moveOppon("#darthVader, #bobaFett, #luke, #rey, #yoda")
        }
        else if ($(this).attr("id") === "luke") {
            console.log("luke selected")
            moveChar("#luke")
            moveOppon("#darthVader, #kyloRen, #bobaFett, #rey, #yoda")
        }
        else if ($(this).attr("id") === "rey") {
            console.log("rey selected")
            moveChar("#rey")
            moveOppon("#darthVader, #kyloRen, #luke, #bobaFett, #yoda")
        }
        else if ($(this).attr("id") === "yoda") {
            console.log("yoda selected")
            moveChar("#yoda")
            moveOppon("#darthVader, #kyloRen, #luke, #rey, #bobaFett")
        }
    });
    startGame()
});