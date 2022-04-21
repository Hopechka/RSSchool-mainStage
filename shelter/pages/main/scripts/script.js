//Slider
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');
let cardsChange = document.querySelector('.cards-change');
let cardsChangeWidth;

const cards = document.querySelectorAll('.card');
let screenWidthNow = window.innerWidth;
let screenWidthBefore;

let step = 0;
let cardsInSliderAtMoment;
let offset = 0;
let cardsArray = [];
let offsetForDrawBeforeNode;

for (let i = 0; i < cards.length; i++) {
  cardsArray[i] = cards[i];
  cards[i].remove();
}

function cardsMixer() {
  return cardsArray.sort(() => Math.random() - 0.5);
}

// Slider for different screen
function checkTheScreenWidth() {
  if (window.innerWidth >= 1280) {
    cardsInSliderAtMoment = 9;
    offsetForDrawBeforeNode = 2;
    console.log('я тут 1280 и выше');
  } else if (window.innerWidth >= 768) {
    cardsInSliderAtMoment = 6;
    offsetForDrawBeforeNode = 1;
    console.log('я тут 768 и выше');
  } else {
    cardsInSliderAtMoment = 3;
    offsetForDrawBeforeNode = 0;
    console.log('я тут 767 и ниже');
  }
  for (let i = 0; i < cardsInSliderAtMoment; i++) {
    draw();
  }
}
checkTheScreenWidth();

function screenWidthMeasurement() {
  screenWidthBefore = screenWidthNow;
  screenWidthNow = window.innerWidth;
  if (screenWidthBefore != screenWidthNow) {
    for (let i = 0; i < cards.length; i++) {
      cardsArray[i] = cards[i];
      cards[i].remove();
    }
    offset = 0;
    step = 0;
    checkTheScreenWidth();
  }
}
prevBtn.addEventListener('click', screenWidthMeasurement);
nextBtn.addEventListener('click', screenWidthMeasurement);

function draw() {
  cardsChangeWidth = cardsChange.offsetWidth;
  console.log(cardsChangeWidth);
  console.log(offset);
  console.log(step);
  cardsArray[step].style.left =
    (offset / cardsInSliderAtMoment) * cardsChangeWidth * 3 + 'px';
  slider.appendChild(cardsArray[step]);
  if (step + 1 == cardsArray.length) {
    step = 0;
  } else {
    step++;
  }
  offset++;
}

function drawAfterNode(arr, arr3) {
  arr = arr.concat(arr3);
  //проверка на то, что имя уникально и не повторялось в прошлыех карточках
  for (let i = 0; i < cardsArray.length; i++) {
    if (
      arr.findIndex(
        (i) => i == cardsArray[step].querySelector('p').innerHTML
      ) === -1
    ) {
      arr3.push(cardsArray[step].querySelector('p').innerHTML);
      break;
    }
    if (step + 1 == cardsArray.length) {
      step = 0;
    } else {
      step++;
    }
  }
  draw();
}
function left() {
  cardsChangeWidth = cardsChange.offsetWidth;
  prevBtn.removeEventListener('click', left);
  let cards2 = document.querySelectorAll('.card');
  console.log(cards2);
  for (let i = 0; i < cards2.length; i++) {
    cards2[i].style.left =
      parseInt(cards2[i].style.left, 10) - cardsChangeWidth + 'px';
  }
  setTimeout(function () {
    for (let i = 0; i < cards2.length; i++) {
      if (parseInt(cards2[i].style.left, 10) < 0) {
        cards2[i].remove();
      }
    }
    let exceptionNames = [];
    for (
      let i = cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
      i < cards2.length;
      i++
    ) {
      exceptionNames.push(cards2[i].querySelector('p').innerHTML);
    }
    let arr3 = [];
    offset = cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
    for (let i = 0; i < cardsInSliderAtMoment / 3; i++) {
      drawAfterNode(exceptionNames, arr3);
    }

    prevBtn.addEventListener('click', left);
  }, 1000);
}

prevBtn.addEventListener('click', left);

function drawBeforeNode(arr, arr2) {
  cardsChangeWidth = cardsChange.offsetWidth;
  //cardsMixer();
  arr = arr.concat(arr2);
  //проверка на то, что имя уникально и не повторялось в прошлыех карточках
  while (true) {
    if (
      arr.findIndex(
        (i) => i == cardsArray[step].querySelector('p').innerHTML
      ) === -1
    ) {
      arr2.push(cardsArray[step].querySelector('p').innerHTML);
      break;
    }
    if (step + 1 == cardsArray.length) {
      step = 0;
    } else {
      step++;
    }
  }
  cardsArray[step].style.left =
    (offset / cardsInSliderAtMoment) * cardsChangeWidth * 3 + 'px';
  slider.prepend(cardsArray[step]);

  if (step + 1 == cardsArray.length) {
    step = 0;
  } else {
    step++;
  }
  offset--;
}

function right() {
  cardsChangeWidth = cardsChange.offsetWidth;
  nextBtn.removeEventListener('click', right);
  let cards3 = document.querySelectorAll('.card');
  for (let i = 0; i < cards3.length; i++) {
    cards3[i].style.left =
      parseInt(cards3[i].style.left, 10) + cardsChangeWidth + 'px';
  }

  setTimeout(function () {
    for (let i = 0; i < cards3.length; i++) {
      if (parseInt(cards3[i].style.left, 10) >= cardsChangeWidth * 3) {
        cards3[i].remove();
      }
    }
    let exceptionNames = [];
    for (
      let i = 0;
      i < cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
      i++
    ) {
      exceptionNames.push(cards3[i].querySelector('p').innerHTML);
    }
    let arr2 = [];
    offset = offsetForDrawBeforeNode;
    for (let i = 0; i < cardsInSliderAtMoment / 3; i++) {
      drawBeforeNode(exceptionNames, arr2);
    }

    nextBtn.addEventListener('click', right);
  }, 1000);
}
nextBtn.addEventListener('click', right);

// Burger-menu
const burgerBtn = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const slide = document.querySelector('.slider');
const header = document.querySelector('#header');
const navItem = document.querySelectorAll('.nav-item');

function activateMenu() {
  burgerBtn.classList.toggle('active');
  logo.classList.toggle('active');
  nav.classList.toggle('active');
  navList.classList.toggle('active');
  slider.classList.toggle('active');
  header.classList.toggle('active');
  document.body.classList.toggle('off');
}

function closeMenu() {
  return activateMenu();
}

burgerBtn.addEventListener('click', activateMenu);
nav.addEventListener('click', closeMenu);

// Получение данных от API from pets.json
const petType = document.querySelector('.pet-type');
const card = document.querySelector('.card');
const modalPic = document.querySelector('.modal-pic');
const modal = document.getElementById('myModal');
const span = document.querySelector('.close');
const petsInfo = [
  'name',
  'description',
  'age',
  'inoculations',
  'diseases',
  'parasites',
];
var currentName;

async function getQuotes() {
  const pets = './scripts/pets.json';
  const res = await fetch(pets);
  const data = await res.json();
  showData(data);
}

function fillOutTheCard(event) {
  const target = event.target.closest('.card');
  currentName = target.children[1].innerText;
  modal.style.display = 'block';
  document.body.classList.toggle('off');
}

function showData(data) {
  let nameIndex = data.findIndex((item) => item.name === currentName);
  petType.textContent = data[nameIndex].type + ' - ' + data[nameIndex].breed;
  modalPic.src = data[nameIndex].img;
  petsInfo.forEach((e) => {
    if (Array.isArray(data[nameIndex][e])) {
      let arr = data[nameIndex][e];
      if (arr.length > 1) {
        document.getElementById(e).textContent = arr.join(', ');
      } else {
        document.getElementById(e).textContent = data[nameIndex][e];
      }
    } else {
      document.getElementById(e).textContent = data[nameIndex][e];
    }
  });
}

slider.addEventListener('click', fillOutTheCard);
slider.addEventListener('click', getQuotes);

//close modal-window
span.addEventListener('click', function () {
  modal.style.display = 'none';
  document.body.classList.remove('off');
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.classList.remove('off');
  }
};
