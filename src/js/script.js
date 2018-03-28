function openNav() {
  $('#myNav').css( 'height', '100%' )

  $('.menu-content--item').removeClass('zoomOutLeft')
  $('.menu-content--item').addClass('fadeInLeftBig')
}

function closeNav() {
  $('.menu-content--item').removeClass('fadeInLeftBig')
  $('.menu-content--item').addClass('zoomOutLeft')

  setTimeout(function(){
    $('#myNav').css( 'height', '0%' )
  }, 500);
}

function nav() {
  $('.menu--btn').toggleClass('open');

  if($('.menu--btn').hasClass('open')) {
    openNav()
  }else{
    closeNav()
  }
}

$(document).ready(function(){
	$('.menu--btn').on('click', nav);
	$('.menu-item').on('click', function() {
    nav()
    $('html,body')
      .animate(
        { scrollTop: $(`#${$(this).attr('id')}-section`).offset().top },
        'slow'
      );
  });
});
