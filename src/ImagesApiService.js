import * as dotenv from 'dotenv';
import axios from 'axios';

const options =
  'image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=10';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = process.env.KEY;

async function getImages(query) {
  const response = await axios.get(
    `${ENDPOINT}?key=${API_KEY}&q=${query}&${options}`
  );
  return response.data.hits;
}

export default { getImages };
