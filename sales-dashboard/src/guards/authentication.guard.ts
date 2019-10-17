import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonProvider } from 'src/providers/person.provider';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private personProvider: PersonProvider
  ) { }

  canActivate(): boolean | Observable<boolean> {
    let observable;
    observable = new Observable(subscriber => {
      if (this.authenticationService.isAuthenticated.value) {
        this.personProvider.get('me').subscribe(() => subscriber.next(true)
        , err => {
          this.authenticationService.removeToken();
          this.router.navigate(['/login'], { replaceUrl: true });
          subscriber.next(false);
        });
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
        subscriber.next(false);
      }
    });

    return observable;
  }
}
