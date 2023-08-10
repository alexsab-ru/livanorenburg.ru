import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Autoplay]);

const banner = new Swiper('.banner-slider', {
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	autoHeight: false,
	lazy: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

const partners = new Swiper('.partners-slider', {
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 30
		},
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		init: function(){
			// console.log('swiper initialized');
			document.querySelector('.reviews').classList.remove('hidden')
		}
	}
});