import 'normalize.css';
import './style.css';
import { showFirstCards } from './components/view/pagination';
// import { cardsDraw } from './components/controller/cardsDraw';
import { basketStatus } from './components/controller/basket';
import './components/controller/sort';
import './components/controller/filter';

// import photo1 from './assets/images/1.jpg';
// import photo2 from './assets/images/2.jpg';

// cardsDraw();

basketStatus();
showFirstCards();

//------------------------------

// const img = document.getElementById('img') as HTMLElement;

// const pic = new Image();
// pic.src = photo as HTMLImageElement;
// console.log(pic);

// img.appendChild(pic);

// const div = document.querySelector('div') as HTMLDivElement;

// let i = 1;
// function picChange() {
//     if (i === 1) {
//         i++;
//         div.style.background = `url('${photo2 as '*.jpg'}')`;
//     } else {
//         i--;
//         div.style.background = `url('${photo1 as '*.jpg'}')`;
//     }
//     div.style.backgroundSize = 'cover';
//     div.style.backgroundRepeat = 'no-repeat';
// }

// const btn = document.querySelector('.btn') as Element;

// btn.addEventListener('click', picChange);
