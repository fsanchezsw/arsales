import { Shop } from './shop.model';

export interface Sale {
    id?: number;
    name?: string;
    price?: number;
    url?: string;
    discount?: number;
    imageUrl?: string;

    // belongsTo relations
    idShop?: number;
    shop?: Shop;
}