import { FilterHandlers } from '../types/types';
import { getArr, showFirstCards } from './pagination';

const filterHandlers: FilterHandlers = {};
export function setFilters(articlesArray: [string, string[]]) {
    filterHandlers[articlesArray[0]] = articlesArray[1];

    setStorage();
    const articles = Object.values(filterHandlers);

    const res: string[] = sortAllFilters(articles);

    const modal = document.getElementById('modal') as HTMLDivElement;
    modal.style.display = getModalWindow(res);

    getArr(res);

    showFirstCards();
}

function setStorage() {
    localStorage.setItem('filterHandlers', JSON.stringify(filterHandlers));
}

export function getModalWindow(result: string[]): string {
    return result.length === 0 ? 'block' : 'none';
}

export function sortAllFilters(articles: string[][]): string[] {
    const res: string[] = [];
    articles.forEach((item) =>
        item.forEach((v) => {
            if (articles.every((c) => c.includes(v))) res.push(v);
        })
    );

    return [...new Set(res)];
}
