import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
galleryContainer.addEventListener('click', handleImgClick);

function handleImgClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const modal = basicLightbox.create(` <img class="gallery__image" src="${e.target.dataset.source}"/> `,
    {
        onShow: (modal) => {document.addEventListener('keydown', escModal)},
        onClose: (modal) => {document.removeEventListener('keydown', escModal)},
    });
    modal.show();

    document.addEventListener('keydown', escModal);
    function escModal({code}) {
        if (code === `Escape`) {
            modal.close();
        }
    }
}

const makeGalleryGrid = ({ preview, original, description }) => 
    `<div class="gallery__item"> 
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`;

const markupGallery = galleryItems.map(e => makeGalleryGrid(e)).join('');
galleryContainer.insertAdjacentHTML('afterbegin', markupGallery);

