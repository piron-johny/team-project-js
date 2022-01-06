const axios = require('axios');
const formReg = document.querySelector('#login-form-post');
const formLog = document.querySelector('#login-form-get');
const userLogin = document.querySelector('.form__input[name=userName]');
const userEmail = document.querySelector('.form__input[name=userEmail]');
const userPassword = document.querySelector('.form__input[name=userPassword]');
const SERVER_URL =
  'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users.json';

const arrayOfUserEmail = [];
formReg.addEventListener('submit', onSubmitForm);
// formLog.addEventListener('submit', onSubmitForm);

async function onSubmitForm(e) {
  e.preventDefault();

  const name = userLogin.value;
  const email = userEmail.value;
  const password = userPassword.value;

  console.log('input.value', email);
  e.target.reset();
  await getUser();

  console.log('Массив', arrayOfUserEmail);
  console.log('Есть или такой ?', arrayOfUserEmail.includes(email));

  if (arrayOfUserEmail.includes(email)) {
    console.log('Есть такой');
  } else {
    console.log('Запись в базу данных');
    postRegistration(name, email, password);
  }
  arrayOfUserEmail.length = 0;
}

function postRegistration(name, email, pass) {
  try {
    axios.post(SERVER_URL, {
      name,
      email,
      pass,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getUser() {
  const data = await axios.get(SERVER_URL);
  const valuesOfData = Object.values(data.data);
  valuesOfData.forEach(user => arrayOfUserEmail.push(user.email));
  return;
}
