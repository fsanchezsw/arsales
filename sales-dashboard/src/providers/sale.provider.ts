import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/services/authentication.service';
import { Sale } from 'src/models/sale.model';
import { Filter } from 'src/utils/filter.util';

@Injectable({ providedIn: 'root' })
export class SaleProvider {

    key = 'Authorization';

    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    all(filter?: Filter): Observable<Sale[]> {
        const query = filter ? `${environment.serverUrl}/sales?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/sales`;
        return this.httpClient.get<Sale[]>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    get(id: number | string, filter?: Filter): Observable<Sale> {
        const query = filter ? `${environment.serverUrl}/sales/${id}?filter=${JSON.stringify(filter)}` : `${environment.serverUrl}/sales/${id}`;
        return this.httpClient.get<Sale>(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    post(sale: Sale): Observable<Sale> {
        const query = `${environment.serverUrl}/sales`;
        return this.httpClient.post<Sale>(query, sale, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    put(id: number | string, sale: Sale): Observable<Sale> {
        const query = `${environment.serverUrl}/sales/${id}`;
        return this.httpClient.put<Sale>(query, sale, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }

    delete(id: number | string): Observable<any> {
        const query = `${environment.serverUrl}/sales/${id}`;
        return this.httpClient.delete(query, { headers: { 'Authorization': this.authenticationService.getToken() } });
    }
}
