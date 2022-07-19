import { FilterHandlers } from '../types/types';
import { getArr, showFirstCards } from './pagination';

const filterHandlers: FilterHandlers = {};
export function setFilters(articlesArray: [string, string[]]) {
    console.log(articlesArray);
    console.log('filterHandlers before: ', filterHandlers);
    filterHandlers[articlesArray[0]] = articlesArray[1];
    console.log('filterHandlers after: ', filterHandlers);
    setStorage();
    const arr = Object.values(filterHandlers);
    const res: string[] = [];
    // for (let key of arr) {
    //   for (j of key) {
    //     if(arr.every(item => item.includes(j))){res.push(j)}
    //   }
    // }

    arr.forEach((item) =>
        item.forEach((v) => {
            if (arr.every((c) => c.includes(v))) res.push(v);
        })
    );
    console.log('RES: ', res);

    const modal = document.getElementById('modal') as HTMLDivElement;
    modal.style.display = getModalWindow(res);
    // if (res.length === 0) {
    //     modal.style.display = 'block';
    // } else {
    //     modal.style.display = 'none';
    // }

    getArr([...new Set(res)]);
    showFirstCards();
}

function setStorage() {
    localStorage.setItem('filterHandlers', JSON.stringify(filterHandlers));
}

export function getModalWindow(result: string[]): string {
    return result.length === 0 ? 'block' : 'none';
}

// module.exports = getModalWindow;
