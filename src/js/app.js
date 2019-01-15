//Global Vars
const $window = $(window);
const $document = $(document);
const $html = $('html');
const $wrapper = $('.wrapper');
const $header = $('.header');
const $main = $('.main');
const $overlay = $('.js-overlay');

/**
 * Main
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
const Main = {
    init: function() {
        this.removePreloader();
        this.video();
        this.goTop();
        this.changeBgImage();

        //Stop drag Img
        $('img').on('dragstart', function(e) {
            e.preventDefault();
        });

        $window.on('resize', function() {
            Main.changeBgImage();
        });
    },
    //Remove preloader
    removePreloader: function() {
        setTimeout(() => {
            $('body').removeClass('loading');
        }, 1000);
    },
    goTop: function() {
        $('.js-go-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate(
                {
                    scrollTop: 0
                },
                800
            );
        });
    },
    inputs: {
        init: function() {
            this.inputMask();
        },
        //Masked inputmask https://github.com/RobinHerbots/Inputmask
        inputMask: function() {
            if ($('.js-phone-mask').length) {
                $('.js-phone-mask').inputmask({
                    mask: '+7 (999) 999-99-99'
                });
            }
        }
    },
    video: function() {
        let $videoContainer = $('.js-video');
        let $video = $videoContainer.find('video');
        let $playBtn = $videoContainer.find('.video__btn');

        $video.on('click', function(e) {
            if (this.paused) {
                this.play();
                $playBtn.hide();
            } else {
                this.pause();
                $playBtn.show();
            }
            e.preventDefault();
        });
    },
    contentOffset: function() {
        let $firstScreen = $('.swiper-container');
        let $content = $('.content');

        if ($(window).width() > 480) {
            $content.css('padding-top', $firstScreen.outerHeight(true));
        }
    },
    changeBgImage: function() {
        $('.firstscreen, .section--img').each(function() {
            let image = $(this).attr('data-bgimage');
            let smallImage = $(this).attr('data-bgimage-small');

            if ($(window).width() > 480) {
                if (typeof image !== 'undefined') {
                    $(this).attr(
                        'style',
                        'background-image: url("' + image + '")'
                    );
                }
            } else {
                if (typeof smallImage !== 'undefined') {
                    $(this).attr(
                        'style',
                        'background-image: url("' + smallImage + '")'
                    );
                } else {
                    console.log('udefined');

                    $(this).attr(
                        'style',
                        'background-image: url("' + image + '")'
                    );
                }
            }
        });
    }
};

// Initialize slider

$(function() {
    $(Main.init());

    window.addEventListener(
        'touchstart',
        function onFirstTouch() {
            // we could use a class
            document.body.classList.remove('no-touchevents');

            // we only need to know once that a human touched the screen, so we can stop listening now
            window.removeEventListener('touchstart', onFirstTouch, false);
        },
        false
    );

    (function() {
        let timeout = false;
        let isMove = false;
        let $firstScreen = $document.find('.firstscreen');
        let sliderSelector = '.swiper-container';
        let $arrowPrev = $('.js-page-controls-arrow--prev');
        let $arrowNext = $('.js-page-controls-arrow--next');
        let page;

        function checkPage() {
            let pageNext, pagePrev;
            mySwiper.slides.each(function(e) {
                $('.page')
                    .hide()
                    .removeClass('is-active');

                if ($(this).hasClass('swiper-slide-active')) {
                    page = $(this).data('page');

                    pagePrev = mySwiper.slides.eq(e - 1).data('page-title');
                    pageNext = mySwiper.slides.eq(e + 1).data('page-title');

                    $arrowPrev.find('span').text(pagePrev);
                    $arrowNext.find('span').text(pageNext);
                }

                $('.page--' + page)
                    .show()
                    .addClass('is-active');
            });
        }

        let options = {
            init: false,
            loop: true,
            loopAdditionalSlides: 1,
            speed: 1200,
            effect: 'cube', // 'cube', 'fade', 'coverflow',
            cubeEffect: {
                shadow: false
            },
            grabCursor: true,
            // Events
            on: {
                imagesReady: function() {
                    this.el.classList.remove('loading');
                },
                touchEnd: function() {
                    setTimeout(function() {
                        isMove = false;
                    }, 300);
                },
                slideChangeTransitionEnd: function() {
                    if (!isMove) {
                        checkPage();
                    }
                }
            }
        };

        let mySwiper = new Swiper(sliderSelector, options);
        mySwiper.init();

        $window.on('scroll touchmove', function() {
            let scroll = $(this).scrollTop();

            if (scroll > 0) {
                $header.addClass('is-fixed');
                timeout = true;
                if ($(window).width() > 1024) {
                    $firstScreen.addClass('scale-out');
                }
            } else {
                $header.removeClass('is-fixed');
                $firstScreen.removeClass('scale-out');
                timeout = false;
            }
        });

        $arrowPrev.on('click', function() {
            if (!timeout) {
                mySwiper.slidePrev();
            } else {
                goTop();
                setTimeout(() => {
                    mySwiper.slidePrev();
                }, 800);
            }
        });

        $arrowNext.on('click', function() {
            if (!timeout) {
                mySwiper.slideNext();
            } else {
                goTop();
                setTimeout(() => {
                    mySwiper.slideNext();
                }, 800);
            }
        });

        function goTop() {
            $('html, body').animate(
                {
                    scrollTop: 0
                },
                600
            );
        }
    })();
});
