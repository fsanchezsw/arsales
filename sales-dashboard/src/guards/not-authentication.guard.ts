import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class NotAuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(): boolean | Observable<boolean> {
    let observable;
    observable = new Observable(subscriber => {
      if (!this.authenticationService.isAuthenticated.value) {
        subscriber.next(true);
      } else {
        this.router.navigate(['/shops'], { replaceUrl: true });
        subscriber.next(false);
      }
    });

    return observable;
  }
}
