//Slider
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');

let left = 0;

function slideRight() {
  left = left - 360;
  prevBtn.disabled = false;
  if (left < -1440) {
    nextBtn.disabled = true;
  }
  slider.style.left = left + 'px';
}

function slideLeft() {
  left = left + 360;
  nextBtn.disabled = false;
  if (left > 0) {
    left = 0;
    prevBtn.disabled = true;
  }
  slider.style.left = left + 'px';
}

prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);

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
