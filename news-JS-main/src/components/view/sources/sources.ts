import './sources.css';
import { sourcesType } from '../../types/types';

class Sources {
    draw(e: Event, data: Array<sourcesType>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item): void => {
            if (item.name.slice(0, 1).toUpperCase() === (e.target as HTMLElement).textContent) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        (document.querySelector('.sources') as HTMLElement).innerHTML = '';
        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
