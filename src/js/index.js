// Polyfills now handled by Babel with usage-based loading
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper/js/swiper.js';
import ymaps from 'ymaps';
import cssVars from 'css-vars-ponyfill';
import objectFitImages from 'object-fit-images';

window.UIkit = UIkit; // fix not difined bug

cssVars({
  // Options...
});

// loads the Icon plugin
UIkit.use(Icons);

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header__search-form-input');
  const searchResults = document.querySelector('.header__search-results');

  // focus on search input when click search link in header
  const searchLink = document.querySelector('.header__offcanvas-search-link');
  const burgerSearchInput = document.querySelector('.burger__search-form-input');
  if (searchLink) {
    searchLink.addEventListener('click', (event) => {
      if (burgerSearchInput) {
        burgerSearchInput.focus();
      }
    });
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('focus', (event) => {
      searchResults.classList.add('header__search-results--show');
    });

    searchInput.addEventListener('blur', (event) => {
      searchResults.classList.remove('header__search-results--show');
    });
  }

  const burgerParentLinks = document.querySelectorAll('.burger__nav-link');
  if (burgerParentLinks) {
    burgerParentLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
      });
    });
  }

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
        setInvalid(field, 'Пожалуйста введите номер телефона в формате +XXXXXXXXXX');
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
      autoplay: {
        delay: 5000,
      },
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
      const bannerBefore = document.querySelector('.index-banners__insertbeforeme');

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
  }

  if (document.querySelector('.page--section')) {
    // hide filter toggle if no filter form found
    const filterForm = document.querySelector('form.smartfilter');
    if (!filterForm) {
      document.querySelector('.section__items-filter-link').classList.add('uk-hidden');
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
      const overall = document.querySelector('.product__description-slider-overall');
      if (overall) {
        overall.innerHTML = String(
          document.querySelectorAll('.product__description-slider-items > li').length
        );
      }
    };

    //slidesetNav(); // disable product slide nav

    //wrap table in description tab with responsive handler
    const descriptionTable = document.querySelector('.product__description-right table');
    if (descriptionTable) {
      const descriptionTableWrapper = document.createElement('div');
      descriptionTableWrapper.classList.add('uk-overflow-auto');
      descriptionTable.parentNode?.insertBefore(descriptionTableWrapper, descriptionTable);
      descriptionTableWrapper.appendChild(descriptionTable);
    }
  }

  if (document.querySelector('.page--about')) {
    var sliderAbout1 = new Swiper('.slider-about-1', {
      loop: true,
      loopedSlides: 6,
      slidesPerView: '1',
      grabCursor: true,
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
          const countElement = document.querySelector('.slideshow__count-overall');
          const slideCount = document.querySelectorAll(
            '.slider-about-2 .swiper-slide:not(.swiper-slide-duplicate)'
          ).length;
          if (countElement) {
            countElement.innerHTML = String(slideCount);
          }
        },
      },
    });
    // update current slide number
    sliderAbout2.on('slideChange', function() {
      updateCurrentIndex(this);
    });
    function updateCurrentIndex(slider) {
      const countElement = document.querySelector('.slideshow__count-current');
      if (countElement) {
        countElement.innerHTML = slider.realIndex + 1;
      }
    }

    // control each slider with another
    sliderAbout3.controller.control = sliderAbout1;
    sliderAbout3.controller.control = sliderAbout2;
    sliderAbout1.controller.control = sliderAbout2;
    sliderAbout2.controller.control = [sliderAbout3, sliderAbout1];

    // sliderAbout2.controller.control = sliderAbout1;
    function updateSlideWidth() {
      const slideElement = document.querySelector('.slider-about-1__item');
      if (!slideElement) return;
      let slideWidth = slideElement.offsetWidth;
      console.log(slideWidth);
      document.querySelectorAll('.slider-about-1__item').forEach((el) => {
        el.style.width = slideWidth + 'px';
        // console.log(el);
      });
      const sliderAbout3Element = document.querySelector('.slider-about-3');
      if (sliderAbout3Element) {
        sliderAbout3Element.style.width = slideWidth + 'px';
        sliderAbout3.update();
        sliderAbout1.update();
        // console.log('updatewidth');
      }
    }
    updateSlideWidth();
    window.addEventListener('resize', () => {
      updateSlideWidth();
    });
  } //page--about

  if (document.querySelector('.page--production')) {
    var gallery1Thumbs = new Swiper('.gallery__thumbs_1', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: false,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
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

    var gallery2Thumbs = new Swiper('.gallery__thumbs_2', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: false,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    var gallery2Top = new Swiper('.gallery__top_2', {
      spaceBetween: 20,
      loop: false,
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
    var gallery2Thumbs = new Swiper('.gallery__thumbs_2', {
      spaceBetween: 20,
      slidesPerView: 'auto',
      loop: false,
      freeMode: true,
      loopedSlides: 0, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    var gallery2Top = new Swiper('.gallery__top_2', {
      spaceBetween: 20,
      loop: false,
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

  if (document.querySelector('.page--contacts')) {
    let mapCenter;
    const mapBlock = document.getElementById('map');

    const getMapCenter = () => {
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
            iconImageHref: '/local/templates/transsignal/assets/icon_geo@2x.png',
            iconImageSize: [48, 58],
            iconImageOffset: [-24, -58],
          }
        );
        myMap.geoObjects.add(myPlacemark1);
      })
      .catch((error) => console.log('Failed to load Yandex Maps', error));
  }

  // Cookie popup window
  (function() {
    const cookiePopup = document.querySelector('.popup-cookies');
    const cookieConsent = localStorage.getItem('cookieconsent');

    if (!cookieConsent && cookiePopup) {
      cookiePopup.classList.remove('uk-hidden');

      const acceptButton = cookiePopup.querySelector('a');
      if (acceptButton) {
        acceptButton.addEventListener('click', (e) => {
          e.preventDefault();
          cookiePopup.style.display = 'none';
          localStorage.setItem('cookieconsent', 'accepted');
        });
      }
    }
  })();

  // polyfill for ie
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    objectFitImages();
  }
});
