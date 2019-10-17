import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/models/person.model';
import { Filter } from 'src/utils/filter.util';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/services/authentication.service';
import { Shop } from 'src/models/shop.model';
import { Sale } from 'src/models/sale.model';

@Injectable({ providedIn: 'root' })
export class PersonProvider {

    key = 'Authorization';

    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    //Person methods

    login(email: string, password: string): Observable<any> {
        const body = { email: email, password: password };
        return this.httpClient.post(`${environment.serverUrl}/people/login`, body);
    }

    logout(): Observable<any> {
        const query = `${environment.serverUrl}/people/logout`;
        return this.httpClient.post(query, null, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    get(id: number | string, filter?: Filter): Observable<Person> {
        const query = filter ? `${environment.serverUrl}/people/${id}?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/people/${id}`;
        return this.httpClient.get<Person>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    //Person-Shop methods

    allShops(filter?: Filter): Observable<Shop[]> {
        const query = filter ? `${environment.serverUrl}/people/me/shops?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/people/me/shops`;
        return this.httpClient.get<Shop[]>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    getShop(id: number | string, filter?: Filter): Observable<Shop> {
        const query = filter ? `${environment.serverUrl}/people/me/shops/${id}?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/people/me/shops/${id}`;
        return this.httpClient.get<Shop>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    postShop(shop: Shop): Observable<Shop> {
        const query = `${environment.serverUrl}/people/me/shops`;
        return this.httpClient.post<Shop>(query, shop, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    putShop(id: number | string, shop: Shop): Observable<Shop> {
        const query = `${environment.serverUrl}/people/me/shops/${id}`;
        return this.httpClient.put<Shop>(query, shop, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    deleteShop(id: number | string): Observable<any> {
        const query = `${environment.serverUrl}/people/me/shops/${id}`;
        return this.httpClient.delete(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    //Person-Sale methods

    allSales(filter?: Filter): Observable<Sale[]> {
        const query = filter ? `${environment.serverUrl}/people/me/sales?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/people/me/sales`;
        return this.httpClient.get<Sale[]>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    getSale(id: number | string, filter?: Filter): Observable<Sale> {
        const query = filter ? `${environment.serverUrl}/people/me/sales/${id}?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/people/me/sales/${id}`;
        return this.httpClient.get<Sale>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    postSale(sale: Sale): Observable<Sale> {
        const query = `${environment.serverUrl}/people/me/sales`;
        return this.httpClient.post<Sale>(query, sale, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    putSale(id: number | string, sale: Sale): Observable<Sale> {
        const query = `${environment.serverUrl}/people/me/sales/${id}`;
        return this.httpClient.put<Sale>(query, sale, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    deleteSale(id: number | string): Observable<any> {
        const query = `${environment.serverUrl}/people/me/sales/${id}`;
        return this.httpClient.delete(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }
}
