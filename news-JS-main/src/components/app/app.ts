import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DrawNewsType, DrawSourcesType } from '../../types';

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
        this.controller.getSources((data) => this.view.drawSources(data as DrawSourcesType));
    }
}

export default App;
