export type StoreInterface = {
    [k: string]: string | number;
    id: number;
    name: string;
    brand: string;
    year: number;
    price: number;
    color: string;
    factory: string;
    material: string;
    quantity: number;
    image: string;
};

export type RootObject = {
    [key: string]: StoreInterface;
};

export type CartObj = {
    [key: string]: number;
};

export type CheckBoxType = {
    [key: string]: string[];
};

export type FilteredData = [StoreInterface?];

export type FilterHandlers = { [key: string]: string[] };
