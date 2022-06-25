import { LoaderInterface } from '../../types';
import { CallBackNews, CallBackSources } from '../../types';
import { ErrorStatus, DrawNewsType, DrawSourcesType } from '../../types';

class Loader implements LoaderInterface {
    baseLink: string;
    options?: { [apiKey: string]: string };
    constructor(baseLink: string, options?: { [apiKey: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { [apiKey: string]: string } },
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

    makeUrl(options: { [apiKey: string]: string }, endpoint: string): string {
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
        options: { [apiKey: string]: string }
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res: Response) => res.json())
            .then((data: DrawNewsType & DrawSourcesType) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
