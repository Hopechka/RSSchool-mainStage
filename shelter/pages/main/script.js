const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');

let left = 0;
function slideRight() {
  left = left - 360;
  if (left < -1800) {
    left = 0;
  }
  slider.style.left = left + 'px';
}
function slideLeft() {
  left = left + 360;
  if (left > 0) {
    left = -1800;
  }
  slider.style.left = left + 'px';
}

prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);
