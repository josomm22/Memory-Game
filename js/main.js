$(document).ready(function(){
    $('.card').bind('click',flipCard)

    function flipCard(x){
        // console.log($(this).attr('id'));
        $(this).removeClass('hidden');
    }

    
})