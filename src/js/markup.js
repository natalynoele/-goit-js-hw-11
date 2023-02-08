function renderImages(container, images) {
  markup = images.reduce(
    (listMarkup, image) => listMarkup + createImageCardMarkup(image),
    ''
  );
  container.insertAdjacentHTML('beforeend', markup);
}

function createImageCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <a href="${largeImageURL}" class="photo-card-link" target="_blank">
   <div class="photo-card">   
  <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">  
     <p class="info-detail">
     <b>Likes </b> ${likes}
    </p>
    <p class="info-detail">
      <b>Views </b> ${views}
    </p>
    <p class="info-detail">
      <b>Comments </b> ${comments}
    </p>
    <p class="info-detail">
      <b>Downloads </b> ${downloads}
    </p>
  </div>
  
</div>
</a>
`;
}

function updateMarkup(element, markup = '') {
  element.insertAdjacentHTML('beforeend', markup);
}

function changeTitleAccordingQuery(query, totalHits, tag) {
  tag.textContent = `Hooray! We found ${totalHits} images at your query: "${query}".`;
}

function renderInfoEndOfContent() {
  const markup = '<p class="infinite-scroll-last">End of content</p>';
  galleryWrap.insertAdjacentHTML('beforeend', markup);
}

export default {
  createImageCardMarkup,
  renderImages,
  updateMarkup,
  changeTitleAccordingQuery,
  renderInfoEndOfContent,
};
