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
