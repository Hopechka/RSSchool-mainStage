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
    const target = (event.target as HTMLDivElement).closest('.card') as HTMLDivElement;
    const article = target.getAttribute('data-art') as string;
    const activeCard = target.querySelector('.card-add') as HTMLDivElement;
    if (count < 5) {
        activeCard.classList.toggle('active');
        if (activeCard.classList.contains('active')) {
            count++;
            cart[article] = 1;
            // cart[article] !== undefined ? cart[article]++ : (cart[article] = 1);
        } else {
            count--;
            cart[article]--;
        }
    } else {
        if (activeCard.classList.contains('active')) {
            activeCard.classList.remove('active');
            count--;
            cart[article]--;
        } else {
            const wrapper = target.querySelector('.wrapper') as HTMLElement;
            wrapper.classList.add('cart-full');
            setTimeout(() => {
                wrapper.classList.remove('cart-full');
            }, 1500);
        }
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
