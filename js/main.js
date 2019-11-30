let defaultImg = ['./img/ca1.jpg', './img/ca2.jpg', './img/ca3.jpg', './img/ca4.jpg', './img/ca5.jpg', './img/ca6.jpg', './img/ca7.jpg', './img/ca8.jpg', './img/ca9.jpg', './img/ca10.jpg', './img/ca11.jpg', './img/ca12.jpg'];
let pick1;
let pick2;
let attempts = 0;
let difficulty = 'easy';
let hScore = {
    easy:[[59,'hakuna'],[58,'kakuna'],[57,'papi'],[56,'rere'],[55,'rerer'],[54,'yyytt']],
    medium: [[64,'hakuna'],[63,'kakuna'],[62,'papi'],[61,'rere'],[60,'rerer']],
    hard: [[70,'hakuna'],[69,'kakuna'],[68,'papi'],[67,'rere'],[66,'rerer']],
}
$('.modal').hide();
$('.card-container').hide();
$('.start-menu').hide();


showStartMenu();
updateHScore();

function updateHScore(){
    for (let i = 0; i < 7; i++) {
        $(`#place${i}`).text(hScore[difficulty][i]);
        
    }
};


function showStartMenu() {
    $('.start-menu').show();
    attempts = 0;
    $('#attempt').text(attempts);
    $('.diff').on('click', function () {
        difficulty = $(this).attr('id');
        console.log(difficulty);
    });

};

$('#start-btn').on('click', startGame);

function startGame() {
    pick1 = undefined;
    pick2 = undefined;
    attempts = 0;
    $('#attempt').text(attempts);
    $('.start-menu').hide();
    generateCards();
    $('#difficulty').text(difficulty);
    $('.card-container').show();
    $('.card').on('click', flipCard);


};

function generateCards() {
    let gameTypes = { easy: 12, medium: 18, hard: 24 };
    let tempCardList = [];
    tempCardList = createCardList(gameTypes[difficulty]);
    console.log(tempCardList);
    for (let i = 0; i < tempCardList.length; i++) {
        cardOuter = $('<div/>').addClass(`card hidden ${tempCardList[i]}`).attr({ 'id': `card${i}` });
        cardInner = $('<div/>').addClass(`flip-card-inner`);
        cardFront = $('<div/>').addClass(`flip-card-front`);
        cardBack = $('<div/>').addClass(`flip-card-back`);
        imgFront = $('<img />').attr("src", `${defaultImg[tempCardList[i].slice(4)]}`);
        imgBack = $('<img />').attr("src", "./img/backcard.jpg");
        $(cardBack).append(imgBack);
        $(cardFront).append(imgFront);
        $(cardInner).append(cardFront);
        $(cardInner).append(cardBack);
        $(cardOuter).append(cardInner);
        // $card.css("background-image", `url()`
        $('.card-container').append(cardOuter);
    }

}
function createCardList(amount) {
    let tempArr = [];
    let i = 0;
    while (tempArr.length < amount) {
        tempArr.push(`card${i}`);
        tempArr.push(`card${i}`);
        i++;
    }
    // return shuffle(tempArr);
    return tempArr;
    // this code comes from bost.ocks.org
    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }
}

// const cardList = ['card1', 'card1', 'card2', 'card2', 'card3', 'card3', 'card4', 'card4', 'card5', 'card5', 'card6', 'card6',];



// const allCards = document.getElementsByClassName('card');

function flipCard(x) {
    // console.log($(this).attr('id'));

    if ((this).classList.contains('hidden')) {
        if (pick1 === undefined) {
            $(this).removeClass('hidden');
            pick1 = $(this);
            console.log(`pick 1 is ${pick1.attr('id')}`)
        }
        else if (pick1 != undefined && pick2 === undefined) {
            $(this).removeClass('hidden');
            pick2 = $(this);
            console.log(`pick 2 is ${pick2.attr('id')}`);
            setTimeout(checkCards, 1000);


        } else if (pick1 != undefined && pick2 != undefined) {
            console.log('naughty naughty');
        }
    } else {
        console.log('this is already flipped');
    }


};
let highScore = [];
// This function checks if both card picks are the same
function checkCards() {
    attempts += 1;
    $('#attempt').text(attempts);

    if (pick1.attr('class') === pick2.attr('class')) {
        console.log('well done');

        if (gameWon()) {
            congratulator();

        } else {
            pick1 = undefined;
            pick2 = undefined;
        }
    }
    else {
        console.log('too bad');
        flipBack(pick1, pick2);
        pick1 = undefined;
        pick2 = undefined;
    }

};
function flipBack(pick1, pick2) {

    $(pick1).addClass('hidden');
    $(pick2).addClass('hidden');

};
function gameWon() {
    let hiddenCards = document.getElementsByClassName('hidden');
    if (hiddenCards.length === 0) {
        return true;
    } else {
        return false;
    };
};
function congratulator() {
    $('.modal').show();
    confetti.start();
    $('#backToStart').on('click', startMenu);
    $('#replay').on('click', startAgain);
    setTimeout(confetti.stop, 2000);

    function startMenu() {
        $('.modal').hide();
        $('.card').remove();
        showStartMenu();
    }

    function startAgain() {
        $('.modal').hide();
        $('.card').remove();
        startGame()
    }
}



