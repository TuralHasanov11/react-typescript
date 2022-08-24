export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface IAuth {
    user: Object,
    roles?: Array<number>,
}

export interface IAuthContext {
    auth: IAuth,
    setAuth: Function
}