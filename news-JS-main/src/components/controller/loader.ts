import { LoaderInterface, OptionsObject } from '../../types';
import { CallBackNews, CallBackSources } from '../../types';
import { ErrorStatus, DrawNewsType, DrawSourcesType } from '../../types';

class Loader implements LoaderInterface {
    baseLink: string;
    options?: OptionsObject;
    constructor(baseLink: string, options?: OptionsObject) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: OptionsObject },
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

    makeUrl(options: OptionsObject, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: CallBackNews | CallBackSources, options?: OptionsObject): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: DrawNewsType & DrawSourcesType) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
