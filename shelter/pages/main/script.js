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
