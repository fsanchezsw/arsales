import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/services/toolbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Shop } from 'src/models/shop.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PersonProvider } from 'src/providers/person.provider';
import { Person } from 'src/models/person.model';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {

  form: FormGroup;
  me: Person;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private personProvider: PersonProvider,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      latitude: [, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [, [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit() {
    this.toolbarService.setOptions({ title: 'Tiendas / Añadir' });

    this.personProvider.get('me').subscribe(me => this.me = me);
  }

  onSubmit() {
    const shop: Shop = { ...this.form.value, idOwner: this.me.id };

    this.personProvider.postShop(shop).subscribe(() => {
      this.snackBar.open(
        `Tienda creada correctamente`,
        'Vale',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
      this.router.navigate([`/shops`], { replaceUrl: true });
    }, err => {
      this.snackBar.open(
        'Ha ocurrido un error, vuelve a intentarlo más tarde',
        'Vale',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    });
  }
}
