import News from './news/news';
import Sources from './sources/sources';
import { DrawNewsType, DrawSourcesType } from '../../types';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DrawNewsType): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(e: Event, data: DrawSourcesType): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(e, values);
    }
}

export default AppView;
