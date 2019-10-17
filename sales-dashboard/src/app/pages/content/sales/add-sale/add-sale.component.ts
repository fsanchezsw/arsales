import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/services/toolbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from 'src/models/sale.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SaleProvider } from 'src/providers/sale.provider';
import { Shop } from 'src/models/shop.model';
import { PersonProvider } from 'src/providers/person.provider';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  form: FormGroup;
  shops: Shop[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private personProvider: PersonProvider,
    private saleProvider: SaleProvider,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      price: [, Validators.required],
      discount: [, Validators.required],
      url: [, Validators.required],
      idShop: [, Validators.required]
    });
  }

  ngOnInit() {
    this.toolbarService.setOptions({ title: 'Ofertas / Añadir' });

    this.personProvider.allShops().subscribe(shops => this.shops = shops)
  }

  onSubmit() {
    const sale: Sale = { ...this.form.value };

    this.saleProvider.post(sale).subscribe(() => {
      this.snackBar.open(
        `Oferta creada correctamente`,
        'Vale',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
      this.router.navigate([`/sales`], { replaceUrl: true });
    }, err => {
      this.snackBar.open(
        'Ha ocurrido un error, vuelve a intentarlo más tarde',
        'Vale',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    });
  }
}
