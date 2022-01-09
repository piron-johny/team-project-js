import axios from 'axios';
const KEY = '2cf91cf1fed5026ae9524dc97ad33068';

function getUserId() {
  const USER_ID = localStorage.getItem('userID');
  return USER_ID;
}

async function userInfo(id) {
  const data = await axios.get(
    `https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
  );
  const dadaUser = data.data;
  console.log(dadaUser);
}

// user(USER_ID);

async function getMuvies() {
  const dataMuvies = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${KEY}&language=en-US`,
  );
  console.log(dataMuvies.data.results.filter(el => el.original_title));
  return dataMuvies;
}
// getMuvies();

async function getMoviesInfo(id) {
  const moviesInformation = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`,
  );
  return moviesInformation;
}

async function genresList(idGenres) {
  const genresList = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=2cf91cf1fed5026ae9524dc97ad33068',
  );
  const arrayOfGenres = [];

  genresList.data.genres.forEach(el => {
    idGenres.map(idGenr => {
      if (el.id === idGenr) {
        arrayOfGenres.push(el.name);
      }
    });
  });
  // console.log('arr', arrayOfGenres);

  return;
}

export { userInfo, getMuvies, getUserId, getMoviesInfo, genresList };
