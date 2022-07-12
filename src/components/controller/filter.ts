import * as noUiSlider from 'nouislider';
import '../../../node_modules/nouislider/dist/nouislider.css';
import store from '../../assets/store.json';
import { RootObject } from '../types/types';
import { getArr, showFirstCards } from '../view/pagination';
import { setArr, containArr } from '../view/articleList';

const year: number[] = [];
const quantity: number[] = [];
for (const key in store) {
    year.push((store as RootObject)[key].year);
    quantity.push((store as RootObject)[key].quantity);
}

const minYear = Math.min(...year);
const maxYear = Math.max(...year);
const maxQuantity = Math.max(...quantity);

const sliderYear: noUiSlider.target = document.getElementById('slider-year') as noUiSlider.target;

noUiSlider.create(sliderYear, {
    start: [minYear, maxYear],
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

const cards = document.querySelector('#cards') as HTMLElement;
function getYear(values: (number | string)[]) {
    const arrContain = containArr();
    console.log('arrContain: ', arrContain);

    const minValue = values[0];
    const maxValue = values[1];

    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        const dataAtr = (cards.children[i] as HTMLElement).getAttribute('data-year')!;
        if (+dataAtr > minValue && +dataAtr < maxValue) {
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
    getArr(arrContain.filter((item) => articles.includes(item)));
    setArr(articles);
    showFirstCards();
}

sliderYear.noUiSlider?.on('change', getYear);

const sliderQuantity: noUiSlider.target = document.getElementById('slider-quantity') as noUiSlider.target;

noUiSlider.create(sliderQuantity, {
    start: [1, maxQuantity],
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
    const arrContain = containArr();
    console.log('arrContain: ', arrContain);

    const minValue = values[0];
    const maxValue = values[1];

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
    getArr(arrContain.filter((item) => articles.includes(item)));
    setArr(articles);
    showFirstCards();
    return articles;
}

sliderQuantity.noUiSlider?.on('change', getQuantity);

const btnResetFilter = document.querySelector('.btn-reset-filter');

function suspendFilters() {
    sliderYear.noUiSlider?.reset();
    sliderQuantity.noUiSlider?.reset();
    getArr();
    showFirstCards();
}

btnResetFilter?.addEventListener('click', suspendFilters);
