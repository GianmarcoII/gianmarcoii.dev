$(function(){
    $(".hamburger_menu").click(function(e) {
        $(".menu").toggleClass('open');
        e.preventDefault();
    });

    window.addEventListener('scroll', function(e){
        if(window.scrollY >= 50 || window.screenY >= 50){
            $('.header').css({'background-color': "#101010"})
        }else{
            $('.header').css({'background-color': "transparent"})
        }
    })

})