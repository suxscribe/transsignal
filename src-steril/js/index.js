
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';
import ymaps from 'ymaps';
// import $ from "jquery";
import Inputmask from "inputmask";
import ValidForm from '@pageclip/valid-form';


// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// import 'uikit/dist/css/uikit.min.css';
// import '../scss/style.scss';


// UIkit.notification('Hello world.');
// console.log('hello, world');



document.addEventListener('DOMContentLoaded', () => {


	const searchInput = document.querySelector('.header__search-form-input');
	const searchResults = document.querySelector('.header__search-results')

	searchInput.addEventListener('focus', (event) => {
		searchResults.classList.add('header__search-results--show')
	});

	searchInput.addEventListener('blur', (event) => {
		searchResults.classList.remove('header__search-results--show')
	});

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
				crossFade: true
			},
		});


		slideshowMain.controller.control = slideshowBanner;
		slideshowBanner.controller.control = slideshowMain;


		// Move 2nd banner to another column on resize
		const indexMoveBanner = () => {
			const bannerTeleport = document.querySelector('.index-banner__teleport');
			const bannerFirst = document.querySelector('.index-banners__first');
			const bannerSecond = document.querySelector('.index-banners__second');
			const bannerBefore = document.querySelector('.index-banners__insertbeforeme')

			if (window.matchMedia("(min-width: 960px)").matches) {
				if (bannerTeleport.parentNode != bannerFirst) {
					bannerFirst.appendChild(
						bannerTeleport
						);
					bannerTeleport.classList.add('uk-grid-margin');
					console.log('movedto first');
				}
			} else {
				if (bannerTeleport.parentNode != bannerSecond) {
					bannerSecond.insertBefore(
						bannerTeleport,
						bannerBefore
						);
					console.log('movedto second');
				}
			}
		};

		indexMoveBanner();
		window.addEventListener('resize', indexMoveBanner);

		// document.querySelector('.clients__title').appendChild(document.querySelector('.clients__nav'));
	}


	if (document.querySelector('.page--product')) {

		// slideset nav
		const slidesetNav = function() {
			// document.querySelectorAll('.product__description-slider-current > li').forEach( (el,i) => {
			// 	el.innerHTML = i+1;
			// });

			console.log(document.querySelectorAll('.product__description-slider-current > li').length);

			document.querySelector('.product__description-slider-overall').innerHTML = document.querySelectorAll('.product__description-slider-items > li').length;
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
			onSlideChangeEnd:function(e){
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
			onSlideChangeEnd:function(e){
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
				crossFade: true
			},
			on: {
				init: function() {
					updateCurrentIndex(this);
					document.querySelector('.slideshow__count-overall').innerHTML = document.querySelectorAll('.slider-about-2 .swiper-slide:not(.swiper-slide-duplicate)').length;
				},
			}
		});
		// update current slide number
		sliderAbout2.on('slideChange', function () {
			updateCurrentIndex(this);
		});
		function updateCurrentIndex(slider) {
			document.querySelector('.slideshow__count-current').innerHTML = slider.realIndex + 1;
		}
		
		// control each slider with another
		sliderAbout3.controller.control = sliderAbout1;
		sliderAbout3.controller.control = sliderAbout2;
		sliderAbout1.controller.control = sliderAbout2;
		sliderAbout2.controller.control = [sliderAbout3, sliderAbout1]; // i dont know how, but it works!





		// sliderAbout2.controller.control = sliderAbout1;
		function updateSlideWidth() {
			let slideWidth = document.querySelector('.slider-about-1__item').offsetWidth;
			console.log(slideWidth);
			document.querySelectorAll('.slider-about-1__item').forEach( el => {
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
			loop:true,
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
			loop:true,
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
			loop:true,
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

		let mapCenter;

		const getMapCenter = () => {
			// variables.scss
			// $breakpoint-small: 640px;  // Phone landscape
			// $breakpoint-medium: 960px;  // Tablet Landscape
			// $breakpoint-large:1200px; // Desktop
			// $breakpoint-xlarge:1600px; // Large Screens

			if (window.innerWidth >= 1200) {
				mapCenter = [56.349619, 43.807270];
			} else if (window.innerWidth >= 640) {
				mapCenter = [56.349619, 43.807270];
			} else {
				mapCenter = [56.349619, 43.807270];
			};
			// console.log(mapCenter);
			return mapCenter;
		};
	

	ymaps
	  .load('https://api-maps.yandex.ru/2.1/?apikey=7831c6db-8a7f-49d5-a7b7-c567b1e05675&lang=ru_RU')
	  .then(maps => {
	    const myMap = new maps.Map('map', {
	      center: getMapCenter(),
	      zoom: 16,
	      controls: []
	    })
	    ;
	    myMap.controls.add('zoomControl', {
	    	left: 5,
	    	top: 60
	    });
			myMap.behaviors.disable('scrollZoom')

	    var myPlacemark1 = new maps.Placemark([56.349619, 43.807270], 
				{
					hintContent: 'ул. Торфяная, 30',
					balloonContent: '603139, г. Нижний Новгород, ул.Торфяная, 30 '}, 
				{
					iconLayout: 'default#image',
					iconImageHref: '../assets/icon_geo@2x.png',
					iconImageSize: [48, 58],
					iconImageOffset: [-24, -58]
				});
			myMap.geoObjects.add(myPlacemark1);
	  
	  })
	  .catch(error => console.log('Failed to load Yandex Maps', error));
	}
});
