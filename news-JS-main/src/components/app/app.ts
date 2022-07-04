import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DrawNewsType, DrawSourcesType } from '../types/types';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data as DrawNewsType))
        );
        document.querySelectorAll('.alphabet').forEach((item): void =>
            item.addEventListener('click', (e) => {
                this.controller.getSources((data) => this.view.drawSources(e, data as DrawSourcesType));
            })
        );
    }
}

export default App;
