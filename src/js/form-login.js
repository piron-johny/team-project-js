const axios = require('axios');

const formReg = document.querySelector('#login-form-post');
const formLog = document.querySelector('#login-form-get');
const SERVER_URL =
  'https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const arrayOfUserEmail = [];
const arrayOfUserPass = [];

let USER_ID = '';

formReg.addEventListener('submit', onRegistrationForm);
formLog.addEventListener('submit', onLoginForm);

async function onRegistrationForm(e) {
  e.preventDefault();

  const name = e.target.elements.userName.value;
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword.value;

  console.log('input.value', email);
  e.target.reset();
  await getUser();

  // console.log('Массив', arrayOfUserEmail);
  // console.log('Есть или такой ?', arrayOfUserEmail.includes(email));

  if (arrayOfUserEmail.includes(email)) {
    console.log('Есть такой Email');
  } else {
    console.log('Запись в базу данных');
    // postRegistration(name, email, password);
  }
  arrayOfUserEmail.length = 0;
}

async function onLoginForm(e) {
  e.preventDefault();
  const email = e.target.elements.userEmail.value;
  const password = e.target.elements.userPassword.value;
  await getUser();

  // console.log('email', email);
  // console.log('password', password);
  // console.log('arrayOfUserPass', arrayOfUserPass);
  // console.log('arrayOfUserEmail', arrayOfUserEmail);

  if (arrayOfUserEmail.includes(email) && arrayOfUserPass.includes(password)) {
    console.log('Добро пожаловать!');

    // console.log(console.log('USER_ID', USER_ID));

    // arrayOfUserPass.length = 0;
    // arrayOfUserEmail.length = 0;

    return await getUserId(email, password);
  } else {
    console.log('Пароль или Email введены не верно!');
  }
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
  valuesOfData.forEach(user => arrayOfUserPass.push(user.pass));
  return;
}

async function getUserId(email, pass) {
  const data = await axios.get(SERVER_URL);
  const DataID = Object.keys(data.data);
  const DataIDValues = Object.values(data.data);
  const DataIDEntries = Object.entries(data.data);

  // console.log('DataID', DataID);
  // console.log('DataIDValues', DataIDValues);
  // console.log('DataIDEntries', DataIDEntries);

  const aaa = DataIDValues.find(el => el.email === email);
  const bbb = DataIDValues.find(el => el.pass === pass);
  const ddd = DataIDEntries.find(el => el[1] === aaa && bbb);

  // console.log('aaa', aaa);
  // console.log('bbb', bbb);
  console.log('id ---->', ddd[0]);
  USER_ID = ddd[0];
  localStorage.setItem('userID', USER_ID);
  return;
}
