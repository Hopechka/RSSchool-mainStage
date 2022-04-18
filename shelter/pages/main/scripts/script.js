//Slider
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');
//---------------------------------//
let cardsChange = document.querySelector('.cards-change').offsetWidth * 2;
const cards = document.querySelectorAll('.card');
let cardsArray = [];
for (let i = 0; i < cards.length; i++) {
  cardsArray[i] = cards[i];
  cards[i].remove();
}

let step = 0;
let offset;
let visibleCards = 6;

offset = 0;
function draw() {
  cardsArray[step].style.left = (offset / visibleCards) * cardsChange + 'px';
  slider.appendChild(cardsArray[step]);
  if (step + 1 == cardsArray.length) {
    step = 0;
  } else {
    step++;
  }
  offset++;
}
draw();
draw();
draw();
draw();
draw();
draw();

function left() {
  prevBtn.removeEventListener('click', left);
  let cards2 = document.querySelectorAll('.card');
  console.log(cards2);
  for (let i = 0; i < cards2.length; i++) {
    cards2[i].style.left =
      parseInt(cards2[i].style.left, 10) - cardsChange / 2 + 'px';
  }
  setTimeout(function () {
    for (let i = 0; i < cards2.length; i++) {
      if (parseInt(cards2[i].style.left, 10) < 0) {
        cards2[i].remove();
      }
    }
    offset = visibleCards / 2;
    draw();
    draw();
    draw();

    prevBtn.addEventListener('click', left);
  }, 1000);
}
prevBtn.addEventListener('click', left);

// offset = 3;
// function drawNegative() {
//   cardsArray[step].style.left = -(offset / visibleCards) * cardsChange + 'px';
//   slider.appendChild(cardsArray[step]);
//   if (step + 1 == cardsArray.length) {
//     step = 0;
//   } else {
//     step++;
//   }
//   offset--;
// }

function drawBeforeNode() {
  cardsArray[step].style.left = (offset / visibleCards) * cardsChange + 'px';
  slider.prepend(cardsArray[step]);
  if (step + 1 == cardsArray.length) {
    step = 0;
  } else {
    step++;
  }
  offset--;
  console.log(offset);
}

function right() {
  //   drawNegative();
  //   drawNegative();
  //   drawNegative();
  nextBtn.removeEventListener('click', right);
  let cards2 = document.querySelectorAll('.card');
  console.log(cards2);
  for (let i = 0; i < cards2.length; i++) {
    cards2[i].style.left =
      parseInt(cards2[i].style.left, 10) + cardsChange / 2 + 'px';
  }

  setTimeout(function () {
    offset = 2;
    drawBeforeNode();
    drawBeforeNode();
    drawBeforeNode();
    for (let i = 0; i < cards2.length; i++) {
      if (parseInt(cards2[i].style.left, 10) >= 1980) {
        cards2[i].remove();
      }
    }
    nextBtn.addEventListener('click', right);
  }, 1000);
}
nextBtn.addEventListener('click', right);

//---------------------------------//
// let left = 0;

// function slideRight() {
//   left = left - 360;
//   prevBtn.disabled = false;
//   if (left < -1440) {
//     nextBtn.disabled = true;
//   }
//   slider.style.left = left + 'px';
// }

// function slideLeft() {
//   left = left + 360;
//   nextBtn.disabled = false;
//   if (left > 0) {
//     left = 0;
//     prevBtn.disabled = true;
//   }
//   slider.style.left = left + 'px';
// }

// prevBtn.addEventListener('click', slideLeft);
// nextBtn.addEventListener('click', slideRight);

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
