import store from '../../assets/store.json';
import { CheckBoxType, FilteredData, RootObject, StoreInterface } from '../types/types';
import { getArr, showFirstCards } from '../view/pagination';
import { setArr, containArr } from '../view/articleList';

function showSelect(event: Event) {
    const selectElement = (event.target as Element).nextElementSibling as Element;
    if (selectElement.className === 'hidden') {
        selectElement.className = 'visible';
    } else {
        selectElement.className = 'hidden';
    }
}
const arrows = document.querySelectorAll('.arrow');
arrows.forEach((item) => {
    item.addEventListener('click', showSelect);
    (item.nextElementSibling as Element).addEventListener(
        'mouseleave',
        (event) => {
            if ((event.target as Element).tagName === 'FORM') {
                if (event.type === 'mouseleave') {
                    (event.target as Element).className = 'hidden';
                }
            }
        },
        false
    );
});

function insertOptions(id: string, prop: string) {
    const selectElement = document.getElementById(id) as HTMLFormElement;
    const listProps: string[] = [];
    for (const key in store) {
        listProps.push((store as RootObject)[key][prop] as string);
    }
    new Set(listProps).forEach((item) => {
        const label = document.createElement('label');
        label.innerHTML = `<input class="checkbox" type="checkbox" name=${prop} value=${item.split(' ').join('*')}>
        ${item}`;
        selectElement.append(label);
    });
}

insertOptions('filter-by-factory-select', 'factory');
insertOptions('filter-by-color-select', 'color');
insertOptions('filter-by-material-select', 'material');
insertOptions('filter-by-brand-select', 'brand');

const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((item) => {
    (item as HTMLInputElement).checked = false;
    item.addEventListener('change', filterCards);
});

function getCheckedCheckBoxes() {
    const checkboxesChecked: CheckBoxType = { factory: [], color: [], material: [], brand: [] };
    for (let index = 0; index < checkboxes.length; index++) {
        if ((checkboxes[index] as HTMLInputElement).checked) {
            checkboxesChecked[(checkboxes[index] as HTMLInputElement).name].push(
                (checkboxes[index] as HTMLInputElement).value.split('*').join(' ')
            );
        } else {
            const newArr = checkboxesChecked[(checkboxes[index] as HTMLInputElement).name].filter(
                (item) => item !== (checkboxes[index] as HTMLInputElement).value.split('*').join(' ')
            );
            checkboxesChecked[(checkboxes[index] as HTMLInputElement).name] = newArr;
        }
    }
    return checkboxesChecked;
}

const arrContain = containArr();
// console.log('arrContain for select: ', containArr());
let articles: string[] = [];

function filterCards() {
    const checkboxesChecked: CheckBoxType = getCheckedCheckBoxes();
    const filteredData: FilteredData = [];
    arrContain.forEach((item) => {
        for (const key in store) {
            if (item === key) {
                filteredData.push((store as RootObject)[key]);
            }
        }
    });

    const result = filterOut(filteredData, checkboxesChecked);
    console.log('RESULT: ', result);
    console.log('arrContain for select: ', containArr());

    result.forEach((item) => articles.push((item as StoreInterface).id.toString()));

    const modal = document.getElementById('modal') as HTMLDivElement;
    if (articles.length === 0) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }

    setArr(articles);
    getArr(articles);
    showFirstCards();

    articles = [];
}

function filterOut(arr: FilteredData, filterObj: CheckBoxType) {
    return arr.filter((item) => {
        for (const field in filterObj) {
            if (filterObj[field].length != 0) {
                const val = (item as StoreInterface)[field].toString();
                if (val) {
                    if (filterObj[field].indexOf(val) < 0) return false;
                }
            }
        }
        return true;
    });
}

const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;
const btnResetFilter = document.querySelector('.btn-reset-filter') as HTMLButtonElement;

function resetSettings() {
    checkboxes.forEach((item) => {
        (item as HTMLInputElement).checked = false;
    });
    filterCards();
    const cards = document.querySelector('#cards') as HTMLElement;
    const articles: string[] = [];
    for (let i = 0; i < cards.children.length; i++) {
        articles.push((cards.children[i] as HTMLElement).getAttribute('data-art')!);
    }

    getArr(articles);
    setArr(articles);

    showFirstCards();
}

SettingResetBtn.addEventListener('click', resetSettings);
btnResetFilter.addEventListener('click', resetSettings);
