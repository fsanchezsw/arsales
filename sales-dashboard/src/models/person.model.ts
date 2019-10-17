import { Shop } from './shop.model';

export interface Person {
    id?: number;
    email?: string;

    // hasMany relations
    shops?: Shop[];
}