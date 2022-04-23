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
    ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
  } else {
    mutableItem = ITEM_RIGHT;
    SLIDER.classList.remove('transition-right');
    SLIDER.classList.remove('transition-left');
    ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
  }
  //   let exceptionNames = [];
  //   for (i = 0; i < ITEM_ACTIVE.children.length; i++) {
  //     exceptionNames.push(ITEM_ACTIVE.children[i].querySelector('p').innerHTML);
  //   }
  //   let nameForUse = [];
  //   for (i = 0; i < petsNamesList.length; i++) {
  //     if (exceptionNames.findIndex((index) => index == petsNamesList[i]) === -1) {
  //       nameForUse.push(petsNamesList[i]);
  //     }
  //   }
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
