///////Owl Carousel//////
$(document).ready(function () {
  $(".owl-one").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: true,
    rewindNav: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        autoplayHoverPause: true,
      },
      600: {
        items: 3,
        nav: true,
      },
      1000: {
        items: 4,
        nav: true,
        loop: true,
        margin: 0,
      },
    },
  });
});

$(document).ready(function () {
  $(".owl-two").owlCarousel({
    center:true,
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    autoplay: true,
    rewindNav: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        autoplayHoverPause: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 3,
        nav:true,
        loop: true,
        margin: 0,
      },
    },
  });
});

////////Loading js////////
new WOW().init();

////////Scroll Button//////
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
  myFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


///////Sticky Header//////
// window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
