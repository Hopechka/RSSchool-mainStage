export type StoreInterface = {
    name: string;
    brand: string;
    year: number;
    price: number;
    color: string;
    manufacturer: string;
    material: string;
    image: string;
};

export type RootObject = {
    [key: string]: StoreInterface;
};

export type CartObj = {
    [key: string]: number;
};
