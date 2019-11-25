$(document).ready(function(){
    $('.card').bind('click',flipCard)
    let pick1;
    let pick2;
    let attempts = 0;

    function flipCard(x){
        // console.log($(this).attr('id'));
        if (pick1 === undefined){
            $(this).removeClass('hidden');
            pick1 = $(this);
            console.log(`pick 1 is ${pick1}`)
        }
        else if (pick1 != undefined && pick2 === undefined){
            $(this).removeClass('hidden');
            pick2 = $(this);
            console.log(`pick 2 is ${pick2}`);
            setTimeout(checkCards,500);
            // checkCards(pick1,pick2);


        }else if (pick1 != undefined && pick2 != undefined){
            console.log('naughty naughty');
        }
        
    };
    function checkCards(){
        if (pick1.attr('class') === pick2.attr('class')){
            console.log('well done');
            attempts += 1;
        }
        else{
            console.log('too bad');
            attempts +=1;
            flipBack(pick1,pick2);
        }

    };
    function flipBack(pick1,pick2){
        
        $(pick1).addClass('hidden');
        $(pick2).addClass('hidden');
        pick1 = undefined;
        pick2 = undefined;
    };

})