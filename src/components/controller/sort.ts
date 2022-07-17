import store from '../../assets/store.json';
import { RootObject } from '../types/types';
import { cardsDraw } from '../controller/cardsDraw';
import { setFilters } from '../view/articleList';
import { getArr, showFirstCards } from '../view/pagination';

export function getStorageSort() {
    const sortMethod = localStorage.getItem('sortMethod') as string;
    const sortBy = localStorage.getItem('sortBy') as string;
    const sortSelectValue = localStorage.getItem('sortSelectValue') as string;
    if (sortMethod) {
        sortSelect.value = sortSelectValue;
        if (sortMethod === 'sortUp') {
            sortUp(sortBy);
        } else {
            sortDown(sortBy);
        }
    }
}

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
        setStorage(['sortUp', 'data-name', 'sort-name-up']);
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-name-down') {
        sortDown('data-name');
        setStorage(['sortDown', 'data-name', 'sort-year-name']);
    }
});

sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-up') {
        sortUp('data-year');
        setStorage(['sortUp', 'data-year', 'sort-year-up']);
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-down') {
        sortDown('data-year');
        setStorage(['sortDown', 'data-year', 'sort-year-down']);
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-factory-up') {
        sortUp('data-factory');
        setStorage(['sortUp', 'data-factory', 'sort-factory-up']);
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-factory-down') {
        sortDown('data-factory');
        setStorage(['sortDown', 'data-factory', 'sort-factory-down']);
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
    getArr(articles);
    showFirstCards();
    setFilters(['sortFilter', articles]);
}

const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;

function resetSettings() {
    const data = store as RootObject;
    cardsDraw(data);
    sortSelect.options[0].selected = true;
    setStorage(['', '', 'selected']);
}

SettingResetBtn.addEventListener('click', resetSettings);

function setStorage(sortValues: string[]) {
    localStorage.setItem('sortMethod', sortValues[0]);
    localStorage.setItem('sortBy', sortValues[1]);
    localStorage.setItem('sortSelectValue', sortValues[2]);
}
