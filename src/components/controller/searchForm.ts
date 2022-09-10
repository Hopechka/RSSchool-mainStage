import { setFilters } from '../view/articleList';
import store from '../../assets/store.json';
import { RootObject } from '../types/types';

const searchTerm = document.querySelector('.search-term') as HTMLInputElement;
const searchButton = document.querySelector('.search-button');

const searchValue = '';
export function getStorage() {
    const searchValueLocalStorage = localStorage.getItem('searchValue') as string;
    if (searchValueLocalStorage) {
        if (searchValue != searchValueLocalStorage) {
            searchTerm.value = searchValueLocalStorage;
            filterAll(searchValueLocalStorage);
        } else {
            getValue();
        }
    } else {
        filterAll(searchValue);
    }
}

export function getValue() {
    // filterAll(searchTerm.value);
    setStorage(searchTerm.value);
}

searchTerm.addEventListener('input', getValue);

function clearSearchForm() {
    searchTerm.value = '';
    searchTerm.focus();
    setStorage(searchTerm.value);
    const cards = document.querySelector('#cards') as HTMLElement;
    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
    }

    setFilters(['searchForm', articles]);
}

searchButton?.addEventListener('click', clearSearchForm);

function filterAll(value: string) {
    const arrContain = Object.keys(store);
    value.toLowerCase();

    const articles: string[] = arrContain.filter((item) => {
        return (
            (store as RootObject)[item].name.toLowerCase().includes(value) ||
            (store as RootObject)[item].brand.toLowerCase().includes(value)
        );
    });
    // console.log('articles search form: ', articles);

    setFilters(['searchForm', articles]);
}

function setStorage(value: string) {
    localStorage.setItem('searchValue', value);
    filterAll(value);
}

const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;
SettingResetBtn.addEventListener('click', clearSearchForm);
