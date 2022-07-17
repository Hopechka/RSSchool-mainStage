import 'normalize.css';
import './style.css';
import { showFirstCards } from './components/view/pagination';
import store from './assets/store.json';
import { RootObject } from './components/types/types';
import { cardsDraw } from './components/controller/cardsDraw';
import { basketStatus } from './components/controller/basket';
import './components/controller/sort';
import './components/controller/filterSlider';
import './components/controller/filterSelect';

import { getStorage } from './components/controller/searchForm';
import { getStorageSelect } from './components/controller/filterSelect';
import { getStorageSlider } from './components/controller/filterSlider';
import { getStorageSort } from './components/controller/sort';

const data = store as RootObject;
cardsDraw(data);

basketStatus();
showFirstCards();
getStorage();
getStorageSlider();
getStorageSelect();
getStorageSort();
