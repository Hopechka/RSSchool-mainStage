import store from '../../assets/store.json';

let articleList: string[] = Object.keys(store);

export function getArr(arr: string[] = Object.keys(store)) {
    return (articleList = arr);
}

// console.log('articleList before: ', articleList);

const lastPage = document.querySelector('.next-next') as HTMLButtonElement;
const nextNarrow = document.querySelector('.next') as HTMLButtonElement;
const numPage = document.querySelector('.page-num') as HTMLButtonElement;
const firstPage = document.querySelector('.prev-prev') as HTMLButtonElement;
const prevNarrow = document.querySelector('.prev') as HTMLButtonElement;
const cards = document.querySelector('.cards') as HTMLElement;
const LastGoodNumber = Object.keys(store).length;
// console.log('LastGoodNumber before: ', LastGoodNumber);

let index: number;
if (document.body.clientWidth > 900) {
    index = 6;
} else if (document.body.clientWidth >= 475) {
    index = 4;
} else {
    index = 2;
}

let count = 1;

export function showFirstCards(): void {
    count = 1;

    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }

    firstPage.setAttribute('disabled', 'disabled');
    prevNarrow.setAttribute('disabled', 'disabled');
    if (articleList.length <= index) {
        lastPage.setAttribute('disabled', 'disabled');
        nextNarrow.setAttribute('disabled', 'disabled');
    } else {
        lastPage.removeAttribute('disabled');
        nextNarrow.removeAttribute('disabled');
    }

    numPage.innerHTML = '1';

    // console.log('articleList first: ', articleList);
    for (let i = 0; i < index; i++) {
        for (let j = 0; j < LastGoodNumber; j++) {
            if (articleList[i] === (cards.children[j] as HTMLElement).getAttribute('data-art')) {
                (cards.children[j] as HTMLElement).style.display = '';
            }
        }
    }
}

function showLastCards(): void {
    // console.log('arr in last: ', arr);
    // console.log('articleList in last: ', articleList);
    // console.log('LastGoodNumber in last: ', LastGoodNumber);
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }
    lastPage.setAttribute('disabled', 'disabled');
    nextNarrow.setAttribute('disabled', 'disabled');
    firstPage.removeAttribute('disabled');
    prevNarrow.removeAttribute('disabled');

    // console.log('arr.length: ', arr.length);
    // console.log('arr.length % index: ', arr.length % index);
    // console.log('arr.length - index: ', arr.length - index);
    const indexLast: number =
        articleList.length % index === 0
            ? articleList.length - index
            : articleList.length - (articleList.length % index);
    // console.log('indexLast: ', indexLast);
    for (let i = indexLast; i < articleList.length; i++) {
        for (let j = 0; j < LastGoodNumber; j++) {
            if (articleList[i] === (cards.children[j] as HTMLElement).getAttribute('data-art')) {
                (cards.children[j] as HTMLElement).style.display = '';
            }
        }
    }

    count = Math.ceil(articleList.length / index);
    numPage.innerHTML = count.toString();
}

function showNextCards(): void {
    // console.log('articleList in next: ', articleList);
    firstPage.removeAttribute('disabled');
    prevNarrow.removeAttribute('disabled');

    let step = 0;
    let arrStep = 0;

    for (let i = LastGoodNumber - 1; i > 0; i--) {
        if ((cards.children[i] as HTMLElement).style.display === '') {
            step = i + 1;
            const art = (cards.children[i] as HTMLElement).getAttribute('data-art');
            arrStep = articleList.findIndex((item) => item === art);
            break;
        }
    }
    // console.log('arr in next: ', arr);
    // console.log('arrStep: ', arrStep);
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }
    const nextIndex = arrStep + index >= articleList.length ? articleList.length : arrStep + index;

    for (let i = arrStep; i < nextIndex + 1; i++) {
        for (let j = step; j < LastGoodNumber; j++) {
            if (articleList[i] === (cards.children[j] as HTMLElement).getAttribute('data-art')) {
                (cards.children[j] as HTMLElement).style.display = '';
            }
        }
    }
    if (arrStep >= articleList.length - index) {
        lastPage.setAttribute('disabled', 'disabled');
        nextNarrow.setAttribute('disabled', 'disabled');
    }

    count++;
    numPage.innerHTML = count.toString();
}

function showPrevCards(): void {
    lastPage.removeAttribute('disabled');
    nextNarrow.removeAttribute('disabled');
    let step = 0;
    let arrStep = 0;

    for (let i = 0; i < LastGoodNumber; i++) {
        if ((cards.children[i] as HTMLElement).style.display === '') {
            step = i - 1;
            const art = (cards.children[i] as HTMLElement).getAttribute('data-art');
            // console.log(art);
            arrStep = articleList.findIndex((item) => item === art);
            break;
        }
    }
    // console.log('step: ', step);
    // console.log('arrStep: ', arrStep);
    // console.log('articleList: ', articleList);
    // console.log('arrStep - index: ', arrStep - index);
    for (let i = 0; i < LastGoodNumber; i++) {
        (cards.children[i] as HTMLElement).style.display = 'none';
    }

    for (let i = arrStep; i >= arrStep - index; i--) {
        for (let j = 0; j < step + 1; j++) {
            if (articleList[i] === (cards.children[j] as HTMLElement).getAttribute('data-art')) {
                (cards.children[j] as HTMLElement).style.display = '';
            }
        }
    }

    if (arrStep <= index) {
        firstPage.setAttribute('disabled', 'disabled');
        prevNarrow.setAttribute('disabled', 'disabled');
    }

    count--;
    numPage.innerHTML = count.toString();
}

lastPage.addEventListener('click', showLastCards);
firstPage.addEventListener('click', showFirstCards);
nextNarrow.addEventListener('click', showNextCards);
prevNarrow.addEventListener('click', showPrevCards);
