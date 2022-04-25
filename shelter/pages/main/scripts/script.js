//Slider
const BTN_LEFT = document.querySelector('.prev');
const BTN_RIGHT = document.querySelector('.next');
const SLIDER = document.querySelector('#slider');
const ITEM_LEFT = document.querySelector('#item-left');
const ITEM_RIGHT = document.querySelector('#item-right');
const ITEM_ACTIVE = document.querySelector('#item-active');
const petsNamesList = [
  'Jennifer',
  'Sophia',
  'Woody',
  'Scarlett',
  'Katrine',
  'Timmy',
  'Freddie',
  'Charly',
];
function namesMixer(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
let cardsOnThePage;
function checkTheScreenWidth() {
  if (window.innerWidth >= 1280) {
    cardsOnThePage = 3;
  } else if (window.innerWidth >= 768) {
    cardsOnThePage = 2;
    if (ITEM_LEFT.children.length > 2) {
      ITEM_LEFT.children[0].remove();
      ITEM_RIGHT.children[0].remove();
      ITEM_ACTIVE.children[0].remove();
    }
  } else {
    cardsOnThePage = 1;
    while (ITEM_LEFT.children.length > 1) {
      ITEM_LEFT.children[0].remove();
      ITEM_RIGHT.children[0].remove();
      ITEM_ACTIVE.children[0].remove();
    }
  }
}
checkTheScreenWidth();

let screenWidthNow = window.innerWidth;
let screenWidthBefore;
function screenWidthMeasurement() {
  screenWidthBefore = screenWidthNow;
  screenWidthNow = window.innerWidth;
  if (screenWidthBefore != screenWidthNow) {
    checkTheScreenWidth();
  }
}
BTN_LEFT.addEventListener('click', screenWidthMeasurement);
BTN_RIGHT.addEventListener('click', screenWidthMeasurement);

function moveLeft() {
  SLIDER.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
  namesMixer(petsNamesList);
}
function moveRight() {
  SLIDER.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
  namesMixer(petsNamesList);
}
BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

SLIDER.addEventListener('animationend', (animationEvent) => {
  console.log(animationEvent);
  let mutableItem;
  if (animationEvent.animationName === 'move-left') {
    mutableItem = ITEM_LEFT;
    SLIDER.classList.remove('transition-left');
    SLIDER.classList.remove('transition-right');
    ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML;
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
  } else {
    mutableItem = ITEM_RIGHT;
    SLIDER.classList.remove('transition-right');
    SLIDER.classList.remove('transition-left');
    ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
  }

  let pet = removingDuplicateNames();
  mutableItem.innerHTML = '';
  for (i = 0; i < cardsOnThePage; i++) {
    mutableItem.appendChild(cardCreator(pet[i]));
  }

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
});

function cardCreator(pet) {
  const card = document.createElement('div');
  card.classList.add('card');
  let imgCard = document.createElement('img');
  imgCard.src = `../../assets/images/pets-${pet.toLowerCase()}.jpg`;
  let petName = document.createElement('p');
  let petNameText = document.createTextNode(pet);
  petName.appendChild(petNameText);
  let cardBtn = document.createElement('button');
  cardBtn.classList.add('btn-light');
  cardBtn.classList.add('card-btn');
  let cardBtnText = document.createTextNode('Learn more');
  cardBtn.appendChild(cardBtnText);
  card.appendChild(imgCard);
  card.appendChild(petName);
  card.appendChild(cardBtn);
  return card;
}

function removingDuplicateNames() {
  let exceptionNames2 = [];
  for (i = 0; i < cardsOnThePage; i++) {
    exceptionNames2.push(
      ITEM_ACTIVE.children[i].querySelector('p').textContent
    );
  }
  //console.log(exceptionNames2);

  let nameForUse = [];
  for (i = 0; i < petsNamesList.length; i++) {
    if (
      exceptionNames2.findIndex((index) => index == petsNamesList[i]) === -1
    ) {
      nameForUse.push(petsNamesList[i]);
    }
  }

  return nameForUse;
}

// Burger-menu
const burgerBtn = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const slider = document.querySelector('.slider');
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
