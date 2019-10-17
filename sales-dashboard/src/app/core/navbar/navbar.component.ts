import { Component, OnInit } from '@angular/core';
import { PersonProvider } from 'src/providers/person.provider';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links = [
    {
      name: "Tiendas",
      icon: "store_mall_directory",
      path: "/shops"
    },
    {
      name: "Ofertas",
      icon: "local_offer",
      path: "/sales"
    },
  ];

  constructor(
    private personProvider: PersonProvider,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.personProvider.logout().subscribe(() => {
      this.authenticationService.removeToken();
      this.router.navigate([`/login`], { replaceUrl: true });
    }, err => {
      this.snackBar.open(
        'Ha ocurrido un error, vuelve a intentarlo más tarde',
        'Vale',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    });
  }
}
