import '@babel/polyfill';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import Swiper from 'swiper';
import Swiper from 'swiper/js/swiper.js';
import ymaps from 'ymaps';
// import $ from "jquery";
// import Inputmask from "inputmask";
// import ValidForm from '@pageclip/valid-form';
import cssVars from 'css-vars-ponyfill';
import objectFitImages from 'object-fit-images';

window.UIkit = UIkit; // fix not difined bug

cssVars({
  // Options...
});

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// import 'uikit/dist/css/uikit.min.css';
// import '../scss/style.scss';

// UIkit.notification('Hello world.');
// console.log('hello, world');

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header__search-form-input');
  const searchResults = document.querySelector('.header__search-results');

  // focus on search input when click search link in header
  document
    .querySelector('.header__offcanvas-search-link')
    .addEventListener('click', (event) => {
      document.querySelector('.burger__search-form-input').focus();
    });

  searchInput.addEventListener('focus', (event) => {
    searchResults.classList.add('header__search-results--show');
  });

  searchInput.addEventListener('blur', (event) => {
    searchResults.classList.remove('header__search-results--show');
  });

  // validate forms
  var contactForm = document.querySelectorAll('.form');

  if (contactForm) {
    contactForm.forEach((form) => {
      form.querySelectorAll('.validate--empty').forEach((input) => {
        input.addEventListener('focusout', () => {
          if (checkIfEmpty(input)) return;
          return true;
        });
      });

      const inputEmail = form.querySelector('.validate--email');
      if (inputEmail) {
        inputEmail.addEventListener('focusout', () => {
          if (checkIfEmpty(inputEmail)) return;
          if (checkIfEmail(inputEmail)) return;
          return true;
        });
      }

      const inputPhone = form.querySelector('.validate--phone');
      if (inputPhone) {
        inputPhone.addEventListener('focusout', () => {
          if (checkIfEmpty(inputPhone)) return;
          if (checkIfOnlyDigits(inputPhone)) return;
          return true;
        });
      }
    });

    document.addEventListener(
      'invalid',
      (function() {
        return function(e) {
          //prevent the browser from showing default error bubble / hint
          e.preventDefault();
          // optionally fire off some custom validation handler
          // myValidation();
        };
      })(),
      true
    );

    const checkIfEmpty = (field) => {
      if (isEmpty(field.value.trim())) {
        setInvalid(field, 'Обязательное поле');
        return true;
      } else {
        setValid(field);
        return false;
      }
    };

    const isEmpty = (value) => {
      if (value === '') return true;
      return false;
    };

    const setInvalid = (field, message) => {
      field.classList.add('invalid');
      field.nextElementSibling.innerHTML = message;
      field.nextElementSibling.className = 'form__note form__note--red';
    };
    const setValid = (field) => {
      field.classList.remove('invalid');
      field.nextElementSibling.innerHTML = '';
      field.nextElementSibling.className = 'form__note';
    };

    const checkIfOnlyLetters = (field) => {
      if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, 'Должно содержать только буквы');
      }
    };
    const checkIfOnlyDigits = (field) => {
      if (
        /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
          field.value
        )
      ) {
        setValid(field);
        return true;
      } else {
        setInvalid(
          field,
          'Пожалуйста введите номер телефона в формате +XXXXXXXXXX'
        );
      }
    };
    const checkIfEmail = (field) => {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          field.value
        )
      ) {
        setValid(field);
        return true;
      } else {
        setInvalid(field, 'Должно быть в формате email@domain.dom');
      }
    };
  }

  // for index page only
  if (document.querySelector('.page--index')) {
    var slideshowMain = new Swiper('.slideshow-main', {
      loop: false,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: true,
      // clickable: true, //zrx photoswipe
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      allowTouchMove: true,
      keyboard: {
        enabled: true,
      },
      effect: 'slide',
    });

    var slideshowBanner = new Swiper('.slideshow-banner', {
      loop: false,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: true,
      // clickable: true, //zrx photoswipe
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      allowTouchMove: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });

    slideshowMain.controller.control = slideshowBanner;
    slideshowBanner.controller.control = slideshowMain;

    // Move 2nd banner to another column on resize
    const indexMoveBanner = () => {
      const bannerTeleport = document.querySelector('.index-banner__teleport');
      const bannerFirst = document.querySelector('.index-banners__first');
      const bannerSecond = document.querySelector('.index-banners__second');
      const bannerBefore = document.querySelector(
        '.index-banners__insertbeforeme'
      );

      if (window.matchMedia('(min-width: 960px)').matches) {
        if (bannerTeleport.parentNode != bannerFirst) {
          bannerFirst.appendChild(bannerTeleport);
          bannerTeleport.classList.add('uk-grid-margin');
          console.log('movedto first');
        }
      } else {
        if (bannerTeleport.parentNode != bannerSecond) {
          bannerSecond.insertBefore(bannerTeleport, bannerBefore);
          console.log('movedto second');
        }
      }
    };

    indexMoveBanner();
    window.addEventListener('resize', indexMoveBanner);

    // document.querySelector('.clients__title').appendChild(document.querySelector('.clients__nav'));
  }

  if (document.querySelector('.page--section')) {
    // hide filter toggle if no filter form found
    const filterForm = document.querySelector('form.smartfilter');
    if (!filterForm) {
      document
        .querySelector('.section__items-filter-link')
        .classList.add('uk-hidden');
    }

    const filterOffcanvas = document.querySelector('#filter-menu');
    if (filterOffcanvas) {
      UIkit.util.on(filterOffcanvas, 'show', function() {
        console.log('offcanvas open');

        var filterBlock = document.querySelector('.smartfilter');
        var filterContainerSide = document.querySelector('.section__filter');
        var filterContainerOff = document.querySelector('.burger__filter');

        if (!document.querySelector('.burger__filter .smartfilter')) {
          filterContainerOff.appendChild(filterBlock);
        }
      });
    }
  }

  if (document.querySelector('.page--product')) {
    // slideset nav
    const slidesetNav = function() {
      // document.querySelectorAll('.product__description-slider-current > li').forEach( (el,i) => {
      // 	el.innerHTML = i+1;
      // });

      console.log(
        document.querySelectorAll('.product__description-slider-current > li')
          .length
      );

      document.querySelector(
        '.product__description-slider-overall'
      ).innerHTML = document.querySelectorAll(
        '.product__description-slider-items > li'
      ).length;
    };

    slidesetNav();
    // UIkit.lightbox('.product__gallery-items', {
    // 	animation: 'fade'
    // });
    // UIkit.lightboxPanel(panelOptions);
  }

  if (document.querySelector('.page--about')) {
    var sliderAbout1 = new Swiper('.slider-about-1', {
      loop: true,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: true,
      // clickable: true, //zrx photoswipe
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      allowTouchMove: true,
      keyboard: {
        enabled: true,
      },

      effect: 'slide',
      breakpoints: {
        640: {
          slidesPerView: 'auto',
        },
        960: {
          slidesPerView: 'auto',
        },
      },
      onSlideChangeEnd: function(e) {
        // sliderAbout1.update(true);
      },
    });

    var sliderAbout3 = new Swiper('.slider-about-3', {
      loop: true,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: true,
      // clickable: true, //zrx photoswipe
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      allowTouchMove: true,
      keyboard: {
        enabled: false,
      },
      effect: 'slide',
      breakpoints: {
        640: {
          slidesPerView: 'auto',
        },
        960: {
          slidesPerView: 'auto',
        },
      },
      onSlideChangeEnd: function(e) {
        // sliderAbout1.update(true);
      },
    });

    var sliderAbout2 = new Swiper('.slider-about-2', {
      loop: true,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: false,
      // clickable: true, //zrx photoswipe
      // Navigation arrows
      navigation: {
        nextEl: '.slider-about-2-next',
        prevEl: '.slider-about-2-prev',
      },
      allowTouchMove: false,
      keyboard: {
        enabled: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      on: {
        init: function() {
          updateCurrentIndex(this);
          document.querySelector(
            '.slideshow__count-overall'
          ).innerHTML = document.querySelectorAll(
            '.slider-about-2 .swiper-slide:not(.swiper-slide-duplicate)'
          ).length;
        },
      },
    });
    // update current slide number
    sliderAbout2.on('slideChange', function() {
      updateCurrentIndex(this);
    });
    function updateCurrentIndex(slider) {
      document.querySelector('.slideshow__count-current').innerHTML =
        slider.realIndex + 1;
    }

    // control each slider with another
    sliderAbout3.controller.control = sliderAbout1;
    sliderAbout3.controller.control = sliderAbout2;
    sliderAbout1.controller.control = sliderAbout2;
    sliderAbout2.controller.control = [sliderAbout3, sliderAbout1]; // i dont know how, but it works!

    // sliderAbout2.controller.control = sliderAbout1;
    function updateSlideWidth() {
      let slideWidth = document.querySelector('.slider-about-1__item')
        .offsetWidth;
      console.log(slideWidth);
      document.querySelectorAll('.slider-about-1__item').forEach((el) => {
        el.style.width = slideWidth + 'px';
        // console.log(el);
      });
      document.querySelector('.slider-about-3').style.width = slideWidth + 'px';
      sliderAbout3.update();
      sliderAbout1.update();
      console.log('updatewidth');
    }
    updateSlideWidth();
    window.addEventListener('resize', () => {
      updateSlideWidth();
    });
  } //page--about

  if (document.querySelector('.page--production')) {
    //TODO .product__gallery.length

    var gallery1Thumbs = new Swiper('.gallery__thumbs_1', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: true,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // onSlideChangeEnd: function(s) {
      //     if ( s.slides.length == s.activeIndex+1 ) s.swipeTo(0);
      //     console.log(s.activeIndex);
      // }
    });

    var gallery1Top = new Swiper('.gallery__top_1', {
      spaceBetween: 20,
      loop: true,
      loopedSlides: 0, //looped slides should be the same
      navigation: {
        nextEl: '.gallery__button-next_1',
        prevEl: '.gallery__button-prev_1',
      },
      thumbs: {
        swiper: gallery1Thumbs,
      },
    });

    var gallery2Thumbs = new Swiper('.gallery__thumbs_2', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: true,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // onSlideChangeEnd: function(s) {
      //     if ( s.slides.length == s.activeIndex+1 ) s.swipeTo(0);
      //     console.log(s.activeIndex);
      // }
    });

    var gallery2Top = new Swiper('.gallery__top_2', {
      spaceBetween: 20,
      loop: true,
      loopedSlides: 0, //looped slides should be the same
      navigation: {
        nextEl: '.gallery__button-next_2',
        prevEl: '.gallery__button-prev_2',
      },
      thumbs: {
        swiper: gallery2Thumbs,
      },
    });
  }

  if (document.querySelector('.page--content')) {
    //TODO .product__gallery.length

    var gallery1Thumbs = new Swiper('.gallery__thumbs_1', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: false,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // onSlideChangeEnd: function(s) {
      //     if ( s.slides.length == s.activeIndex+1 ) s.swipeTo(0);
      //     console.log(s.activeIndex);
      // }
    });

    var gallery1Top = new Swiper('.gallery__top_1', {
      spaceBetween: 20,
      loop: false,
      loopedSlides: 0, //looped slides should be the same
      navigation: {
        nextEl: '.gallery__button-next_1',
        prevEl: '.gallery__button-prev_1',
      },
      thumbs: {
        swiper: gallery1Thumbs,
      },
    });
  }

  if (document.querySelector('.page--contacts')) {
    // let ymaps = require('ymaps');
    // let mapCenter;

    // const getMapCenter = () => {
    // 	// variables.scss
    // 	// $breakpoint-small: 640px;  // Phone landscape
    // 	// $breakpoint-medium: 960px;  // Tablet Landscape
    // 	// $breakpoint-large:1200px; // Desktop
    // 	// $breakpoint-xlarge:1600px; // Large Screens

    // 	if (window.innerWidth >= 1200) {
    // 		mapCenter = [56.349619, 43.798270];
    // 	} else if (window.innerWidth >= 640) {
    // 		mapCenter = [56.349619, 43.803270];
    // 	} else {
    // 		mapCenter = [56.351919, 43.807270];
    // 	};
    // 	console.log(mapCenter);
    // 	return mapCenter;
    // };

    // ymaps.ready(init);
    // function init() {
    // 	var myMap = new ymaps.Map('map', {
    // 			center: getMapCenter(),
    // 			zoom: 16,
    // 			controls: []
    // 		}),
    // 		// collection = new ymaps.GeoObjectCollection(),
    // 		// bounds = myMap.getBounds();
    // 	myMap.controls.add('zoomControl', {
    // 		left: 5,
    // 		top: 60
    // 	});
    // 	myMap.behaviors.disable('scrollZoom')
    // 	add('mapTools', {
    // 		left: 35,
    // 		top: 60
    // 	})
    // 	var myPlacemark1 = new ymaps.Placemark([56.349619, 43.807270],
    // 		{
    // 			hintContent: 'ул. Торфяная, 30',
    // 			balloonContent: '603139, г. Нижний Новгород, ул.Торфяная, 30 '},
    // 		{
    // 			iconLayout: 'default#image',
    // 			iconImageHref: '../assets/icon_geo@2x.png',
    // 			iconImageSize: [48, 58],
    // 			iconImageOffset: [-24, -58]
    // 		});
    // 	myMap.geoObjects.add(myPlacemark1);
    // };

    // /* PHONE */

    // let inputPhone = document.querySelector('.form__input--phone');

    // // Inputmask({"mask": "+7 (999) 999-9999", autoclear: false, showMaskOnHover: false}).mask(inputPhone);
    // // inputPhone.removeAttribute('required');

    // var forms = document.querySelectorAll('.form');
    // forms.forEach(function (form) {
    // 	ValidForm(form, {

    // 		errorPlacement: 'after',
    // 		customMessages: {
    // 			valueMissing: "Обязательное поле",
    // 			// Special mismatches for different input types: `${type}Mismatch`
    // 			emailMismatch: "Пожалуйста введите правильный email"
    // 		}
    // 	});
    // });

    let mapCenter;
    const mapBlock = document.getElementById('map');

    // console.log(JSON.parse(decodeURIComponent(mapBlock.dataset.coordinates)));

    const getMapCenter = () => {
      // variables.scss
      // $breakpoint-small: 640px;  // Phone landscape
      // $breakpoint-medium: 960px;  // Tablet Landscape
      // $breakpoint-large:1200px; // Desktop
      // $breakpoint-xlarge:1600px; // Large Screens
      mapCenter = JSON.parse(decodeURIComponent(mapBlock.dataset.coordinates));

      if (window.innerWidth >= 1200) {
        // mapCenter = [56.349619, 43.798270];
      } else if (window.innerWidth >= 640) {
        // mapCenter = [56.349619, 43.803270]; // 0 0.005
        mapCenter[1] += 0.005;
      } else {
        // mapCenter = [56.351919, 43.807270]; // 0.0023 0.009
        mapCenter[0] += 0.0023;
        mapCenter[1] += 0.009;
      }
      // console.log(mapCenter);
      return mapCenter;
    };

    ymaps
      .load(
        'https://api-maps.yandex.ru/2.1/?apikey=7831c6db-8a7f-49d5-a7b7-c567b1e05675&lang=ru_RU'
      )
      .then((maps) => {
        const myMap = new maps.Map('map', {
          center: getMapCenter(),
          zoom: 16,
          controls: [],
        });
        myMap.controls.add('zoomControl', {
          left: 5,
          top: 60,
        });
        myMap.behaviors.disable('scrollZoom');

        var myPlacemark1 = new maps.Placemark(
          [56.349619, 43.80727],
          {
            hintContent: 'ул. Торфяная, 30',
            balloonContent: '603139, г. Нижний Новгород, ул.Торфяная, 30 ',
          },
          {
            iconLayout: 'default#image',
            iconImageHref:
              '/local/templates/transsignal/assets/icon_geo@2x.png',
            iconImageSize: [48, 58],
            iconImageOffset: [-24, -58],
          }
        );
        myMap.geoObjects.add(myPlacemark1);
      })
      .catch((error) => console.log('Failed to load Yandex Maps', error));
  }

  // polyfill for ie
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    objectFitImages();
  }
});
