$(document).ready(function () {

  // toggle view menu nav on the small size
  $(".burger").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("open");
    $(".nav").toggleClass("open");
  });

  // hide navigation on click options and toggle class "active"
  $(".nav").on("click","a", function(event) {

    $(".nav .active").toggleClass("active");
    event.target.classList.add("active");

    if (!$(".burger").is(":visible")) return;
    $(".nav").toggleClass("open");
    $(".burger").toggleClass("open");
  });

  // smooth transition to anchor links
  $(".nav").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });

  // slider main settings
  $('.slider-main').slick({
    nextArrow: $('.arrow-next'),
    prevArrow: $('.arrow-prev'),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dotsClass: 'main-slider-dots',
          dots: true
        }
      }
    ]
  });

  // slider client settings
  $('.slider-client').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dotsClass: 'client-slider-dots',
    dots: true
  });

  // toggle view accordion
  $(".tab-body").slideUp("slow");
  $(".tab-header").click(function (event) {
      event.preventDefault();
      var $tab = $(this).parent();
      $tab.toggleClass("open");
      $tab.children(".tab-body").slideToggle("slow");
      $tab.siblings().removeClass("open");
      $tab.siblings().children(":last-child").slideUp("slow");
  });
  
});


