 
function generateCards(){
    let gameTypes = {easy: 12,medium:18, hard:24};
    tempCardList = createCardList(gameTypes.medium);
    
    
}
function createCardList(amount){
    let tempArr = [];
    let i = 1;
    while (tempArr.length <= amount/2){
        tempArr.push(`card${i}`);
        tempArr.push(`card${i}`);
        i++;
    }
    return tempArr;
}
$(document).ready(function () {
    $('.card').bind('click', flipCard)
    const cardList =  ['card1','card1','card2','card2','card3','card3','card4','card4','card5','card5','card6','card6',];

    let pick1;
    let pick2;
    let attempts = 0;
    $('#attempt').text(attempts);

    const allCards = document.getElementsByClassName('card');

    function distributeCards(cardArr){
        let cardShuffle = shuffle(cardArr);
        for (let i = 0; i < allCards.length; i++) {
            $(allCards[i]).addClass(`${cardShuffle[i]}`);
            
        }
    };
    // remove commentout and remove the cardnumbers in the html
    // distributeCards(cardList);
    


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

    // This function checks if both card picks are the same
    function checkCards() {
        attempts += 1;
        $('#attempt').text(attempts);

        if (pick1.attr('class') === pick2.attr('class')) {
            console.log('well done');

            if (gameWon()) {
                console.log('congratulations');
                startAgain();

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
    function startAgain() {
        pick1 = undefined;
        pick2 = undefined;
        for (let i = 0; i < allCards.length; i++) {
            $(allCards[i]).addClass('hidden');
            
        }
        
    }
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

})