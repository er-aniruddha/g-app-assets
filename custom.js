
$(document).ready(function() {
	$('.single-slider').owlCarousel({
		loop:true,
		autoplay:false,
		items:1,
		nav:false,
		dots:true,
		
	});
/* Banner Slider */    
	$('.banner-slider').owlCarousel({
		loop:true,
		autoplay:true,
		dots:true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items:1,
	});	
	
/* Product Slider */    
	$('.pro-slider').owlCarousel({
		loop:true,
		autoplay:false,
		dots:false,
		//center:true,
		items:2		
	});	
	
/* Feature Slider */    
	$('.feature-slider').owlCarousel({
		loop:true,
		autoplay:true,
		dots:false,
		//animateIn: 'fadeIn',
		//animateOut: 'fadeOut',
		items:1,
	});	
/* Offer Slider */    
	$('.offer-slider').owlCarousel({
		loop:true,
		autoplay:true,
		dots:false,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items:1,
	});	

	/*$(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        $('.header-info').fadeOut();
     }
    else
     {
      $('.header-info').fadeIn();
     }
 });*/	 
 /* popup */	
 
 $(".select-qty").click(function() {
	  //$(this).next(".drop-downs").slideToggle();
	
    $(this).next(".qty-pop").fadeIn();
	$(".pop-overlay").fadeIn();
});

 $(".pop-overlay").click(function() {
    //$(".show-qty").fadeOut();
	$(".pop-overlay").fadeOut();
	 $(".qty-pop").fadeOut();
});

$(".show-qty li").click(function() {
    $(".qty-pop").fadeOut();
    $(this).addClass("selected");
    $('.pop-overlay').fadeOut();
});
$(".dropdeli li").click(function(){
	$(this).parents('.qty').children('.selectdelimain').children('label').text($(this).children('label').text());
	$(this).parents(".qty-pop").fadeOut();
  	$(this).addClass("selected");
});
/*$(".dropdeli li").click(function(){
    $(this).parent('.qty input').val($(this).children('input').val());
	$(this).parents(".qty-pop").fadeOut();
  	$(this).addClass("selected");
    $('.selectdelimain').children('label').text($(this).children('label').text());
});*/

/*Log in Sign Up pop*/
 $("#register").click(function() {
    $("#log").fadeOut();
	$("#reg").fadeIn();
});
 $("#login").click(function() {
    $("#log").fadeIn();
	$("#reg").fadeOut();
});

/* $(".show-qty li").click(function() {
    $(this).toggleClass('select');	
});*/


    // ===========Right Sidebar============
    $('[data-toggle="offcanvas"]').on('click', function() {
        $('body').toggleClass('toggled');
    });
    // ===========Select2============
    //$('select').select2();
    // ===========Tooltip============
    $('[data-toggle="tooltip"]').tooltip()
	

});