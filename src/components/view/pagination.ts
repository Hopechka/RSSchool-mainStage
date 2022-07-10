import { cardsDraw } from '../controller/cardsDraw';
import store from '../../assets/store.json';
cardsDraw();
const lastPage = document.querySelector('.next-next') as HTMLButtonElement;
const nextNarrow = document.querySelector('.next') as HTMLButtonElement;
const numPage = document.querySelector('.page-num') as HTMLButtonElement;
const firstPage = document.querySelector('.prev-prev') as HTMLButtonElement;
const prevNarrow = document.querySelector('.prev') as HTMLButtonElement;
const cards = document.querySelector('.cards') as HTMLElement;
const goodsArts: string[] = Object.keys(store);
const LastGoodNumber = Number(goodsArts[goodsArts.length - 1]);
let index: number;
if (document.body.clientWidth > 768) {
    index = 6;
} else if (document.body.clientWidth >= 321) {
    index = 3;
} else {
    index = 2;
}

let count = 1;

export function cardsShow(): void {
    for (let i = index; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }
}

function showLastCards(): void {
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }
    lastPage.setAttribute('disabled', 'disabled');
    nextNarrow.setAttribute('disabled', 'disabled');
    firstPage.removeAttribute('disabled');
    prevNarrow.removeAttribute('disabled');
    const indexLast: number =
        LastGoodNumber % index === 0 ? LastGoodNumber - index : LastGoodNumber - (LastGoodNumber % index);

    for (let i = indexLast; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = '';
    }
    count = Math.ceil(LastGoodNumber / index);
    numPage.innerHTML = count.toString();
}

function showFirstCards(): void {
    count = 1;
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }

    lastPage.removeAttribute('disabled');
    nextNarrow.removeAttribute('disabled');
    firstPage.setAttribute('disabled', 'disabled');
    prevNarrow.setAttribute('disabled', 'disabled');
    numPage.innerHTML = '1';

    for (let i = 0; i < index; i++) {
        (cards.children[i] as HTMLElement).style.display = '';
    }
}

function showNextCards(): void {
    firstPage.removeAttribute('disabled');
    prevNarrow.removeAttribute('disabled');
    let step = 0;

    for (let i = LastGoodNumber - 1; i > 0; i--) {
        if ((cards.children[i] as HTMLElement).style.display === '') {
            step = i + 1;
            break;
        }
    }
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }
    const nextIndex = step + index >= LastGoodNumber ? LastGoodNumber : step + index;

    for (let i = step; i < nextIndex; i++) {
        (cards.children[i] as HTMLElement).style.display = '';

        if (step >= LastGoodNumber - index) {
            lastPage.setAttribute('disabled', 'disabled');
            nextNarrow.setAttribute('disabled', 'disabled');
        }
    }

    count++;
    numPage.innerHTML = count.toString();
}

function showPrevCards(): void {
    lastPage.removeAttribute('disabled');
    nextNarrow.removeAttribute('disabled');
    let step = 0;

    for (let i = 0; i < LastGoodNumber; i++) {
        if ((cards.children[i] as HTMLElement).style.display === '') {
            step = i - 1;
            break;
        }
    }
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }

    for (let i = step; i > step - index; i--) {
        (cards.children[i] as HTMLElement).style.display = '';

        if (step < index) {
            firstPage.setAttribute('disabled', 'disabled');
            prevNarrow.setAttribute('disabled', 'disabled');
        }
    }

    count--;
    numPage.innerHTML = count.toString();
}

lastPage.addEventListener('click', showLastCards);
firstPage.addEventListener('click', showFirstCards);
nextNarrow.addEventListener('click', showNextCards);
prevNarrow.addEventListener('click', showPrevCards);

// document.addEventListener('keydown', (e) => {
//     e.preventDefault();
//     if (e.key == 'ArrowRight') {
//         showNextCards();
//     } else if (e.key == 'ArrowLeft') {
//         showPrevCards();
//     }
// });
