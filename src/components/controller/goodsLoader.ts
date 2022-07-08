import { RootObject } from '../types/types';
import store from '../../assets/store.json';

// const store = require('../../assets/store.json');

// import photo1 from '../../assets/images/1.png';
// import images from '../../assets/images';

export function goodsLoader() {
    // console.log(images);
    // console.log(store[1].name);
    // console.log(photo1 as '*.png');
    const cards = document.getElementById('cards') as HTMLElement;
    const fragment = document.createDocumentFragment();
    const card = <HTMLTemplateElement>document.querySelector('#card');
    for (const key in store) {
        const cardClone = card.content.cloneNode(true) as HTMLElement;
        (cardClone.querySelector('.card-name') as HTMLElement).textContent = (store as RootObject)[key].name;
        (cardClone.querySelector('.card-pic') as HTMLElement).style.backgroundImage = `url(${
            (store as RootObject)[key].image
        })`;
        (cardClone.querySelector('.card-price') as HTMLElement).textContent = `Цена: $${
            (store as RootObject)[key].price
        }`;
        (cardClone.querySelector('.card-amount') as HTMLElement).textContent = `Количество: 2`;
        (cardClone.querySelector('.card-factory') as HTMLElement).textContent = `Производитель: ${
            (store as RootObject)[key].manufacturer
        }`;
        (cardClone.querySelector('.card-year') as HTMLElement).textContent = `Год выпуска: ${
            (store as RootObject)[key].year
        }`;
        (cardClone.querySelector('.card-color') as HTMLElement).textContent = `Цвет: ${
            (store as RootObject)[key].color
        }`;
        (cardClone.querySelector('.card-material') as HTMLElement).textContent = `Материал: ${
            (store as RootObject)[key].material
        }`;
        fragment.append(cardClone);
    }
    cards.appendChild(fragment);
}
