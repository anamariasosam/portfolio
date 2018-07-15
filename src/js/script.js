// element declarations
const $menuItem = $('.menu-content--item')
const $nav = $('#myNav')
const $menuBtn = $('.menu--btn')
const $window = $(window)
const $body = $('body')

function preventDefault(e){
  e.preventDefault();
}

function disableScroll(){
  document.body.addEventListener('touchmove', preventDefault, { passive: false });
}
function enableScroll(){
  document.body.removeEventListener('touchmove', preventDefault, { passive: false });
}

$('body').bind('touchmove', function(e){e.preventDefault()})

function openNav() {
  $menuBtn.addClass('open')

  $body.addClass('openNav')

  disableScroll()

  $menuItem.removeClass('slideOutLeft')
  $menuItem.addClass('slideInLeft')

  $nav.css( 'height', '100%' )
}

function closeNav() {
  $menuBtn.removeClass('open')

  $body.removeClass('openNav')
  enableScroll()

  $menuItem.removeClass('slideInLeft')
  $menuItem.addClass('slideOutLeft')

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
      name: 'motounovirtual',
      color: '#C5D86D'
    },
    {
      name: 'manik',
      color: '#C5D86D'
    },
    {
      name: 'eldorado',
      color: '#1B998B'
    },
    {
      name: 'below',
      color: '#2E294E'
    },
    {
      name: 'fehandbags',
      color: '#F46036'
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
      scrollTop: $(`#${$(this).attr('id')}-section`).offset().top + 10
    }, 'slow' );
}

$(document).ready(function(){
  setMenuBackgroundColor()

  window.scrollBy(0, 500);

  // add listeners
  $menuBtn.on('click', menuHandler);
  $('.menu-item').on('click', handleItemClick);

  $window.scroll(function() {
    setMenuBackgroundColor()
  });
});
