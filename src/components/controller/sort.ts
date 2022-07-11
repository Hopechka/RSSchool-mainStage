import { showFirstCards } from '../view/pagination';

const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
sortSelect.addEventListener('click', function () {
    const options = sortSelect.querySelectorAll('option');
    const count: number = options.length;
    if (typeof count === 'undefined' || count < 2) {
        console.log('nothing sort');
    }
});

sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-name-up') {
        sortUp('data-name');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-name-down') {
        sortDown('data-name');
    }
});

sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-up') {
        sortUp('data-year');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-year-down') {
        sortDown('data-year');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-fabric-up') {
        sortUp('data-fabric');
    }
});
sortSelect.addEventListener('change', function () {
    if (sortSelect.value == 'sort-fabric-down') {
        sortDown('data-fabric');
    }
});

const cards = document.querySelector('#cards') as HTMLElement;

function sortUp(sortType: string) {
    for (let i = 0; i < cards.children.length; i++) {
        for (let j = i; j < cards.children.length; j++) {
            if (
                (cards.children[i] as HTMLElement).getAttribute(sortType)! >
                (cards.children[j] as HTMLElement).getAttribute(sortType)!
            ) {
                (cards.children[j] as HTMLElement).style.display = '';
                const replaceNode = cards.replaceChild(cards.children[j], cards.children[i]);
                cards.children[i].after(replaceNode);
            }
        }
    }
    showFirstCards();
}

function sortDown(sortType: string) {
    for (let i = 0; i < cards.children.length; i++) {
        for (let j = i; j < cards.children.length; j++) {
            if (
                (cards.children[i] as HTMLElement).getAttribute(sortType)! <
                (cards.children[j] as HTMLElement).getAttribute(sortType)!
            ) {
                (cards.children[j] as HTMLElement).style.display = '';
                const replaceNode = cards.replaceChild(cards.children[j], cards.children[i]);
                cards.children[i].after(replaceNode);
            }
        }
    }
    showFirstCards();
}
