// Получение данных от API from pets.json
const petType = document.querySelector('.pet-type');
const card = document.querySelector('.card');
const modalPic = document.querySelector('.modal-pic');
const slider = document.querySelector('.slider');
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
      }
    }
    document.getElementById(e).textContent = data[nameIndex][e];
  });
}

slider.addEventListener('click', fillOutTheCard);
slider.addEventListener('click', getQuotes);

//close modal-window
span.addEventListener('click', function () {
  modal.style.display = 'none';
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
