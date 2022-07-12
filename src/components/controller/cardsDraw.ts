import { RootObject } from '../types/types';
// import store from '../../assets/store.json';

// const store = require('../../assets/store.json');

// import photo1 from '../../assets/images/1.png';
// import images from '../../assets/images';

export function cardsDraw(data: RootObject): void {
    // console.log(images);
    // console.log(store[1].name);
    // console.log(photo1 as '*.png');
    const cards = document.getElementById('cards') as HTMLElement;
    const fragment = document.createDocumentFragment();
    const card = <HTMLTemplateElement>document.querySelector('#card');
    for (const key in data) {
        const cardClone = card.content.cloneNode(true) as HTMLElement;
        (cardClone.querySelector('.card') as HTMLElement).setAttribute('data-art', key);
        (cardClone.querySelector('.card') as HTMLElement).setAttribute('data-name', data[key].name);
        (cardClone.querySelector('.card') as HTMLElement).setAttribute('data-fabric', data[key].manufacturer);
        (cardClone.querySelector('.card') as HTMLElement).setAttribute('data-year', data[key].year.toString());
        (cardClone.querySelector('.card') as HTMLElement).setAttribute('data-quantity', data[key].quantity.toString());
        (cardClone.querySelector('.card-name') as HTMLElement).textContent = data[key].brand + '  ' + data[key].name;
        (cardClone.querySelector('.card-pic') as HTMLElement).style.backgroundImage = `url(${data[key].image})`;
        (cardClone.querySelector('.card-price') as HTMLElement).textContent = `Цена: $${data[key].price}`;
        (cardClone.querySelector('.card-amount') as HTMLElement).textContent = `Количество: ${data[key].quantity}`;
        (cardClone.querySelector(
            '.card-factory'
        ) as HTMLElement).textContent = `Производитель: ${data[key].manufacturer}`;
        (cardClone.querySelector('.card-year') as HTMLElement).textContent = `Год выпуска: ${data[key].year}`;
        (cardClone.querySelector('.card-color') as HTMLElement).textContent = `Цвет: ${data[key].color}`;
        (cardClone.querySelector('.card-material') as HTMLElement).textContent = `Материал: ${data[key].material}`;
        fragment.append(cardClone);
    }
    cards.innerHTML = '';
    cards.appendChild(fragment);
}
