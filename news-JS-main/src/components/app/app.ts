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
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: DrawNewsType) => this.view.drawNews(data))
        );
        this.controller.getSources((data: DrawSourcesType) => this.view.drawSources(data));
    }
}

export default App;
