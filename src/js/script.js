
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

function setMenuBackgroundColor() {
  var sections = [
    {
      name: 'about',
      color: '#D7263D'
    },
    {
      name: 'fehandbags',
      color: '#F46036'
    },
    {
      name: 'eldorado',
      color: '#1B998B'
    },
    {
      name: 'manik',
      color: '#C5D86D'
    },
    {
      name: 'below',
      color: '#2E294E'
    }
  ]

  var height = $(window).scrollTop();

  sections.map(function(section) {
    if ( height >= $(`#${section.name}-section`).position().top) {
      $('.menu--btn').css('background-color', section.color )
    }

    if ( height + 500 >= $(`.${section.name}-content`).position().top) {
      $(`.${section.name}-text p,
        .${section.name}-text h6,
        .${section.name}-text h2,
        .${section.name}-text a,
        .${section.name}-text img`,
      ).removeClass('invisible').addClass('fadeInUpBig')
    }
  })
}
$(document).ready(function(){
  setMenuBackgroundColor()
	$('.menu--btn').on('click', nav);
	$('.menu-item').on('click', function() {
    nav()
    $('html,body')
      .animate(
        { scrollTop: $(`#${$(this).attr('id')}-section`).offset().top },
        'slow'
      );
  });

  $(window).scroll(function() {
    setMenuBackgroundColor()
  });
});
