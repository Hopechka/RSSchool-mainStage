import store from '../../assets/store.json';
import { RootObject } from '../types/types';
import { cardsDraw } from '../controller/cardsDraw';
import { containArr } from '../view/articleList';
import { getArr, showFirstCards } from '../view/pagination';

const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
sortSelect.addEventListener('click', function () {
    const options = sortSelect.querySelectorAll('option');
    const count: number = options.length;
    if (typeof count === 'undefined' || count < 2) {
        console.log('nothing sort');
    }
});

sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-name-up') {
        sortUp('data-name');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-name-down') {
        sortDown('data-name');
    }
});

sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-up') {
        sortUp('data-year');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-down') {
        sortDown('data-year');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-factory-up') {
        sortUp('data-factory');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-factory-down') {
        sortDown('data-factory');
    }
});

const cards = document.querySelector('#cards') as HTMLElement;

function sortUp(sortType: string) {
    for (let i = 0; i < cards.children.length; i++) {
        for (let j = i; j < cards.children.length; j++) {
            if (
                (cards.children[i] as HTMLElement).getAttribute(sortType)! >
                (cards.children[j] as HTMLElement).getAttribute(sortType)!
            ) {
                (cards.children[j] as HTMLElement).style.display = '';
                const replaceNode = cards.replaceChild(cards.children[j], cards.children[i]);
                cards.children[i].after(replaceNode);
            }
        }
    }
    showCards();
}

function sortDown(sortType: string) {
    for (let i = 0; i < cards.children.length; i++) {
        for (let j = i; j < cards.children.length; j++) {
            if (
                (cards.children[i] as HTMLElement).getAttribute(sortType)! <
                (cards.children[j] as HTMLElement).getAttribute(sortType)!
            ) {
                (cards.children[j] as HTMLElement).style.display = '';
                const replaceNode = cards.replaceChild(cards.children[j], cards.children[i]);
                cards.children[i].after(replaceNode);
            }
        }
    }
    showCards();
}

function showCards() {
    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
    }
    const arrContain = containArr();
    if (arrContain.length < articles.length) {
        getArr(arrContain);
    } else {
        getArr(articles);
    }

    showFirstCards();
}

const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;

function resetSettings() {
    const data = store as RootObject;
    cardsDraw(data);
    sortSelect.options[0].selected = true;
}

SettingResetBtn.addEventListener('click', resetSettings);
