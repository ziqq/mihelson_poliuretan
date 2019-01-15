'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
var $header = $('.header');
var $main = $('.main');
var $overlay = $('.js-overlay');

/**
 * Main
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Main = {
    init: function init() {
        this.removePreloader();
        this.video();
        this.goTop();
        this.changeBgImage();

        //Stop drag Img
        $('img').on('dragstart', function (e) {
            e.preventDefault();
        });

        $window.on('resize', function () {
            Main.changeBgImage();
        });
    },
    //Remove preloader
    removePreloader: function removePreloader() {
        setTimeout(function () {
            $('body').removeClass('loading');
        }, 1000);
    },
    goTop: function goTop() {
        $('.js-go-top').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
    },
    inputs: {
        init: function init() {
            this.inputMask();
        },
        //Masked inputmask https://github.com/RobinHerbots/Inputmask
        inputMask: function inputMask() {
            if ($('.js-phone-mask').length) {
                $('.js-phone-mask').inputmask({
                    mask: '+7 (999) 999-99-99'
                });
            }
        }
    },
    video: function video() {
        var $videoContainer = $('.js-video');
        var $video = $videoContainer.find('video');
        var $playBtn = $videoContainer.find('.video__btn');

        $video.on('click', function (e) {
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
    contentOffset: function contentOffset() {
        var $firstScreen = $('.swiper-container');
        var $content = $('.content');

        if ($(window).width() > 480) {
            $content.css('padding-top', $firstScreen.outerHeight(true));
        }
    },
    changeBgImage: function changeBgImage() {
        $('.firstscreen, .section--img').each(function () {
            var image = $(this).attr('data-bgimage');
            var smallImage = $(this).attr('data-bgimage-small');

            if ($(window).width() > 480) {
                if (typeof image !== 'undefined') {
                    $(this).attr('style', 'background-image: url("' + image + '")');
                }
            } else {
                if (typeof smallImage !== 'undefined') {
                    $(this).attr('style', 'background-image: url("' + smallImage + '")');
                } else {
                    console.log('udefined');

                    $(this).attr('style', 'background-image: url("' + image + '")');
                }
            }
        });
    }
};

// Initialize slider

$(function () {
    $(Main.init());

    window.addEventListener('touchstart', function onFirstTouch() {
        // we could use a class
        document.body.classList.remove('no-touchevents');

        // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    (function () {
        var timeout = false;
        var isMove = false;
        var $firstScreen = $document.find('.firstscreen');
        var sliderSelector = '.swiper-container';
        var $arrowPrev = $('.js-page-controls-arrow--prev');
        var $arrowNext = $('.js-page-controls-arrow--next');
        var page = void 0;

        function checkPage() {
            var pageNext = void 0,
                pagePrev = void 0;
            mySwiper.slides.each(function (e) {
                $('.page').hide().removeClass('is-active');

                if ($(this).hasClass('swiper-slide-active')) {
                    page = $(this).data('page');

                    pagePrev = mySwiper.slides.eq(e - 1).data('page-title');
                    pageNext = mySwiper.slides.eq(e + 1).data('page-title');

                    $arrowPrev.find('span').text(pagePrev);
                    $arrowNext.find('span').text(pageNext);
                }

                $('.page--' + page).show().addClass('is-active');
            });
        }

        var options = {
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
                imagesReady: function imagesReady() {
                    this.el.classList.remove('loading');
                },
                touchEnd: function touchEnd() {
                    setTimeout(function () {
                        isMove = false;
                    }, 300);
                },
                slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                    if (!isMove) {
                        checkPage();
                    }
                }
            }
        };

        var mySwiper = new Swiper(sliderSelector, options);
        mySwiper.init();

        $window.on('scroll touchmove', function () {
            var scroll = $(this).scrollTop();

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

        $arrowPrev.on('click', function () {
            if (!timeout) {
                mySwiper.slidePrev();
            } else {
                goTop();
                setTimeout(function () {
                    mySwiper.slidePrev();
                }, 800);
            }
        });

        $arrowNext.on('click', function () {
            if (!timeout) {
                mySwiper.slideNext();
            } else {
                goTop();
                setTimeout(function () {
                    mySwiper.slideNext();
                }, 800);
            }
        });

        function goTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        }
    })();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkd2luZG93IiwiJCIsIndpbmRvdyIsIiRkb2N1bWVudCIsImRvY3VtZW50IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRoZWFkZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiTWFpbiIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ2aWRlbyIsImdvVG9wIiwiY2hhbmdlQmdJbWFnZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImlucHV0cyIsImlucHV0TWFzayIsImxlbmd0aCIsImlucHV0bWFzayIsIm1hc2siLCIkdmlkZW9Db250YWluZXIiLCIkdmlkZW8iLCJmaW5kIiwiJHBsYXlCdG4iLCJwYXVzZWQiLCJwbGF5IiwiaGlkZSIsInBhdXNlIiwic2hvdyIsImNvbnRlbnRPZmZzZXQiLCIkZmlyc3RTY3JlZW4iLCIkY29udGVudCIsIndpZHRoIiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlYWNoIiwiaW1hZ2UiLCJhdHRyIiwic21hbGxJbWFnZSIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwib25GaXJzdFRvdWNoIiwiYm9keSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0aW1lb3V0IiwiaXNNb3ZlIiwic2xpZGVyU2VsZWN0b3IiLCIkYXJyb3dQcmV2IiwiJGFycm93TmV4dCIsInBhZ2UiLCJjaGVja1BhZ2UiLCJwYWdlTmV4dCIsInBhZ2VQcmV2IiwibXlTd2lwZXIiLCJzbGlkZXMiLCJoYXNDbGFzcyIsImRhdGEiLCJlcSIsInRleHQiLCJhZGRDbGFzcyIsIm9wdGlvbnMiLCJsb29wIiwibG9vcEFkZGl0aW9uYWxTbGlkZXMiLCJzcGVlZCIsImVmZmVjdCIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJncmFiQ3Vyc29yIiwiaW1hZ2VzUmVhZHkiLCJlbCIsInRvdWNoRW5kIiwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kIiwiU3dpcGVyIiwic2Nyb2xsIiwic2xpZGVQcmV2Iiwic2xpZGVOZXh0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFVBQVVOLEVBQUUsU0FBRixDQUFoQjtBQUNBLElBQU1PLFFBQVFQLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTVEsV0FBV1IsRUFBRSxhQUFGLENBQWpCOztBQUVBOzs7OztBQUtBLElBQU1TLE9BQU87QUFDVEMsVUFBTSxnQkFBVztBQUNiLGFBQUtDLGVBQUw7QUFDQSxhQUFLQyxLQUFMO0FBQ0EsYUFBS0MsS0FBTDtBQUNBLGFBQUtDLGFBQUw7O0FBRUE7QUFDQWQsVUFBRSxLQUFGLEVBQVNlLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVNDLENBQVQsRUFBWTtBQUNqQ0EsY0FBRUMsY0FBRjtBQUNILFNBRkQ7O0FBSUFsQixnQkFBUWdCLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQVc7QUFDNUJOLGlCQUFLSyxhQUFMO0FBQ0gsU0FGRDtBQUdILEtBZlE7QUFnQlQ7QUFDQUgscUJBQWlCLDJCQUFXO0FBQ3hCTyxtQkFBVyxZQUFNO0FBQ2JsQixjQUFFLE1BQUYsRUFBVW1CLFdBQVYsQ0FBc0IsU0FBdEI7QUFDSCxTQUZELEVBRUcsSUFGSDtBQUdILEtBckJRO0FBc0JUTixXQUFPLGlCQUFXO0FBQ2RiLFVBQUUsWUFBRixFQUFnQmUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsVUFBU0MsQ0FBVCxFQUFZO0FBQ3BDQSxjQUFFQyxjQUFGO0FBQ0FqQixjQUFFLFlBQUYsRUFBZ0JvQixPQUFoQixDQUNJO0FBQ0lDLDJCQUFXO0FBRGYsYUFESixFQUlJLEdBSko7QUFNSCxTQVJEO0FBU0gsS0Fo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QUVHLEdBRkg7QUFHSDtBQUNKLFNBVEQ7O0FBV0ExQixtQkFBVzNDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDOUIsZ0JBQUksQ0FBQ3VDLE9BQUwsRUFBYztBQUNWUyx5QkFBU3NCLFNBQVQ7QUFDSCxhQUZELE1BRU87QUFDSHhFO0FBQ0FLLDJCQUFXLFlBQU07QUFDYjZDLDZCQUFTc0IsU0FBVDtBQUNILGlCQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osU0FURDs7QUFXQSxpQkFBU3hFLEtBQVQsR0FBaUI7QUFDYmIsY0FBRSxZQUFGLEVBQWdCb0IsT0FBaEIsQ0FDSTtBQUNJQywyQkFBVztBQURmLGFBREosRUFJSSxHQUpKO0FBTUg7QUFDSixLQTdHRDtBQThHSCxDQTdIRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XG5jb25zdCAkb3ZlcmxheSA9ICQoJy5qcy1vdmVybGF5Jyk7XG5cbi8qKlxuICogTWFpblxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE1haW4gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XG4gICAgICAgIHRoaXMudmlkZW8oKTtcbiAgICAgICAgdGhpcy5nb1RvcCgpO1xuICAgICAgICB0aGlzLmNoYW5nZUJnSW1hZ2UoKTtcblxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHdpbmRvdy5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBNYWluLmNoYW5nZUJnSW1hZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9LFxuICAgIGdvVG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA4MDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaW5wdXRzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHZpZGVvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICR2aWRlb0NvbnRhaW5lciA9ICQoJy5qcy12aWRlbycpO1xuICAgICAgICBsZXQgJHZpZGVvID0gJHZpZGVvQ29udGFpbmVyLmZpbmQoJ3ZpZGVvJyk7XG4gICAgICAgIGxldCAkcGxheUJ0biA9ICR2aWRlb0NvbnRhaW5lci5maW5kKCcudmlkZW9fX2J0bicpO1xuXG4gICAgICAgICR2aWRlby5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAkcGxheUJ0bi5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAkcGxheUJ0bi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29udGVudE9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkZmlyc3RTY3JlZW4gPSAkKCcuc3dpcGVyLWNvbnRhaW5lcicpO1xuICAgICAgICBsZXQgJGNvbnRlbnQgPSAkKCcuY29udGVudCcpO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAgICAgJGNvbnRlbnQuY3NzKCdwYWRkaW5nLXRvcCcsICRmaXJzdFNjcmVlbi5vdXRlckhlaWdodCh0cnVlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNoYW5nZUJnSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuZmlyc3RzY3JlZW4sIC5zZWN0aW9uLS1pbWcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGltYWdlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJnaW1hZ2UnKTtcbiAgICAgICAgICAgIGxldCBzbWFsbEltYWdlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJnaW1hZ2Utc21hbGwnKTtcblxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgaW1hZ2UgKyAnXCIpJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzbWFsbEltYWdlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2U6IHVybChcIicgKyBzbWFsbEltYWdlICsgJ1wiKSdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndWRlZmluZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2U6IHVybChcIicgKyBpbWFnZSArICdcIiknXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vLyBJbml0aWFsaXplIHNsaWRlclxuXG4kKGZ1bmN0aW9uKCkge1xuICAgICQoTWFpbi5pbml0KCkpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgZnVuY3Rpb24gb25GaXJzdFRvdWNoKCkge1xuICAgICAgICAgICAgLy8gd2UgY291bGQgdXNlIGEgY2xhc3NcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdG91Y2hldmVudHMnKTtcblxuICAgICAgICAgICAgLy8gd2Ugb25seSBuZWVkIHRvIGtub3cgb25jZSB0aGF0IGEgaHVtYW4gdG91Y2hlZCB0aGUgc2NyZWVuLCBzbyB3ZSBjYW4gc3RvcCBsaXN0ZW5pbmcgbm93XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uRmlyc3RUb3VjaCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICk7XG5cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgbGV0ICRmaXJzdFNjcmVlbiA9ICRkb2N1bWVudC5maW5kKCcuZmlyc3RzY3JlZW4nKTtcbiAgICAgICAgbGV0IHNsaWRlclNlbGVjdG9yID0gJy5zd2lwZXItY29udGFpbmVyJztcbiAgICAgICAgbGV0ICRhcnJvd1ByZXYgPSAkKCcuanMtcGFnZS1jb250cm9scy1hcnJvdy0tcHJldicpO1xuICAgICAgICBsZXQgJGFycm93TmV4dCA9ICQoJy5qcy1wYWdlLWNvbnRyb2xzLWFycm93LS1uZXh0Jyk7XG4gICAgICAgIGxldCBwYWdlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGFnZSgpIHtcbiAgICAgICAgICAgIGxldCBwYWdlTmV4dCwgcGFnZVByZXY7XG4gICAgICAgICAgICBteVN3aXBlci5zbGlkZXMuZWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgJCgnLnBhZ2UnKVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEoJ3BhZ2UnKTtcblxuICAgICAgICAgICAgICAgICAgICBwYWdlUHJldiA9IG15U3dpcGVyLnNsaWRlcy5lcShlIC0gMSkuZGF0YSgncGFnZS10aXRsZScpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlTmV4dCA9IG15U3dpcGVyLnNsaWRlcy5lcShlICsgMSkuZGF0YSgncGFnZS10aXRsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhcnJvd1ByZXYuZmluZCgnc3BhbicpLnRleHQocGFnZVByZXYpO1xuICAgICAgICAgICAgICAgICAgICAkYXJyb3dOZXh0LmZpbmQoJ3NwYW4nKS50ZXh0KHBhZ2VOZXh0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcucGFnZS0tJyArIHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpbml0OiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMjAwLFxuICAgICAgICAgICAgZWZmZWN0OiAnY3ViZScsIC8vICdjdWJlJywgJ2ZhZGUnLCAnY292ZXJmbG93JyxcbiAgICAgICAgICAgIGN1YmVFZmZlY3Q6IHtcbiAgICAgICAgICAgICAgICBzaGFkb3c6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIC8vIEV2ZW50c1xuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbWFnZXNSZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG91Y2hFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG15U3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXJTZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgICAgIG15U3dpcGVyLmluaXQoKTtcblxuICAgICAgICAkd2luZG93Lm9uKCdzY3JvbGwgdG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICAgaWYgKHNjcm9sbCA+IDApIHtcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGZpcnN0U2NyZWVuLmFkZENsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgJGZpcnN0U2NyZWVuLnJlbW92ZUNsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhcnJvd1ByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ29Ub3AoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGFycm93TmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb1RvcCgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBnb1RvcCgpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA2MDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xufSk7XG4iXX0=