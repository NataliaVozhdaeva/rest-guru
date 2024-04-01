const localBtn = document.querySelector('.local');
const locationList = document.querySelector('.local-list');
const currentLocation = document.querySelector('.local-current');
const locationItems = document.querySelectorAll('.local-item');

const closeLocationList = () => {
  locationList.setAttribute('hidden', '');

  document.removeEventListener('click', docListener);
};

const docListener = (e) => {
  if (e.currentTarget !== locationList && e.target !== localBtn && e.target !== currentLocation) {
    closeLocationList();
  }
};

const changeLocation = (e) => {
  e.preventDefault();

  const currentItem = e.target.dataset.lang;

  if (currentItem === 'close') {
    closeLocationList();
    return;
  }

  currentLocation.setAttribute('src', `./assets/images/${currentItem}-flag.png`);
  currentLocation.dataset.lang = currentItem;

  if (currentItem === 'ru') {
    currentLocation.setAttribute('alt', 'язык страницы - русский');
  }

  if (currentItem === 'en') {
    currentLocation.setAttribute('alt', 'language of page is English');
  }

  if (currentItem === 'es') {
    currentLocation.setAttribute('alt', 'idioma de la página - español');
  }

  locationItems.forEach((el) => {
    if (el.dataset.lang === currentLocation.dataset.lang) {
      el.setAttribute('hidden', '');
    } else {
      el.removeAttribute('hidden');
    }
  });

  closeLocationList();
};

const handleLocation = () => {
  locationList.removeAttribute('hidden');

  locationList.addEventListener('click', changeLocation);
  document.addEventListener('click', docListener);
};

const locationHandler = () => {
  localBtn.addEventListener('click', handleLocation);
};

export default locationHandler;
