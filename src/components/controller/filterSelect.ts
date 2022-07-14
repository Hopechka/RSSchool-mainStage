import store from '../../assets/store.json';
import { CheckBoxType, FilteredData, RootObject } from '../types/types';
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
        'mouseout',
        (event) => {
            if ((event.target as Element).tagName === 'FORM') {
                if (event.type === 'mouseout') {
                    console.log(event.type);
                    // console.log(event.target.tagName);
                    // console.log(event.currentTarget.tagName);
                    // (event.target as Element).className = 'hidden';
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
        const br = document.createElement('br');
        label.innerHTML = `<input class="checkbox" type="checkbox" name=${prop} value=${item.split(' ').join('*')}>
        ${item}`;
        selectElement.append(label);
        selectElement.append(br);
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
let articles: string[] = [];

function filterCards() {
    const checkboxesChecked: CheckBoxType = getCheckedCheckBoxes();
    console.log('checkboxesChecked: ', checkboxesChecked);
    const filteredData: FilteredData = Object.keys(store)
        .filter((key) => arrContain.includes(key))
        .reduce((obj, key) => {
            obj[key] = (store as RootObject)[key];
            return obj;
        }, []);

    const result = filterOut(filteredData, checkboxesChecked);

    result.forEach((item) => articles.push(item!.id.toString()));

    const modal = document.getElementById('modal') as HTMLDivElement;
    console.log(modal);
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
                const val = item![field];
                if (val) {
                    if (filterObj[field].indexOf(val) < 0) return false;
                }
            }
        }
        return true;
    });
}

const SettingResetBtn = document.querySelector('.btn-reset-settings') as HTMLButtonElement;

function resetSettings() {
    checkboxes.forEach((item) => {
        (item as HTMLInputElement).checked = false;
    });
    filterCards();
}

SettingResetBtn.addEventListener('click', resetSettings);
