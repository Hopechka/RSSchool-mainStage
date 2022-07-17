import * as noUiSlider from 'nouislider';
import '../../../node_modules/nouislider/dist/nouislider.css';
import store from '../../assets/store.json';
import { RootObject } from '../types/types';
import { setFilters } from '../view/articleList';

const cards = document.querySelector('#cards') as HTMLElement;
const year: number[] = [];
const quantity: number[] = [];
for (const key in store) {
    year.push((store as RootObject)[key].year);
    quantity.push((store as RootObject)[key].quantity);
}

const minYear = Math.min(...year);
const maxYear = Math.max(...year);
const minQuantity = Math.min(...quantity);
const maxQuantity = Math.max(...quantity);

let YearValue: (number | string)[] = [minYear, maxYear];
let QuantityValue: (number | string)[] = [minQuantity, maxQuantity];
export function getStorageSlider() {
    const YearValueStorage = localStorage.getItem('YearValue') as string;
    const QuantityValueStorage = localStorage.getItem('QuantityValue') as string;
    if (YearValueStorage) {
        YearValue = JSON.parse(YearValueStorage) as [];
        getYear(YearValue);
        sliderYear.noUiSlider?.set(YearValue);
    }
    if (QuantityValueStorage) {
        QuantityValue = JSON.parse(QuantityValueStorage) as [];
        getQuantity(QuantityValue);
        sliderQuantity.noUiSlider?.set(QuantityValue);
    }
}

//Текст под слайдером
const years = document.querySelector('.years') as HTMLDivElement;
years.innerHTML = `<span>${minYear} - ${maxYear}</span>`;
const quantityText = document.querySelector('.quantity-text') as HTMLDivElement;
quantityText.innerHTML = `<span>${minQuantity} - ${maxQuantity}</span>`;

//Слайдер по годам
const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;

noUiSlider.create(sliderYear, {
    start: YearValue,
    connect: true,
    tooltips: true,
    step: 1,
    padding: 5,
    range: {
        min: minYear - 10,
        max: maxYear + 10,
    },
    format: {
        to: function (value) {
            return Math.trunc(value);
        },
        from: function (value) {
            return parseInt(value);
        },
    },
});

function getYear(values: (number | string)[]) {
    localStorageYear(values);
    const minValue = values[0];
    const maxValue = values[1];

    years.innerHTML = `<span>${minValue} - ${maxValue}</span>`;

    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        const dataAtr = (cards.children[i] as HTMLElement).getAttribute('data-year')!;
        if (+dataAtr >= minValue && +dataAtr < maxValue) {
            articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
            (cards.children[i] as HTMLElement).style.display = '';
        } else {
            (cards.children[i] as HTMLElement).style.display = 'none';
        }
    }
    // for (const key in store) {
    //     if ((store as RootObject)[key].year > minValue && (store as RootObject)[key].year <= maxValue) {
    //         console.log('minValue:', minValue);
    //         console.log('maxValue:', maxValue);
    //         console.log('store as RootObject)[key].year:', (store as RootObject)[key].year);
    //         data[key] = (store as RootObject)[key];
    //     }
    // }

    setFilters(['sliderFilterByYear', articles]);
}

sliderYear.noUiSlider?.on('change', getYear);

//Слайдер по количеству
const sliderQuantity: noUiSlider.target = document.getElementById('slider-quantity') as noUiSlider.target;

noUiSlider.create(sliderQuantity, {
    start: QuantityValue,
    connect: true,
    step: 1,
    tooltips: true,
    // padding: 5,
    range: {
        min: 0,
        max: maxQuantity + 1,
    },
    format: {
        to: function (value) {
            return Math.trunc(value);
        },
        from: function (value) {
            return parseInt(value);
        },
    },
});

function getQuantity(values: (number | string)[]) {
    localStorageQuantity(values);
    const minValue = values[0];
    const maxValue = values[1];
    quantityText.innerHTML = `<span>${minValue} - ${maxValue}</span>`;

    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        const dataAtr = (cards.children[i] as HTMLElement).getAttribute('data-quantity')!;
        if (+dataAtr >= minValue && +dataAtr <= maxValue) {
            articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
            (cards.children[i] as HTMLElement).style.display = '';
        } else {
            (cards.children[i] as HTMLElement).style.display = 'none';
        }
    }

    setFilters(['sliderFilterByQuantity', articles]);
    return articles;
}

sliderQuantity.noUiSlider?.on('change', getQuantity);

//сброс слайдера
const btnResetFilter = document.querySelector('.btn-reset-filter');
const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;

function suspendFilters() {
    sliderYear.noUiSlider?.reset();
    sliderQuantity.noUiSlider?.reset();
    years.innerHTML = `<span>${minYear} - ${maxYear}</span>`;
    quantityText.innerHTML = `<span>${minQuantity} - ${maxQuantity}</span>`;
    // getArr();
    // showFirstCards();
    YearValue = [minYear, maxYear];
    QuantityValue = [minQuantity, maxQuantity];
    localStorageQuantity(QuantityValue);
    localStorageYear(YearValue);
    const articles = Object.keys(store);
    setFilters(['sliderFilterByQuantity', articles]);
    setFilters(['sliderFilterByYear', articles]);
}

btnResetFilter?.addEventListener('click', suspendFilters);
SettingResetBtn.addEventListener('click', suspendFilters);

function localStorageYear(values: (number | string)[]) {
    return localStorage.setItem('YearValue', JSON.stringify(values));
}
function localStorageQuantity(values: (number | string)[]) {
    return localStorage.setItem('QuantityValue', JSON.stringify(values));
}
