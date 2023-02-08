import axios from 'axios';
import { Notify } from 'notiflix';
import * as dotenv from 'dotenv';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.totalHits = 0;
    this.counter = 0;
  }

  async getImages() {
    const options = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;
    const ENDPOINT = 'https://pixabay.com/api/';
    const API_KEY = process.env.KEY;
    const response = await axios.get(
      `${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&${options}`
    );
    this.incrementPage();
    this.totalHits = response.data.totalHits;
    return response.data;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  isLastPage() {
    this.counter += this.perPage;
    let leftImages = Number(this.totalHits - this.counter);
    if (leftImages <= 0) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      this.counter = 0;
      this.resetPage();
      return false;
    }
    return true;
  }
}
