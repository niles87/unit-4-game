$(document).ready(function () {
    var isPlayerChosen = false;
    var charChoices = {
        bobaFett: {
            health: 140,
            attack: 10,
            counter: 18,
        },
        darthVader: {
            health: 200,
            attack: 11,
            counter: 20,
        },
        kyloRen: {
            health: 150,
            attack: 6,
            counter: 25,
        },
        lukeSkywalker: {
            health: 145,
            attack: 8,
            counter: 17,
        },
        Rey: {
            health: 135,
            attack: 7,
            counter: 15,
        },
        Yoda: {
            health: 130,
            attack: 12,
            counter: 16,
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

    function moveChar(elem) {
        isPlayerChosen = true;
        if (isPlayerChosen === false){
            $(elem).detach().appendTo("#char")
        }
    }

    function moveOppon(elem) {
        if (isPlayerChosen === true){
            $(elem).detach().appendTo("#opponents")
        }
    }

    function selectEnemy() {
        
    }

});