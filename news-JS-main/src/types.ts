export type OptionsObject = {
    sources?: string;
    apiKey?: string;
};
export interface LoaderInterface extends OptionsObject {
    baseLink: string;
    options?: OptionsObject;
}

export interface articleType {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string | null; name: string };
    title: string;
    url: string;
    urlToImage: string;
}
export interface sourcesType {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
export interface DrawNewsType extends articleType {
    articles: Array<articleType>;
    status: string;
    totalResults: number;
}
export interface DrawSourcesType extends sourcesType {
    sources: Array<sourcesType>;
    status: string;
}

export interface TargetElements {
    e: Event;
    target: HTMLElement;
    currentTarget: HTMLElement;
}

export type CallBackNews = (data?: DrawNewsType) => void;

export type CallBackSources = (data?: DrawSourcesType) => void;

export enum ErrorStatus {
    Unauthorized = 401,
    PaymentRequired,
    Forbidden,
    NotFound,
}

// export type Callback = <T>(data:<T>) => void
