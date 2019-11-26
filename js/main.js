
$(document).ready(function () {
    $('.card').bind('click', flipCard)
    let pick1;
    let pick2;
    let attempts = 0;
    const allCards = document.getElementsByClassName('card');


    function flipCard(x) {
        // console.log($(this).attr('id'));
        
        if ((this).classList.contains('hidden')){
            if (pick1 === undefined) {
                $(this).removeClass('hidden');
                pick1 = $(this);
                console.log(`pick 1 is ${pick1.attr('id')}`)
            }
            else if (pick1 != undefined && pick2 === undefined) {
                $(this).removeClass('hidden');
                pick2 = $(this);
                console.log(`pick 2 is ${pick2.attr('id')}`);
                setTimeout(checkCards, 500);
                // checkCards(pick1,pick2);
    
    
            } else if (pick1 != undefined && pick2 != undefined) {
                console.log('naughty naughty');
            }
        }else{
            console.log('this is already flipped');
        }
        

    };

    // This function checks if both card picks are the same
    function checkCards() {
        if (pick1.attr('class') === pick2.attr('class')) {
            console.log('well done');
            attempts += 1;
            
            if (gameWon()){
                console.log('congratulations');

            }else{
                pick1 = undefined;
                pick2 = undefined;
            }
        }
        else {
            console.log('too bad');
            attempts += 1;
            flipBack(pick1, pick2);
            pick1 = undefined;
            pick2 = undefined;
        }

    };
    function flipBack(pick1, pick2) {

        $(pick1).addClass('hidden');
        $(pick2).addClass('hidden');

    };
    function gameWon(){
        let hiddenCards = document.getElementsByClassName('hidden');
        if(hiddenCards.length === 0){
            return true;
        }else{
            return false;
        };
    };

})