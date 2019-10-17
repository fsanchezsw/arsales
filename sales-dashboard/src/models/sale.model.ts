import { Shop } from './shop.model';

export interface Sale {
    id?: number;
    name?: string;
    price?: number;
    url?: string;
    discount?: number;
    imageUri?: string;

    // belongsTo relations
    idShop?: number;
    shop?: Shop;
}