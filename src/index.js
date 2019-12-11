
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper from 'swiper';

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// import 'uikit/dist/css/uikit.min.css';
import './css/style.scss';


// UIkit.notification('Hello world.');
// console.log('hello, world');


document.addEventListener('DOMContentLoaded', () => {

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
	// slideshowBanner.controller.control = slideshowMain; //testing/ uncomment



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

});

