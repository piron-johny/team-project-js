import { userInfo, getMuvies, getUserId, getMoviesInfo, genresList } from './servisesAPI';
import markup from '../hbs/render.hbs';

const renderContainer = document.querySelector('.movies');

console.log('id->>', getUserId());

function renderMovies() {
  getMuvies().then(data => {
    const moviesList = data.data.results;
    renderContainer.insertAdjacentHTML('afterbegin', markup(moviesList));
    data.data.results.forEach(item => genresList(item.genre_ids));
    console.log(data.data.results); // удалить
  });
}
renderMovies();
