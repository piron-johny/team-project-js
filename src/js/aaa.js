import axios from 'axios';

const USER_ID = localStorage.getItem('userID');
console.log(USER_ID);

async function user(id) {
  const data = await axios.get(
    `https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
  );
  const dadaUser = data.data;
  console.log(dadaUser);
}

user(USER_ID);

async function getMuvies() {
  const dataMuvies = await axios.get(
    'https://api.themoviedb.org/3/trending/all/day?api_key=2cf91cf1fed5026ae9524dc97ad33068',
  );
  console.log(dataMuvies);
}
getMuvies();
