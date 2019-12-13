$(document).ready(function () {
    var isPlayerChosen = false;
    var charChoices = {
        "Boba Fett": {
            "Health Points": 140,
            "Attack Power": 10,
            "Counter Attack Power": 18,
        },
        "Darth Vader": {
            "Health Points": 200,
            "Attack Power": 11,
            "Counter Attack Power": 20,
        },
        "Kylo Ren": {
            "Health Points": 150,
            "Attack Power": 6,
            "Counter Attack Power": 25,
        },
        "Luke Skywalker": {
            "Health Points": 145,
            "Attack Power": 8,
            "Counter Attack Power": 17,
        },
        Rey: {
            "Health Points": 135,
            "Attack Power": 7,
            "Counter Attack Power": 15,
        },
        Yoda: {
            "Health Points": 130,
            "Attack Power": 12,
            "Counter Attack Power": 16,
        }
    }

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

    var moveChar = function(elem) {
        if ( $(elem).parent().attr("class") === "player"){
            $(elem).detach().appendTo("#opponents")
        }
        else {
            $(elem).detach().appendTo("#char")
        }
    }

    var moveOppon = function(elem) {
        if ( $(elem).parent().attr("class") === "player"){
            $(elem).detach().appendTo("#player")
        }
        else {
            $(elem).detach().appendTo("#opponents")
        }
    }

});