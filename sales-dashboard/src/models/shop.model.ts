import { Sale } from './sale.model';
import { Person } from './person.model';

export interface Shop {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    logoUri?: string;

    // belongsTo relations
    idOwner?: number;
    owner?: Person;

    // hasMany relations
    sales?: Sale[];
}