import { CartObj } from '../types/types';

let count = 0;
let cart: CartObj = {};

function getStorage() {
    const cartLocalStorage: string | null = localStorage.getItem('cart');
    if (cartLocalStorage) {
        cart = JSON.parse(cartLocalStorage) as CartObj;

        for (const key of Object.values(cart)) {
            count += key;
        }
    } else {
        cart = {};
        count = 0;
    }
    fillBasket();
}

export function basketStatus() {
    getStorage();
    for (const art in cart) {
        if (cart[art] && cart[art] > 0) {
            const card = document.querySelector(`[data-art="${art}"]`);
            const activeCard = (card as HTMLDivElement).querySelector('.card-add');
            (activeCard as HTMLDivElement).classList.add('active');
        }
    }

    (document.querySelector('#cards') as HTMLElement).addEventListener('click', changeStatus);
}

function changeStatus(event: Event) {
    const target = (event.target as HTMLDivElement).closest('.card');
    const article = (target as HTMLDivElement).getAttribute('data-art') as string;
    const activeCard = (target as HTMLDivElement).querySelector('.card-add');
    (activeCard as HTMLDivElement).classList.toggle('active');
    if ((activeCard as HTMLDivElement).classList.contains('active')) {
        count++;
        cart[article] = 1;
        // cart[article] !== undefined ? cart[article]++ : (cart[article] = 1);
    } else {
        count--;
        cart[article]--;
    }
    fillBasket();
}

function fillBasket() {
    const basketInside = document.querySelector('.count span') as HTMLElement;
    basketInside.textContent = count.toString();
    setStorage();
}
function setStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
