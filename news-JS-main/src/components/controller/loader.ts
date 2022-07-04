import { LoaderInterface } from '../types/types';
import { CallBackNews, CallBackSources } from '../types/types';
import { ErrorStatus, DrawNewsType, DrawSourcesType } from '../types/types';

class Loader implements LoaderInterface {
    constructor(public baseLink: string, public options: { [key: string]: string }) {}

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorStatus.Unauthorized || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: CallBackNews | CallBackSources,
        options: { [key: string]: string }
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res: Response) => res.json())
            .then((data: DrawNewsType & DrawSourcesType) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
