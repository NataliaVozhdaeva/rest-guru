import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use(Navigation);

const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-btn--next',
    prevEl: '.swiper-btn--prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  slidesPerView: 1,
  spaceBetween: 20,

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
  },
});

export default swiper;
