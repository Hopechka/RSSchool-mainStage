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

//Slider
// const prevBtn = document.querySelector('.prev');
// const nextBtn = document.querySelector('.next');
// const slider = document.querySelector('.slider');
// let cardsChange = document.querySelector('.cards-change');
// let cardsChangeWidth;

// const cards = document.querySelectorAll('.card');
// let screenWidthNow = window.innerWidth;
// let screenWidthBefore;

// let step = 0;
// let cardsInSliderAtMoment;
// let offset = 0;
// let cardsArray = [];
// let offsetForDrawBeforeNode;

// for (let i = 0; i < cards.length; i++) {
//   cardsArray[i] = cards[i];
//   cards[i].remove();
// }

// function cardsMixer() {
//   return cardsArray.sort(() => Math.random() - 0.5);
// }

// // Slider for different screen
// function checkTheScreenWidth() {
//   if (window.innerWidth >= 1280) {
//     cardsInSliderAtMoment = 9;
//     offsetForDrawBeforeNode = 2;
//   } else if (window.innerWidth >= 768) {
//     cardsInSliderAtMoment = 6;
//     offsetForDrawBeforeNode = 1;
//   } else {
//     cardsInSliderAtMoment = 3;
//     offsetForDrawBeforeNode = 0;
//   }
//   for (let i = 0; i < cardsInSliderAtMoment; i++) {
//     draw();
//   }
// }
// checkTheScreenWidth();

// function screenWidthMeasurement() {
//   screenWidthBefore = screenWidthNow;
//   screenWidthNow = window.innerWidth;
//   if (screenWidthBefore != screenWidthNow) {
//     for (let i = 0; i < cards.length; i++) {
//       cardsArray[i] = cards[i];
//       cards[i].remove();
//     }
//     offset = 0;
//     step = 0;
//     checkTheScreenWidth();
//   }
// }
// prevBtn.addEventListener('click', screenWidthMeasurement);
// nextBtn.addEventListener('click', screenWidthMeasurement);

// function draw() {
//   cardsChangeWidth = cardsChange.offsetWidth;
//   console.log(cardsChangeWidth);
//   console.log(offset);
//   console.log(step);
//   cardsArray[step].style.left =
//     (offset / cardsInSliderAtMoment) * cardsChangeWidth * 3 + 'px';
//   slider.appendChild(cardsArray[step]);
//   if (step + 1 == cardsArray.length) {
//     step = 0;
//   } else {
//     step++;
//   }
//   offset++;
// }

// function drawAfterNode(arr, arr3) {
//   arr = arr.concat(arr3);
//   //проверка на то, что имя уникально и не повторялось в прошлыех карточках
//   for (let i = 0; i < cardsArray.length; i++) {
//     if (
//       arr.findIndex(
//         (i) => i == cardsArray[step].querySelector('p').innerHTML
//       ) === -1
//     ) {
//       arr3.push(cardsArray[step].querySelector('p').innerHTML);
//       break;
//     }
//     if (step + 1 == cardsArray.length) {
//       step = 0;
//     } else {
//       step++;
//     }
//   }
//   draw();
// }
// function left() {
//   cardsChangeWidth = cardsChange.offsetWidth;
//   prevBtn.removeEventListener('click', left);
//   let cards2 = document.querySelectorAll('.card');
//   console.log(cards2);
//   for (let i = 0; i < cards2.length; i++) {
//     cards2[i].style.left =
//       parseInt(cards2[i].style.left, 10) - cardsChangeWidth + 'px';
//   }
//   setTimeout(function () {
//     for (let i = 0; i < cards2.length; i++) {
//       if (parseInt(cards2[i].style.left, 10) < 0) {
//         cards2[i].remove();
//       }
//     }
//     let exceptionNames = [];
//     for (
//       let i = cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
//       i < cards2.length;
//       i++
//     ) {
//       exceptionNames.push(cards2[i].querySelector('p').innerHTML);
//     }
//     let arr3 = [];
//     offset = cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
//     for (let i = 0; i < cardsInSliderAtMoment / 3; i++) {
//       drawAfterNode(exceptionNames, arr3);
//     }

//     prevBtn.addEventListener('click', left);
//   }, 1000);
// }

// prevBtn.addEventListener('click', left);

// function drawBeforeNode(arr, arr2) {
//   cardsChangeWidth = cardsChange.offsetWidth;
//   //cardsMixer();
//   arr = arr.concat(arr2);
//   //проверка на то, что имя уникально и не повторялось в прошлыех карточках
//   while (true) {
//     if (
//       arr.findIndex(
//         (i) => i == cardsArray[step].querySelector('p').innerHTML
//       ) === -1
//     ) {
//       arr2.push(cardsArray[step].querySelector('p').innerHTML);
//       break;
//     }
//     if (step + 1 == cardsArray.length) {
//       step = 0;
//     } else {
//       step++;
//     }
//   }
//   cardsArray[step].style.left =
//     (offset / cardsInSliderAtMoment) * cardsChangeWidth * 3 + 'px';
//   slider.prepend(cardsArray[step]);

//   if (step + 1 == cardsArray.length) {
//     step = 0;
//   } else {
//     step++;
//   }
//   offset--;
// }

// function right() {
//   cardsChangeWidth = cardsChange.offsetWidth;
//   nextBtn.removeEventListener('click', right);
//   let cards3 = document.querySelectorAll('.card');
//   for (let i = 0; i < cards3.length; i++) {
//     cards3[i].style.left =
//       parseInt(cards3[i].style.left, 10) + cardsChangeWidth + 'px';
//   }

//   setTimeout(function () {
//     for (let i = 0; i < cards3.length; i++) {
//       if (parseInt(cards3[i].style.left, 10) >= cardsChangeWidth * 3) {
//         cards3[i].remove();
//       }
//     }
//     let exceptionNames = [];
//     for (
//       let i = 0;
//       i < cardsInSliderAtMoment - cardsInSliderAtMoment / 3;
//       i++
//     ) {
//       exceptionNames.push(cards3[i].querySelector('p').innerHTML);
//     }
//     let arr2 = [];
//     offset = offsetForDrawBeforeNode;
//     for (let i = 0; i < cardsInSliderAtMoment / 3; i++) {
//       drawBeforeNode(exceptionNames, arr2);
//     }

//     nextBtn.addEventListener('click', right);
//   }, 1000);
// }
// nextBtn.addEventListener('click', right);
