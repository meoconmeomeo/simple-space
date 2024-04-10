/**
*
* -----------------------------------------------------------------------------
*
* Template : #
* Author : #
* Author URI : #

* -----------------------------------------------------------------------------
*
**/

(function ($) {
    "use strict";

    // pisticky Menu
    var header = $('.rts-header');
    var win = $(window);
    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 100) {
            header.removeClass("rts-sticky");
        } else {
            header.addClass("rts-sticky");
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    //preloader
    $(window).on('load', function () {
        $("#rts__preloader").delay(1000).fadeOut(400);
        $("#rts__preloader").delay(1000).fadeOut(400);
    });

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    //Clients Slider
    if ($('.innerpage-carousel').length) {
        $('.innerpage-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            centerPadding: '160px',
            centerMode: true,
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        centerMode: false,
                        centerPadding: '0px',
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        centerPadding: '0px',
                        centerMode: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    function Tabs() {
        var bindAll = function () {
            var menuElements = document.querySelectorAll('[data-tab]');
            for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].addEventListener('click', change, false);
            }
        }

        var clear = function () {
            var menuElements = document.querySelectorAll('[data-tab]');
            for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].classList.remove('active');
                var id = menuElements[i].getAttribute('data-tab');
                document.getElementById(id).classList.remove('active');
            }
        }

        var change = function (e) {
            clear();
            e.target.classList.add('active');
            var id = e.currentTarget.getAttribute('data-tab');
            document.getElementById(id).classList.add('active');
        }

        bindAll();

        
    }
     // image slide gsap
     gsap.to(".images", {
        scrollTrigger:{
          // trigger: ".images",
          start: "top bottom", 
          end: "bottom top", 
          scrub: 1,
          // markers: true
        },
        y: -300,
      });
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
    }

    function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }
    
    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }
    
    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
    }

    function animateLetterOut(cw, i) {
    setTimeout(function() {
            cw[i].className = 'letter out';
    }, i*80);
    }

    function animateLetterIn(nw, i) {
    setTimeout(function() {
            nw[i].className = 'letter in';
    }, 340+(i*80));
    }

    function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }
    
    wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);


    
    function TextChange() {
        var blockLetters = new TimelineMax({paused:true}),
        albumLetters = new TimelineMax({paused:false}),
        fullText = $("#fullText"),
        splitHeadline = new SplitText(fullText, {type:"words,chars"}), 
        chars = splitHeadline.chars,
        bgController = $("#backgroundController"),
        letter = $(".letter"),
        letterTiming = 0.6,
        spaceTiming = 0.8,
        stringsArray = ["Function", "Developer", "Rooms", "Intorior", "Design"],
        currentString = 0;
  
  
      function revertSplit(targetSplit, newString){
    
        if(newString !== undefined){
          // go to the nxt string
          currentString++;
          // reset the text timeline
          albumLetters.pause(0).clear();
          // revert the tet split
          targetSplit.revert();
    
          // set the container's opacity to 0 and change the text
          TweenLite.set(fullText, {autoAlpha:0, text:{value:newString}});
    
          // reset the split text
          splitHeadline = new SplitText(fullText, {type:"words,chars"});
          chars = splitHeadline.chars;
    
          // container's opacity back to 1
          TweenLite.set(fullText, {autoAlpha:1});
    
          albumLetters
            .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
            .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]])
            .play();
    
        } else {
          currentString = 0;
          revertSplit(splitHeadline, stringsArray[currentString]);
        }
    
      }
      currentString++;
  
      albumLetters
      .staggerFrom(chars,0.6, {opacity:0, y: -20}, 0.1)
      .staggerTo(chars,0.6, {opacity:0, y: 20}, 0.05,'+=0', revertSplit, [splitHeadline,stringsArray[currentString]]);

    };

    var connectTabs = new Tabs();


})(jQuery);