// Burger-menu
const burgerBtn = document.querySelector('.burger-menu');
const logo = document.querySelector('.logo');
const logoText = document.querySelector('.logo-text');
const heading = document.querySelector('h1');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('#header');
const navItem = document.querySelectorAll('.nav-item');

function activateMenu() {
  burgerBtn.classList.toggle('active');
  logo.classList.toggle('active');
  nav.classList.toggle('active');
  navList.classList.toggle('active');
  logoText.classList.toggle('active');
  heading.classList.toggle('active');
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
const petsCards = document.querySelector('.pets-cards');

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

petsCards.addEventListener('click', fillOutTheCard);
petsCards.addEventListener('click', getQuotes);

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

//Pagination
const lastPage = document.querySelector('.next-next');
const nextNarrow = document.querySelector('.next');
const numPage = document.querySelector('.page-num');
const firstPage = document.querySelector('.prev-prev');
const prevNarrow = document.querySelector('.prev');
let count = 1;

function namesMixer() {
  let nameArr = [
    'Jennifer',
    'Sophia',
    'Woody',
    'Scarlett',
    'Katrine',
    'Timmy',
    'Freddie',
    'Charly',
  ];
  return nameArr.sort(() => Math.random() - 0.5);
}
function combineName() {
  let newNameArr = namesMixer();
  let prevArr = [
    'Jennifer',
    'Sophia',
    'Woody',
    'Scarlett',
    'Katrine',
    'Timmy',
    'Freddie',
    'Charly',
  ];
  while (prevArr.length < 48) {
    if (newNameArr[0] != prevArr[prevArr.length - 1]) {
      let array = prevArr.concat(newNameArr);
      prevArr = array;
      newNameArr = namesMixer();
    } else {
      newNameArr = namesMixer();
    }
  }

  return prevArr;
}
let arr = combineName();

function cardsShow() {
  for (let pet of arr) {
    let elem = document.createElement('div');
    elem.classList.add('card');
    petsCards.appendChild(elem);
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
    elem.appendChild(imgCard);
    elem.appendChild(petName);
    elem.appendChild(cardBtn);
  }
  if (document.body.clientWidth >= 1280) {
    for (let i = 8; i < 48; i++) {
      petsCards.children[i].style.display = 'none';
    }
  } else if (document.body.clientWidth >= 768) {
    for (let i = 6; i < 48; i++) {
      petsCards.children[i].style.display = 'none';
    }
  } else {
    for (let i = 3; i < 48; i++) {
      petsCards.children[i].style.display = 'none';
    }
  }
}

cardsShow();

// function cardsRemove() {
//   while (petsCards.firstChild) {
//     petsCards.removeChild(petsCards.firstChild);
//   }
// }

function showLastCards() {
  for (let i = 0; i < 48; i++) {
    petsCards.children[i].style.display = 'none';
  }
  lastPage.setAttribute('disabled', 'disabled');
  nextNarrow.setAttribute('disabled', 'disabled');
  firstPage.removeAttribute('disabled', 'disabled');
  prevNarrow.removeAttribute('disabled', 'disabled');
  if (document.body.clientWidth >= 1280) {
    for (let i = 40; i < 48; i++) {
      petsCards.children[i].style.display = '';
      count = 6;
    }
    numPage.innerHTML = '6';
  } else if (document.body.clientWidth >= 768) {
    for (let i = 42; i < 48; i++) {
      petsCards.children[i].style.display = '';
    }
    count = 8;
    numPage.innerHTML = '8';
  } else {
    for (let i = 45; i <= 48; i++) {
      petsCards.children[i].style.display = '';
    }
    count = 16;
    numPage.innerHTML = '16';
  }
}
function showFirstCards() {
  count = 1;
  for (let i = 0; i < 48; i++) {
    petsCards.children[i].style.display = 'none';
  }

  lastPage.removeAttribute('disabled', 'disabled');
  nextNarrow.removeAttribute('disabled', 'disabled');
  firstPage.setAttribute('disabled', 'disabled');
  prevNarrow.setAttribute('disabled', 'disabled');
  numPage.innerHTML = '1';
  if (document.body.clientWidth >= 1280) {
    for (let i = 0; i < 8; i++) {
      petsCards.children[i].style.display = '';
    }
  } else if (document.body.clientWidth >= 768) {
    for (let i = 0; i < 6; i++) {
      petsCards.children[i].style.display = '';
    }
  } else {
    for (let i = 0; i < 3; i++) {
      petsCards.children[i].style.display = '';
    }
  }
}

function showNextCards() {
  firstPage.removeAttribute('disabled', 'disabled');
  prevNarrow.removeAttribute('disabled', 'disabled');
  let index;
  for (let i = 47; i > 0; i--) {
    if (petsCards.children[i].style.display === '') {
      index = i + 1;
      break;
    }
  }
  for (let i = 0; i < 48; i++) {
    petsCards.children[i].style.display = 'none';
  }
  if (document.body.clientWidth >= 1280) {
    for (let i = index; i < index + 8; i++) {
      petsCards.children[i].style.display = '';
      //console.log(index);
    }
    if (index >= 40) {
      lastPage.setAttribute('disabled', 'disabled');
      nextNarrow.setAttribute('disabled', 'disabled');
    }
  } else if (document.body.clientWidth >= 768) {
    for (let i = index; i < index + 6; i++) {
      petsCards.children[i].style.display = '';
      console.log(index);
    }
    if (index >= 42) {
      lastPage.setAttribute('disabled', 'disabled');
      nextNarrow.setAttribute('disabled', 'disabled');
    }
  } else {
    for (let i = index; i < index + 3; i++) {
      petsCards.children[i].style.display = '';
    }
    if (index >= 45) {
      lastPage.setAttribute('disabled', 'disabled');
      nextNarrow.setAttribute('disabled', 'disabled');
    }
  }
  count++;
  numPage.innerHTML = count;
}
function showPrevCards() {
  lastPage.removeAttribute('disabled', 'disabled');
  nextNarrow.removeAttribute('disabled', 'disabled');
  let index;

  for (let i = 0; i < 48; i++) {
    if (petsCards.children[i].style.display === '') {
      index = i - 1;
      console.log(index);
      break;
    }
  }
  for (let i = 0; i < 48; i++) {
    petsCards.children[i].style.display = 'none';
  }
  if (document.body.clientWidth >= 1280) {
    for (let i = index; i > index - 8; i--) {
      petsCards.children[i].style.display = '';
      console.log(index);
    }
    if (index == 7) {
      firstPage.setAttribute('disabled', 'disabled');
      prevNarrow.setAttribute('disabled', 'disabled');
    }
  } else if (document.body.clientWidth >= 768) {
    for (let i = index; i > index - 6; i--) {
      petsCards.children[i].style.display = '';
      console.log(index);
    }
    if (index == 5) {
      firstPage.setAttribute('disabled', 'disabled');
      prevNarrow.setAttribute('disabled', 'disabled');
    }
  } else {
    for (let i = index; i > index - 3; i--) {
      petsCards.children[i].style.display = '';
    }
    if (index == 2) {
      firstPage.setAttribute('disabled', 'disabled');
      prevNarrow.setAttribute('disabled', 'disabled');
    }
  }
  count--;
  numPage.innerHTML = count;
}

lastPage.addEventListener('click', showLastCards);
firstPage.addEventListener('click', showFirstCards);
nextNarrow.addEventListener('click', showNextCards);
prevNarrow.addEventListener('click', showPrevCards);

// function showCorrectNumberOfCards() {
//   for (let pet of petsCards.children) {
//     pet.style.display = '';
//   }

//   if (document.body.clientWidth >= 1280) {
//     numPage.innerHTML = '6';
//   } else if (document.body.clientWidth >= 768) {
//     for (let i = 0; i < 2; i++) {
//       petsCards.children[i].style.display = 'none';
//     }
//     numPage.innerHTML = '8';
//   } else {
//     for (let i = 0; i < 5; i++) {
//       petsCards.children[i].style.display = 'none';
//     }
//     numPage.innerHTML = '16';
//   }
// }
// window.addEventListener('click', showCorrectNumberOfCards);
