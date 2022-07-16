import { getArr, showFirstCards } from '../view/pagination';
import { setArr, containArr } from '../view/articleList';
import store from '../../assets/store.json';
import { RootObject } from '../types/types';

const searchTerm = document.querySelector('.search-term') as HTMLInputElement;
const searchButton = document.querySelector('.search-button');
export function getValue() {
    filterAll(searchTerm.value);
}

searchTerm.addEventListener('input', getValue);

function clearSearchForm() {
    searchTerm.value = '';
    searchTerm.focus();
    const cards = document.querySelector('#cards') as HTMLElement;
    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
    }

    getArr(articles);
    setArr(articles);

    showFirstCards();
}

searchButton?.addEventListener('click', clearSearchForm);

let valForCheck = '';

function filterAll(value: string) {
    const arrContain = value.length > valForCheck.length ? containArr() : Object.keys(store);
    value.toLowerCase();
    valForCheck = value;

    console.log('arrContain: ', arrContain);
    const articles: string[] = arrContain.filter((item) => {
        return (store as RootObject)[item].name.toLowerCase().includes(value);
    });
    const modal = document.getElementById('modal') as HTMLDivElement;
    if (articles.length === 0) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
    getArr(articles);
    setArr(articles);
    showFirstCards();
}
