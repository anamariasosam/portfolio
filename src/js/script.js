// element declarations
const $menuItem = $('.menu-content--item')
const $nav = $('#myNav')
const $menuBtn = $('.menu--btn')
const $window = $(window)
const $body = $('body')

function openNav() {
  $menuBtn.addClass('open')

  $body.removeClass('closeNav').addClass('openNav')

  $nav.css( 'height', '100%' )
  $menuItem.removeClass('slideOutLeft')
  $menuItem.addClass('slideInLeft')
}

function closeNav() {
  $menuBtn.removeClass('open')
  $menuItem.removeClass('slideInLeft')
  $menuItem.addClass('slideOutLeft')

  $body.removeClass('openNav').addClass('closeNav')

  setTimeout(function(){
    $nav.css( 'height', '0%' )
  }, 500);
}

function menuHandler() {
  if($menuBtn.hasClass('open')) {
    closeNav()
  }else{
    openNav()
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

  var scrollTop = $window.scrollTop();

  sections.map(function(section) {
    const sectionY = $(`#${section.name}-section`).position().top

    if ( scrollTop >= sectionY ) {
      $menuBtn.css('background-color', section.color )
    }

    const contentY = $(`.${section.name}-content`).position().top
    const animationThreshold = 500

    if ( scrollTop + animationThreshold >= contentY) {
      $(`.${section.name}-text`)
        .find('.animated')
        .removeClass('invisible')
        .addClass('slideInRight')
    }
  })
}

function handleItemClick() {
  closeNav()

  $('html, body')
    .animate({
      scrollTop: $(`#${$(this).attr('id')}-section`).offset().top
    }, 'slow' );
}

$(document).ready(function(){
  setMenuBackgroundColor()

  // add listeners
  $menuBtn.on('click', menuHandler);
  $('.menu-item').on('click', handleItemClick);

  $window.scroll(function() {
    setMenuBackgroundColor()
  });
});
