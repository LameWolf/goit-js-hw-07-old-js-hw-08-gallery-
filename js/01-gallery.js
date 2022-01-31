import { galleryItems } from './gallery-items.js';

const list = document.querySelector('.gallery');
let instance;

// Create a markup

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join('');

// On Gallery Click

const onGalleryClick = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  const originalImage = e.target.dataset.source;
  openModal(originalImage);
};

// Open Modal

const openModal = originalImage => {
  instance = basicLightbox.create(`<img src="${originalImage}">`);
  instance.show();
  console.log('Your gallery has been open!)');
  window.addEventListener('keydown', onEscKeyPress);
};

// On Escape Press

const onEscKeyPress = e => {
  const isEscKey = e.code === 'Escape';
  if (!isEscKey) {
    return;
  }
  instance.close();
  console.log('Your gallery has been closed!)');
  window.removeEventListener('keydown', onEscKeyPress);
};

list.insertAdjacentHTML('afterbegin', markup);
list.addEventListener('click', onGalleryClick);
