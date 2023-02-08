import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './images-api-service';
import Markup from './markup';
import { smoothScroll, scrollToTop } from './scroll';

let isImages = true;
const galleryWrap = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const galleryTitle = document.querySelector('.gallery-title');
const body = document.querySelector('body');
const imagesApiService = new ImagesApiService();
const up = document.querySelector('.up');
const preloader = document.querySelector('.lds-ellipsis');

window.onscroll = function (ev) {
  if (window.scrollY < 1000) {
    up.style.display = 'none';
  } else {
    up.style.display = 'block';
  }
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    isImages
  ) {
    loadMore();
  }
};

form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  try {
    isImages = true;
    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    galleryWrap.innerHTML = '';

    if (imagesApiService.query === '') {
      galleryTitle.textContent = '';
      return Notify.failure(
        "We can't show anything because you didn't ask for anything"
      );
    }
    showPageLoader(true);
    const images = await imagesApiService.getImages();
    showPageLoader(false);
    if (images.hits.length === 0) {
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Markup.changeTitleAccordingQuery(
      imagesApiService.query,
      images.totalHits,
      galleryTitle
    );
    Markup.renderImages(galleryWrap, images.hits);
    let gallery = new SimpleLightbox('.gallery a');
    imagesApiService.resetPage();
  } catch (error) {
    onError(error);
  } finally {
    form.reset();
  }
}

async function loadMore() {
  if (!imagesApiService.isLastPage()) {
    isImages = false;
    Markup.renderInfoEndOfContent(galleryWrap);
    return;
  }
  showPageLoader(true);
  const images = await imagesApiService.getImages();
  showPageLoader(false);
  Markup.renderImages(galleryWrap, images.hits);
  smoothScroll(galleryWrap);
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

function onError({ message }) {
  Notify.failure(message);
}

document.addEventListener('wheel', function (event) {
  //only vertical scroll
  if (event.deltaY > 0) {
    smoothScroll(document.documentElement, 100, 1000);
  }
});

up.addEventListener('click', scrollToTop);

function showPageLoader(isEnable) {
  if (isEnable) {
    preloader.style.visibility = 'visible';
  } else {
    preloader.style.visibility = 'hidden';
  }
}
