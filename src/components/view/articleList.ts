import store from '../../assets/store.json';
import { RootObject } from '../types/types';

const data = store as RootObject;

let arrForGive: string[] = Object.keys(data);
export function setArr(articles: string[]) {
    arrForGive = articles;
    // // const arrCondition: string[];
    // const cards = document.querySelector('.cards') as HTMLElement;
    // for (let i = 0; i < cards.children.length; i++) {
    //     const elem1 = cards.children[i] as HTMLElement;
    //     const style = window.getComputedStyle(elem1, null);
    //     console.log(style.display);
    //     // arrCondition.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
    // }
}

export function containArr() {
    return arrForGive;
}
