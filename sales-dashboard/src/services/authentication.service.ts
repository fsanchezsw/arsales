import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    isAuthenticated = new BehaviorSubject(false);
    key: string;


    constructor() {
        this.key = environment.credentialsKey;
        if(this.getToken()) this.isAuthenticated.next(true);
    }

    getToken() {
        return localStorage.getItem(this.key) ? '' + localStorage.getItem(this.key) : null;
    }

    setToken(token) {
        localStorage.setItem(this.key, token);
        this.isAuthenticated.next(true);
    }

    removeToken() {
        localStorage.removeItem(this.key);
        this.isAuthenticated.next(false);
    }
}
