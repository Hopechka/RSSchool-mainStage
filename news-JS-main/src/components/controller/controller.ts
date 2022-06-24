import AppLoader from './appLoader';
import { TargetElements, CallBackSources, CallBackNews } from '../../types';

class AppController extends AppLoader {
    getSources(callback: CallBackSources): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: TargetElements, callback: CallBackNews): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                console.log('sourceId: ', sourceId);
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId != null) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
